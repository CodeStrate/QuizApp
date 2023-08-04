import RadioButton from "./RadioButton";
import { PrefButton } from "../styledComponents/Button";
import CategoryData from "../../CategoryData";
import { SubTitle } from "../styledComponents/SubTitle";

const QUESTION_COUNT = [5, 10, 15, 20];
const DIFFICULTIES = ["easy", "medium", "hard"];

export default function Preferences({ open, preferences, reset, update }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    update(name, value);
  };

  return (
    <div className={`pref-container ${open ? "" : "close"}`}>
      <SubTitle>Number of Questions</SubTitle>
      {QUESTION_COUNT.map((num) => (
        <RadioButton
          key={`key_${num}`}
          id={`${num}ques`}
          name="amount"
          value={num}
          onChange={handleChange}
          checked={preferences.amount === num}
        >
          {num}
        </RadioButton>
      ))}
      <SubTitle>Difficulty</SubTitle>
      {DIFFICULTIES.map((difficulty, index) => (
        <RadioButton
          key={index}
          id={`${difficulty}ques`}
          name="difficulty"
          value={difficulty}
          variant={difficulty}
          onChange={handleChange}
          checked={preferences.difficulty === difficulty}
        >
          <span style={{ textTransform: "capitalize" }}>{difficulty}</span>
        </RadioButton>
      ))}
      <SubTitle>Type</SubTitle>
      <RadioButton
        key={1}
        id="multi"
        name="type"
        value="multiple"
        onChange={handleChange}
        checked={preferences.type === "multiple"}
      >
        Multiple
      </RadioButton>
      <RadioButton
        key={2}
        id="bool"
        name="type"
        value="boolean"
        onChange={handleChange}
        checked={preferences.type === "boolean"}
      >
        Boolean
      </RadioButton>
      <SubTitle>Category</SubTitle>
      {CategoryData.map((item) => (
        <RadioButton
          key={item.ID}
          id={`category${item.CategoryID}`}
          name="category"
          value={item.CategoryID}
          onChange={handleChange}
          checked={preferences.category === item.CategoryID.toString()}
        >
          {item.CategoryName}
        </RadioButton>
      ))}
      <hr></hr>
      <div className="buttons">
        {/* 
          - Does this button really needed?.
          - We save the changes on every value change.
          - If you only want to save the changes on button click, you might consider using a From
          and handle the submit event where you can gather the data from the form and save it into your reducer
        */}
        <PrefButton>Save Prefs</PrefButton>
        <PrefButton onClick={reset}>Reset Prefs</PrefButton>
      </div>
    </div>
  );
}
