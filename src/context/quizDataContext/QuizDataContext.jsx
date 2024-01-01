import {
  useCallback,
  createContext,
  useMemo,
  useReducer,
  useContext,
} from "react";
import { quizDataUnmarshaller } from "../../utils";
import quizDataReducer, { getInitialState } from "./reducer";
import fetchQuestions from "../../services-hooks/fetchQuestions";

const QuizDataContext = createContext(undefined);

export const QuizDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizDataReducer, getInitialState());
  const { data, error, gameStatus, score, requestStatus } = state;

  const newGame = useCallback((apiParams, signal) => {
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
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "restart" });
  }, []);

  const selectOption = useCallback((questionId, optionId) => {
    dispatch({ type: "select-option", payload: { questionId, optionId } });
  }, []);

  const finish = useCallback(() => {
    dispatch({ type: "finish" });
  }, []);

  const value = useMemo(
    () => ({
      data,
      error,
      finish,
      gameStatus,
      newGame,
      restart,
      score,
      selectOption,
      requestStatus,
    }),
    [
      data,
      error,
      finish,
      gameStatus,
      restart,
      score,
      selectOption,
      newGame,
      requestStatus,
    ]
  );

  return (
    <QuizDataContext.Provider value={value}>
      {children}
    </QuizDataContext.Provider>
  );
};

export const useQuizData = () => {
  const context = useContext(QuizDataContext);

  if (!context) {
    throw new Error("useQuizData must be used within QuizDataContext");
  }

  return context;
};

export default QuizDataProvider;
