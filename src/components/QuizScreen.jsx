// sample link :   https://opentdb.com/api.php?amount=10

import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { Card } from "./Card";
import { Button, SubmitButton } from "../styledComponents/Button";
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

  const selectOption = (queID, optionId) => {
    const selectedOptionState = quizData.map((ques) => {
      if (ques.question_id === queID) {
        return { ...ques, selectedOptionID: optionId };
      }
      return ques;
    });

    setQuizData(selectedOptionState);
  };

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

  const cards = quizData.map((quiz) => {
    return (
      <Card
        gameRunningState={gameIsRunning}
        key={quiz.question_id}
        questionId={quiz.question_id}
        question={quiz.question}
        options={quiz.options}
        selectedOptionID={quiz.selectedOptionID}
        selectOption={selectOption}
        answer={quiz.answer}
      />
    );
  });

  return (
    <main className={className}>
      {gameIsRunning && cards}
      <SubmitButton onClick={() => setGameIsRunning(false)}>
        Check Answers
      </SubmitButton>
    </main>
  );
}
