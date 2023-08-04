// sample link :   https://opentdb.com/api.php?amount=10

import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { Card } from "./Card";
import { nanoid } from "nanoid";
import { decode } from "he";
import { Button, SubmitButton } from "../styledComponents/Button";
import { Paragraph } from "../styledComponents/Paragraph";
import useQuizData, { RequestStatus } from "../hooks/useQuizData";

export default function QuizScreen({ className, apiParams }) {
  const {
    error,
    status,
    gameIsRunning,
    setGameIsRunning,
    setQuizData,
    quizData,
  } = useQuizData(apiParams);

  if (status === RequestStatus.Pending || status === RequestStatus.Idle) {
    return (
      <main className={className}>
        <div className="loader">
          <div className="loading--Animation"></div>
          <LoadingSubTitle>Loading</LoadingSubTitle>
        </div>
      </main>
    );
  }

  if (status === RequestStatus.Rejected && error) {
    return (
      <main className={className}>
        <div>Something went wrong!</div>
      </main>
    );
  }

  return <main className={className}>{JSON.stringify(quizData)}</main>;
}
