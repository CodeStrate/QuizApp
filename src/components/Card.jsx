import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

export const Card = ({
  question,
  options,
  questionId,
  selectOption,
  selectedOptionID,
  answer,
  gameRunningState,
}) => {
  return (
    <div className="card">
      <CardQuestionParagraph>{question}</CardQuestionParagraph>
      <div className="option-container">
        {options.map((o) => (
          <RadioButton
            key={o.id}
            id={o.id}
            name={questionId}
            value={o.value}
            variant={`options`}
            onChange={() => selectOption(questionId, o.id)}
            checked={selectedOptionID === o.id}
          >
            {o.value}
          </RadioButton>
        ))}
      </div>
    </div>
  );
};
