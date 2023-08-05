import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

export const Card = ({question, answer, options, id}) => {

  const RadioOptions = options.map(o => (
    <RadioButton
    key={o.id}
    id={o.id}
    name={`options_${id}`}
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
