import { useEffect, useState, useMemo } from "react";
import fetchQuestions from "./fetchQuestions";
import { nanoid } from "nanoid";
import { decode } from "he";

export const RequestStatus = {
  Idle: "idle",
  Pending: "pending",
  Rejected: "rejected",
  Resolved: "resolved",
};

const useQuizData = (apiParams) => {
  const [status, setStatus] = useState(RequestStatus.Idle);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!gameIsRunning) {
      setStatus(RequestStatus.Pending);

      fetchQuestions(apiParams, controller.signal)
        .then((data) => {

          const quesData = data.map((d) => {
            const answer = {
              id: nanoid(),
              value: decode(d.correct_answer)
            }

            const options = d.incorrect_answers.map(e => ({
              id: nanoid(),
              value: decode(e,)
            }))

            options.push(answer)
            options.sort(() => Math.random() - 0.5)

            return {
              id: nanoid(),
              question : decode(d.question),
              answer,
              options,
            }
          });

          setQuizData(quesData);
          setError(null);
          setGameIsRunning(true);
          setStatus(false);
        })
        .catch((error) => {
          // ignore the error if it is abort error
          if (!(error instanceof DOMException && error.name == "AbortError")) {
            setError(error);
            setGameIsRunning(false);
            setStatus(false);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [apiParams, gameIsRunning]);

  return useMemo(
    () => ({
      error,
      quizData,
      setQuizData,
      gameIsRunning,
      setGameIsRunning,
      status,
    }),
    [error, quizData, gameIsRunning, status]
  );
};

export default useQuizData;
