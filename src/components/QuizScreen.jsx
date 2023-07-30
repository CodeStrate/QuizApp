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
    const [newGame, setNewGame] = useState(false)
    const [gameOver, setGameOver] = useState(false)


    //state to check for Answers in the card
    const [userAnswers, setUserAnswers] = useState([])


    function checkAnswers(){
        let score = 0
        quizData.forEach((card, index) => {
            if(userAnswers[index] === card.correctAnswer) score++
        })

        setCorrectAnswersCounter(score)
        setGameOver(true)
    }

    function handleNewGame() {
        setNewGame(prevGame => !prevGame)
        setQuizIsLoading(true)
        setGameOver(false)
        setCorrectAnswersCounter(0)
        setUserAnswers([])
    }

    function handleCheckAnswer(index, answer) {
        setUserAnswers(prevAnswer => {
            const newAnswers = [...prevAnswer]
            newAnswers[index] = answer
            return newAnswers
        })
    }

    const {amount, difficulty, type, category} = apiParams

    useEffect(() => {
        async function fetchQuestionsFromAPI() {
            let amountProp = ''
            let diffProp = ''
            let typeProp = ''
            let categoryProp = ''
            if (amount !== '') {
                amountProp = `amount=${amount}`
            }
            if (category !== '') {
                categoryProp = `&category=${category}`
            }
            if (difficulty !== '') {
                diffProp = `&difficulty=${difficulty}`
            }
            if (type !== '') {
                typeProp = `&type=${type}`
            }

            let apiURL = `https://opentdb.com/api.php?${amountProp}${categoryProp}${diffProp}${typeProp}`

            const result = await fetch(apiURL)
            const data = await result.json()
            const quesData = data.results

            const cardData = quesData.map(card => {
                return {
                    id: nanoid(),
                    question : he.decode(card.question),
                    correctAnswer : he.decode(card.correct_answer),
                    incorrectAnswers : card.incorrect_answers.map(e => he.decode(e))
                }
            })
            setQuizData(cardData)  
            setQuizIsLoading(false)
        }
        fetchQuestionsFromAPI()
    },[newGame])

    const cardComponents = quizData.map((card, index) => {
        return (
            <Card
            key={index}
            id={card.id}
            gameOverState={gameOver}
            question={card.question}
            answer={card.correctAnswer}
            incorrectAnswers={card.incorrectAnswers}
            userAnswer={userAnswers[index]}
            answerHandler={handleCheckAnswer}
            />
        )
    })

    return (
        <main className={className}>
            {quizIsLoading && <div className="loader"><div className="loading--Animation"></div><LoadingSubTitle>Loading</LoadingSubTitle></div>}
            {!quizIsLoading && cardComponents}
            {gameOver && (
                <>
                <SubTitle>This Quiz is Over!</SubTitle>
                <Paragraph>Correct Answers : {correctAnswersCounter} / {amount}</Paragraph>
                <Button onClick={handleNewGame}>New Game</Button></>
            )}

            {(!gameOver && !quizIsLoading) && <SubmitButton onClick={checkAnswers}>Check Answers</SubmitButton>}
        </main>
    )
}