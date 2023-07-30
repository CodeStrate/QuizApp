import { CardQuestionParagraph } from '../styledComponents/Paragraph'
import './Card.css'
import RadioButton from './RadioButton'
import { useEffect, useState } from 'react'


export const Card = ({gameOverState, question, answer, incorrectAnswers, id, userAnswer, answerHandler}) => {

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=> {
        setOptionState(generateOptions())
    }, [question])

    const [optionState, setOptionState] = useState([])

    useEffect(() => {
        setOptionState(prevOptionState => {
            return prevOptionState.map(option => ({
                ...option,
                checked : selectedOption === option.id,
                isCorrect : userAnswer === option.value && userAnswer === answer, 
                isIncorrect : userAnswer === option.value && userAnswer !== answer 
            }))
        })
    }, [selectedOption, userAnswer, answer])


    function generateOptions() {
        let randomIndex = Math.floor(Math.random() * incorrectAnswers.length + 1)
        const options = [...incorrectAnswers]
        options.splice(randomIndex, 0, answer)

        return options.map((option, index) => ({
            id : `options_${id}_${index}`,
            value: option,
            checked: false
        }))
    }

     function selectOption(optionID){
        setSelectedOption(optionID)
    }


    const optionRadioComponents = optionState.map((option, index) => {
        return <RadioButton
            key={index}
            id={option.id}
            name={`option_${option.id}`}
            value={option.value}
            checked={option.checked}
            variant={`options ${gameOverState ? (option.isCorrect ? 'medium' : option.isIncorrect ? 'hard' : '') : ''}`}
            onChange={() => {
              console.log(`Answer Changed : ${option.value}`);
              selectOption(option.id)
              answerHandler(option.id, option.value)
            }}
        >{option.value}</RadioButton>
    })

    return (
        <div className="card">
            <CardQuestionParagraph>{question}</CardQuestionParagraph>
            <div className="option-container">
                {optionRadioComponents}
            </div>
        </div>
    )
}