import "./App.css";

import { AiFillSetting, AiFillPlayCircle } from "react-icons/ai";
import Preferences from "./components/Preferences";
import useToggle from "./services-hooks/useToggle";
import usePreferences from "./services-hooks/usePreferences";

import { Paragraph } from "./styledComponents/Paragraph";
import { Title } from "./styledComponents/Title";
import { Button } from "./styledComponents/Button";
import { useQuizData } from "./context/quizDataContext/QuizDataContext";
import QuizScreen from "./components/QuizScreen";
import { GameStatus } from "./context/quizDataContext/reducer";

const App = () => {
  const { gameStatus, newGame } = useQuizData();

  if (
    gameStatus === GameStatus.Playing ||
    gameStatus === GameStatus.Over ||
    gameStatus === GameStatus.Loading
  ) {
    return (
      <Layout
        render={({ openPrefs, preferences }) => (
          <QuizScreen
            className={`container quiz ${openPrefs ? "open" : ""}`}
            preferences={preferences}
          />
        )}
      />
    );
  }

  if (gameStatus === GameStatus.Idle) {
    return (
      <Layout
        render={({ openPrefs, preferences }) => (
          <div className={`container ${openPrefs ? "open" : ""}`}>
            <Title>The Quiz Ultra Pro Max</Title>
            <br />
            <Paragraph>
              This is probably the `Ultimate` and Best version of Quizzical
              you&apos;ll experience!
            </Paragraph>
            <br />
            <Button onClick={() => newGame(preferences)}>Begin Game</Button>
          </div>
        )}
      />
    );
  }

  throw new Error("Unsuppoerted gameStatus: " + gameStatus);
};

const Layout = ({ render }) => {
  const { preferences, reset, update } = usePreferences({
    amount: 5,
    difficulty: "easy",
    type: "multiple",
    category: "9",
  });
  const [openPrefs, togglePrefs] = useToggle(false);

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
      {render({ openPrefs, preferences })}
    </main>
  );
};

export default App;
