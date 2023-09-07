import RadioButton from "./RadioButton";
import { PrefButton } from "../styledComponents/Button";
import CategoryData from "../../CategoryData";
import { SubTitle } from "../styledComponents/SubTitle";

const QUESTION_COUNT_LIST = [5, 10, 15, 20];
const DIFFICULTIES = ["easy", "medium", "hard"];

const QUESTION_AMOUNT = "amount";
const DIFFICULTY = "difficulty";
const GAME_TYPE = "type";
const CATEGORY = "category";

export default function Preferences({ open, preferences, reset, update }) {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    update({
      [QUESTION_AMOUNT]: new FormData(form).get(QUESTION_AMOUNT),
      [DIFFICULTY]: new FormData(form).get(DIFFICULTY),
      [GAME_TYPE]: new FormData(form).get(GAME_TYPE),
      [CATEGORY]: new FormData(form).get(CATEGORY),
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`pref-container ${open ? "" : "close"}`}
    >
      <SubTitle>Number of Questions</SubTitle>
      {QUESTION_COUNT_LIST.map((num) => (
        <RadioButton
          type="radio"
          className="radio-button"
          key={`${QUESTION_AMOUNT}_${num}`}
          id={`${QUESTION_AMOUNT}_${num}`}
          name={QUESTION_AMOUNT}
          value={num}
          defaultChecked={preferences.amount === num}
        >
          {num}
        </RadioButton>
      ))}
      <SubTitle>Difficulty</SubTitle>
      {DIFFICULTIES.map((difficulty) => (
        <RadioButton
          key={`${DIFFICULTY}_${difficulty}`}
          id={`${DIFFICULTY}_${difficulty}`}
          name={DIFFICULTY}
          value={difficulty}
          variant={difficulty}
          defaultChecked={preferences.difficulty === difficulty}
        >
          <span style={{ textTransform: "capitalize" }}>{difficulty}</span>
        </RadioButton>
      ))}
      <SubTitle>Type</SubTitle>
      <RadioButton
        id={`${GAME_TYPE}_multiple`}
        name={GAME_TYPE}
        value="multiple"
        defaultChecked={preferences.type === "multiple"}
      >
        Multiple
      </RadioButton>
      <RadioButton
        id={`${GAME_TYPE}_boolean`}
        name={GAME_TYPE}
        value="boolean"
        defaultChecked={preferences.type === "boolean"}
      >
        Boolean
      </RadioButton>
      <SubTitle>Category</SubTitle>
      {CategoryData.map((item) => (
        <RadioButton
          key={item.ID}
          id={`${CATEGORY}_${item.ID}`}
          name={CATEGORY}
          value={item.CategoryID}
          defaultChecked={preferences.category === item.CategoryID.toString()}
        >
          {item.CategoryName}
        </RadioButton>
      ))}
      <hr></hr>
      <div className="buttons">
        <PrefButton>Save Prefs</PrefButton>
        <PrefButton onClick={reset}>Reset Prefs</PrefButton>
      </div>
    </form>
  );
}
