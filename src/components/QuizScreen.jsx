// sample link :   https://opentdb.com/api.php?amount=10

import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { Card } from "./Card";
import { Button, SubmitButton } from "../styledComponents/Button";
import useQuizData, { RequestStatus } from "../services-hooks/useQuizData";

export default function QuizScreen({ className, apiParams }) {
  const {
    data,
    error,
    gameIsRunning,
    selectOption,
    restart,
    score,
    newGame,
    status,
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

  return (
    <main className={className}>
      {gameIsRunning
        ? data.map((quiz) => (
            <Card
              gameRunningState={gameIsRunning}
              key={quiz.questionId}
              questionId={quiz.questionId}
              question={quiz.question}
              options={quiz.options}
              selectedOptionID={quiz.selectedOptionId}
              selectOption={selectOption}
              answer={quiz.answer}
            />
          ))
        : null}
      <SubmitButton
        onClick={() => {
          // TODO: implement
        }}
      >
        Check Answers
      </SubmitButton>
    </main>
  );
}
