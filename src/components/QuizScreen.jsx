// sample link :   https://opentdb.com/api.php?amount=10

import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { Card } from "./Card";
import { Button, SubmitButton } from "../styledComponents/Button";
import { Paragraph } from "../styledComponents/Paragraph";
import useQuizData, { RequestStatus } from "../services-hooks/useQuizData";

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
        <SubTitle>Something went wrong!</SubTitle>
      </main>
    );
  }

  const cards = quizData.map(quiz => {
    return <Card
            key={quiz.id}
            id={quiz.id}
            question={quiz.question}
            answer={quiz.answer}
            options={quiz.options} />
  })

  return <main className={className}>{gameIsRunning && cards}</main>;
}
