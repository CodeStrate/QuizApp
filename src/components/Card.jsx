import { CardQuestionParagraph } from '../styledComponents/Paragraph'
import './Card.css'
import RadioButton from './RadioButton'
import { useEffect, useState } from 'react'


export const Card = ({}) => {

    return (
        <div className="card">
            <CardQuestionParagraph>{question}</CardQuestionParagraph>
            <div className="option-container">
                {optionRadioComponents}
            </div>
        </div>
    )
}