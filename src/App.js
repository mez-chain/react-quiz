import { useEffect, useReducer } from "react";
import Header from "./componenets/Header";
import Main from "./componenets/Main";
import Loader from "./componenets/Loader";
import Error from "./componenets/Error";
import StartScreen from "./componenets/StartScreen";
import Question from "./componenets/Question";
import Progress from "./componenets/Progress";
import FinishScreen from "./componenets/FinishScreen";

const initialState = {
  questions: [],
  //"loading" "error" "ready" "active" "finished"
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "lastQuestion":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        score: 0,
      };
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, answer, score, highScore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              currQuestion={index + 1}
              score={score}
              totalPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              currQuestion={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            totalPoints={maxPossiblePoints}
            dispatch={dispatch}
            data={questions}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
