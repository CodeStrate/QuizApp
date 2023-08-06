import usePreferences from "../services-hooks/usePreferences";
import useEffectOnUpdate from "../services-hooks/useEffectOnUpdate";
import { CardQuestionParagraph } from "../styledComponents/Paragraph";
import "./Card.css";
import RadioButton from "./RadioButton";

export const Card = ({question, answer, options, questionId}) => {

  const {preferences, update, addNew} = usePreferences({})

  const selectOption = (event) => {
    const {name, value, id} = event.target
    const option = {id, value}
    
    update(name, option)
  }

  useEffectOnUpdate(() => console.log(preferences), [preferences])

  const RadioOptions = options.map(o => (
    <RadioButton
    key={o.id}
    id={o.id}
    name={questionId}
    value={o.value}
    variant='options'
    onChange={selectOption}
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
