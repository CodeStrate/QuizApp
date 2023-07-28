// sample link :   https://opentdb.com/api.php?amount=10

import { useEffect, useState } from "react"
import { LoadingSubTitle } from "../styledComponents/SubTitle"
import { Card } from "./Card"
import { nanoid } from "nanoid"
import he from 'he'


export default function QuizScreen({className, apiParams}){
    
    const [quizIsLoading, setQuizIsLoading] = useState(true)
    const [quizData, setQuizData] = useState([])
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0)
    const [newGame, setNewGame] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    function answerCountHandler() {
        setCorrectAnswersCounter(prevCount => prevCount = prevCount + 1)
    }


    useEffect(() => {
        const {amount, difficulty, type, category} = apiParams
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
                    answer : he.decode(card.correct_answer),
                    incorrect_answers : card.incorrect_answers.map(e => he.decode(e))
                }
            })
            setQuizData(cardData)  
            setQuizIsLoading(false)
        }
        fetchQuestionsFromAPI()
    },[newGame])

    const cardComponents = quizData.map(card => {
        return (
            <Card
            key={card.id}
            id={card.id}
            gameOverState={gameOver}
            answerCountHandler={answerCountHandler}
            question={card.question}
            answer={card.answer}
            incorrect_answers={card.incorrect_answers}
            />
        )
    })

    return (
        <main className={className}>
            {quizIsLoading && <div className="loader"><div className="loading--Animation"></div><LoadingSubTitle>Loading</LoadingSubTitle></div>}
            {cardComponents}
        </main>
    )
}