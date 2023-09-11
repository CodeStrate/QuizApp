import React from "react";
import ReactDOM from "react-dom/client";
import App from "./TitleScreen.jsx";
import QuizDataProvider from "./context/quizDataContext/QuizDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizDataProvider>
      <App />
    </QuizDataProvider>
  </React.StrictMode>
);
