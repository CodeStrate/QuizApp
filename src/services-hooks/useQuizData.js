import { useEffect, useMemo, useReducer, useCallback, useRef } from "react";
import fetchQuestions from "./fetchQuestions";
import { nanoid } from "nanoid";
import { decode } from "he";

export const RequestStatus = {
  Idle: "idle",
  Pending: "pending",
  Rejected: "rejected",
  Resolved: "resolved",
};

const getInitialState = () => ({
  status: RequestStatus.Idle,
  gameIsRunning: false,
  data: null,
  error: null,
});

const quizDataReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: RequestStatus.Pending,
        gameIsRunning: false,
        data: null,
        error: null,
      };

    case "error":
      return {
        ...state,
        status: RequestStatus.Rejected,
        gameIsRunning: false,
        data: null,
        error: action.payload,
      };

    case "success":
      return {
        ...state,
        status: RequestStatus.Resolved,
        gameIsRunning: true,
        data: action.payload,
        error: null,
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

    default:
      return state;
  }
};

const useQuizData = (apiParams) => {
  const [state, dispatch] = useReducer(quizDataReducer, getInitialState());
  const { data, error, gameIsRunning, status } = state;
  const controllerRef = useRef(new AbortController());

  const newGame = useCallback(
    ({ signal }) => {
      dispatch({ type: "start" });
      fetchQuestions(apiParams, signal)
        .then((data) => {
          const quesData = data.map((d) => {
            const answer = {
              id: nanoid(),
              value: decode(d.correct_answer),
            };

            const options = d.incorrect_answers.map((e) => ({
              id: nanoid(),
              value: decode(e),
            }));

            options.push(answer);
            options.sort(() => Math.random() - 0.5);

            return {
              questionId: nanoid(),
              question: decode(d.question),
              answer,
              options,
              selectedOptionId: "",
            };
          });

          dispatch({ type: "success", payload: quesData });
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

  const selectOption = useCallback((questionId, optionId) => {
    dispatch({ type: "select-option", payload: { questionId, optionId } });
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
      gameIsRunning,
      newGame,
      selectOption,
      status,
    }),
    [data, error, gameIsRunning, newGame, selectOption, status]
  );
};

export default useQuizData;
