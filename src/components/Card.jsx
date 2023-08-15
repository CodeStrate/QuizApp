import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

export const Card = ({question, options, questionId, selectOption, selectedOptionID, answer, gameRunningState}) => {
  


  let cardClass = gameRunningState ? "" : handleClassNames()

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
}
