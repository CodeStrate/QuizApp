import { useEffect, useMemo, useReducer, useCallback, useRef } from "react";
import fetchQuestions from "./fetchQuestions";
import { nanoid } from "nanoid";
import { decode } from "he";

const calculateScore = (data) => {
  if (!data) return 0;

  return data.reduce((acc, d) => {
    if (d.selectedOptionId === d.answer.id) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const createOption = (value) => ({
  id: nanoid(),
  value: decode(value),
});

// Could be called transformer or mapper doesn't matter
const quizDataUnmarshaller = (data) => {
  const answer = createOption(data.correct_answer);

  const options = data.incorrect_answers.map(createOption);
  options.push(answer);
  options.sort(() => Math.random() - 0.5);

  return {
    questionId: nanoid(),
    question: decode(data.question),
    answer,
    options,
    selectedOptionId: "",
  };
};

export const RequestStatus = {
  Idle: "idle",
  Pending: "pending",
  Rejected: "rejected",
  Resolved: "resolved",
};

const getInitialState = () => ({
  status: RequestStatus.Idle,
  gameIsRunning: false,
  backupData: null,
  data: null,
  error: null,
  score: 0,
});

const quizDataReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        score: 0,
        status: RequestStatus.Pending,
        gameIsRunning: true,
        backupData: null,
        data: null,
        error: null,
      };

    case "error":
      return {
        ...state,
        score: 0,
        status: RequestStatus.Rejected,
        gameIsRunning: false,
        backupData: null,
        data: null,
        error: action.payload,
      };

    case "success":
      return {
        ...state,
        score: 0,
        status: RequestStatus.Resolved,
        gameIsRunning: true,
        data: action.payload,
        backupData: action.payload,
        error: null,
      };

    case "restart":
      return {
        ...state,
        score: 0,
        gameIsRunning: true,
        data: state.backupData,
      };

    case "select-option": {
      if (!state.gameIsRunning) return state;

      const data = state.data.map((q) => {
        if (q.questionId === action.payload.questionId) {
          return { ...q, selectedOptionId: action.payload.optionId };
        }

        return q;
      });

      return { ...state, data };
    }

    case "finish":
      if (!state.gameIsRunning) return state;

      return {
        ...state,
        gameIsRunning: false,
        score: calculateScore(state.data),
      };

    default:
      return state;
  }
};

const useQuizData = (apiParams) => {
  const [state, dispatch] = useReducer(quizDataReducer, getInitialState());
  const { data, error, gameIsRunning, score, status } = state;
  const controllerRef = useRef(new AbortController());

  const newGame = useCallback(
    ({ signal }) => {
      dispatch({ type: "start" });
      fetchQuestions(apiParams, signal)
        .then((data) => {
          const payload = data.map(quizDataUnmarshaller);

          dispatch({ type: "success", payload });
        })
        .catch((error) => {
          // ignore the error if it is abort error
          if (!(error instanceof DOMException && error.name == "AbortError")) {
            dispatch({ type: "error", payload: error });
          }
        });
    },
    [apiParams]
  );

  const restart = useCallback(() => {
    dispatch({ type: "restart" });
  }, []);

  const selectOption = useCallback((questionId, optionId) => {
    dispatch({ type: "select-option", payload: { questionId, optionId } });
  }, []);

  const finish = useCallback(() => {
    dispatch({ type: "finish" });
  }, []);

  useEffect(() => {
    if (controllerRef.current.signal.aborted) {
      controllerRef.current = new AbortController();
    }

    newGame({ signal: controllerRef.current.signal });

    return () => {
      controllerRef.current.abort();
    };
  }, [newGame]);

  return useMemo(
    () => ({
      data,
      error,
      finish,
      gameIsRunning,
      newGame,
      restart,
      score,
      selectOption,
      status,
    }),
    [
      data,
      error,
      finish,
      gameIsRunning,
      restart,
      score,
      selectOption,
      newGame,
      status,
    ]
  );
};

export default useQuizData;
