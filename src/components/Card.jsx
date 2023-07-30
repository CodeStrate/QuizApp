import { CardQuestionParagraph } from '../styledComponents/Paragraph'
import './Card.css'
import RadioButton from './RadioButton'
import { useEffect, useState } from 'react'


export const Card = ({gameOverState, answerCountHandler, cardData}) => {

    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const cardIndex = cardData.id

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const allOptions = [...cardData.incorrectAnswers, cardData.correctAnswer];
    const shuffled = shuffleArray(allOptions);
    setShuffledOptions(shuffled);
    setSelectedOptions((prevSelected) => {
        const newSelected = [...prevSelected]
        newSelected[cardIndex] = ''
        return newSelected
    })
  }, [cardData, cardIndex]);



  const handleOptionSelect = (selectedOption) => {
    setSelectedOptions(prevSelected => {
        const newSelected = [...prevSelected]
        newSelected[cardIndex] = selectedOption
        return newSelected
    })
  }

    const optionRadioComponents = shuffledOptions.map((option, index) => {
        return <RadioButton
            key={index}
            id={`option-${index}`}
            name={`option-${cardIndex}`}
            value={option}
            checked={selectedOptions[cardIndex] === option}
            variant='options'
            onChange={() => handleOptionSelect(option)}
        >{option}</RadioButton>
    })

    return (
        <div className="card">
            <CardQuestionParagraph>{cardData.question}</CardQuestionParagraph>
            <div className="option-container">
                {optionRadioComponents}
            </div>
        </div>
    )
}