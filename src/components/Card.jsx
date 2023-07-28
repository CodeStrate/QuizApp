import { CardQuestionParagraph } from '../styledComponents/Paragraph'
import './Card.css'
import RadioButton from './RadioButton'
import { useEffect, useState } from 'react'


export const Card = ({gameOverState, answerCountHandler, question, answer, incorrect_answers, id}) => {

    const [selectedOption, setSelectedOption] = useState(null);
    
    useEffect(()=> {
        setOptionState(generateOptions())
    }, [question])
    
    const [optionState, setOptionState] = useState([])
    
    useEffect(() => {
        setOptionState(prevOptionState => {
            return prevOptionState.map(option => ({
                ...option,
                checked : selectedOption === option.id
            }))
        })
    }, [selectedOption])
    
    function generateOptions() {
        let randomIndex = Math.floor(Math.random() * incorrect_answers.length + 1)
        const options = [...incorrect_answers]
        options.splice(randomIndex, 0, answer)

        return options.map((option, index) => ({
            id : `option_${id}_${index}`,
            value: option,
            checked: false
        }))
    }


     function selectOption(optionID){
        setSelectedOption(optionID)
    }

    useEffect(() => {
        console.log(optionState);
    }, [optionState])

    const optionRadioComponents = optionState.map((option, index) => {
        return <RadioButton
            key={index}
            id={option.id}
            name='option'
            value={option.value}
            checked={option.checked}
            variant='options'
            onChange={() => selectOption(option.id)}
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