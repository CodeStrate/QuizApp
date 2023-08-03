// sample link :   https://opentdb.com/api.php?amount=10

import { useEffect, useState } from "react"
import { LoadingSubTitle, SubTitle } from "../styledComponents/SubTitle"
import { Card } from "./Card"
import { nanoid } from "nanoid"
import he from 'he'
import { Button, SubmitButton } from "../styledComponents/Button"
import { Paragraph } from "../styledComponents/Paragraph"


export default function QuizScreen({className, apiParams}){
    
    const [quizIsLoading, setQuizIsLoading] = useState(true)
    const [quizData, setQuizData] = useState([])
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0)
    const [gameIsRunning, setGameIsRunning] = useState(false)


    useEffect(() => {
  
            setQuizIsLoading(false)
            setGameIsRunning(true)
    },[gameIsRunning])

    const cardComponents = quizData.map((card, index) => {
        return (
            <Card
            />
        )
    })

    return (
        <main className={className}>
            {quizIsLoading && <div className="loader"><div className="loading--Animation"></div><LoadingSubTitle>Loading</LoadingSubTitle></div>}
            {!gameIsRunning && cardComponents}
            {gameIsRunning && (
                <>
                <SubTitle>This Quiz is Over!</SubTitle>
                <Paragraph>Correct Answers : {correctAnswersCounter} / {amount}</Paragraph>
                <Button onClick={handleNewGame}>New Game</Button></>
            )}

            {(gameIsRunning && !quizIsLoading) && <SubmitButton onClick={checkAnswers}>Check Answers</SubmitButton>}
        </main>
    )
}