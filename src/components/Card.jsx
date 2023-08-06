import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

export const Card = ({question, answer, options, questionId}) => {

  const RadioOptions = options.map(o => (
    <RadioButton
    key={o.id}
    id={o.id}
    name={questionId}
    value={o.value}
    variant='options'
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
};
