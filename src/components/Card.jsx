import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";
import { forwardRef, useImperativeHandle } from "react";

export const Card = forwardRef(({question, options, questionId, selectOption, selectedOptionID, answer}, ref) => {
  
  useImperativeHandle(ref, () => ({
    handleAnswer : handleClassNames,
  }))

  let cardClass = handleClassNames()

  const handleClassNames = () => {
    return selectedOptionID === answer.id ? "medium" : "hard"
  }

  const RadioOptions = options.map(o => (
    <RadioButton
    key={o.id}
    id={o.id}
    name={questionId}
    value={o.value}
    variant={`options ${cardClass}`}
    onChange={() => selectOption(questionId, o.id)}
    checked={selectedOptionID === o.id}
    >
    {o.value}
    </RadioButton>
    
  ))

  return (
    <div className="card">
      <CardQuestionParagraph>{question}</CardQuestionParagraph>
      <div className="option-container">{RadioOptions}</div>
    </div>
  );
});
