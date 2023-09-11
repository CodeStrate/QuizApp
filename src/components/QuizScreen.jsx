import { Card } from "./Card";

import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { SubmitButton } from "../styledComponents/Button";
import { Paragraph } from "../styledComponents/Paragraph";
import { useQuizData } from "../context/quizDataContext/QuizDataContext";
import { GameStatus, RequestStatus } from "../context/quizDataContext/reducer";

export default function QuizScreen({ className, preferences }) {
  const {
    data,
    error,
    finish,
    gameStatus,
    selectOption,
    restart,
    score,
    newGame,
    requestStatus,
  } = useQuizData();

  const isGamePlaying = gameStatus === GameStatus.Playing;
  const difficulty = preferences.difficulty;

  const startANewGame = () => newGame(preferences);

  if (
    requestStatus === RequestStatus.Pending ||
    requestStatus === RequestStatus.Idle
  ) {
    return (
      <main className={className}>
        <div className="loader">
          <div className="loading--Animation"></div>
          <LoadingSubTitle>Loading...</LoadingSubTitle>
        </div>
      </main>
    );
  }

  if (requestStatus === RequestStatus.Rejected && error) {
    return (
      <main className={className}>
        <SubTitle>Something went wrong! {error?.message}</SubTitle>
      </main>
    );
  }

  return (
    <main className={className}>
      {data?.map((quiz) => (
        <Card
          answerId={quiz.answer.id}
          difficulty={difficulty}
          isGamePlaying={isGamePlaying}
          key={quiz.questionId}
          options={quiz.options}
          question={quiz.question}
          questionId={quiz.questionId}
          selectedOptionId={quiz.selectedOptionId}
          selectOption={selectOption}
        />
      ))}
      {isGamePlaying ? (
        <SubmitButton onClick={finish}>Check Answers</SubmitButton>
      ) : null}
      {gameStatus === GameStatus.Over ? (
        <>
          <Paragraph>
            Your score is {score} out of {data.length}
          </Paragraph>
          <SubmitButton onClick={startANewGame}>New Game</SubmitButton>
          <SubmitButton onClick={restart}>Retry</SubmitButton>
        </>
      ) : null}
    </main>
  );
}
