import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

const getCheckboxDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "card-checkbox--easy";
    case "medium":
      return "card-checkbox--medium";
    case "hard":
      return "card-checkbox--hard";
    default:
      throw new Error(`Unsupported difficulty: ${difficulty}`);
  }
};

const getCheckboxCorrectClass = (isOver, isSelected, isCorrect) => {
  if (!isOver) return null;

  if (isSelected && isCorrect) {
    return "card-checkbox--correct";
  }

  return "card-checkbox--incorrect";
};

const getCheckboxClass = ({
  isOver,
  difficulty,
  optionId,
  correctOptionId,
  selectedOptionId,
}) => {
  // Setup our flags
  const isCorrect = correctOptionId === selectedOptionId;
  const isSelected = optionId === selectedOptionId;

  // Get our classes
  const difficultyClass = getCheckboxDifficultyClass(difficulty);
  const correctClass = getCheckboxCorrectClass(isOver, isSelected, isCorrect);

  console.log(correctClass);
  // Compose a class list
  const classNames = ["card-checkbox", difficultyClass, correctClass];
  // Filter falsy values then compose the final class
  return classNames.filter(Boolean).join(" ");
};

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
