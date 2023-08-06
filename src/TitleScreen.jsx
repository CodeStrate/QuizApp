import "./App.css";

//Components
import { AiFillSetting, AiFillPlayCircle } from "react-icons/ai";
import Preferences from "./components/Preferences";
import useToggle from "./services-hooks/useToggle";
import usePreferences from "./services-hooks/usePreferences";

//styled Components
import { Paragraph } from "./styledComponents/Paragraph";
import { Title } from "./styledComponents/Title";
import { Button } from "./styledComponents/Button";
import QuizScreen from "./components/QuizScreen";

function App() {
  const { preferences, reset, update } = usePreferences({
    amount: 5,
    difficulty: "easy",
    type: "multiple",
    category: "9",
  });
  const [openPrefs, togglePrefs] = useToggle(false);
  const [isPlaying, togglePlaying] = useToggle(false);

  return (
    <main className="title--screen">
      <span onClick={togglePrefs} className="icon pref">
        <AiFillSetting />
      </span>
      <span className="icon music">
        <AiFillPlayCircle />
      </span>
      <Preferences
        open={openPrefs}
        preferences={preferences}
        reset={reset}
        update={update}
      />

      {isPlaying ? (
        <QuizScreen
          className={`container quiz ${openPrefs && "open"}`}
          apiParams={preferences}
        />
      ) : (
        <div className={`container ${openPrefs && "open"}`}>
          <Title>The Quiz Ultra Pro Max</Title>
          <br />
          <Paragraph>
            This is probably the `Ultimate` and Best version of Quizzical you'll
            experience!
          </Paragraph>
          <br />
          <Button onClick={togglePlaying}>Begin Game</Button>
        </div>
      )}
    </main>
  );
}

export default App;
