// sample link :   https://opentdb.com/api.php?amount=10

import { useEffect, useState } from "react";
import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle";
import { Card } from "./Card";
import { nanoid } from "nanoid";
import { decode } from "he";
import { Button, SubmitButton } from "../styledComponents/Button";
import { Paragraph } from "../styledComponents/Paragraph";
import fetchQuestions from "../services-hooks/fetchQuestions";

export default function QuizScreen({ className, apiParams }) {
  const [quizIsLoading, setQuizIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [gameIsRunning, setGameIsRunning] = useState(false);

  // useEffect(() => {
  //         fetchQuestions(apiParams)

  //         setQuizIsLoading(false)
  //         setGameIsRunning(true)
  // },[gameIsRunning])

  return (
    <main className={className}>
      {quizIsLoading && (
        <div className="loader">
          <div className="loading--Animation"></div>
          <LoadingSubTitle>Loading</LoadingSubTitle>
        </div>
      )}
    </main>
  );
}
