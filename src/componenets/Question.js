function Question({ question, dispatch, answer, numQuestions, currQuestion }) {
  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              className={`btn btn-option ${
                answer !== null &&
                (question.correctOption === index ? "correct" : "wrong ")
              } ${index === answer ? "answer" : ""}`}
              key={option}
              disabled={answer !== null}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {answer !== null && currQuestion < numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {currQuestion === numQuestions - 1 && answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "lastQuestion" })}
        >
          Finish!
        </button>
      )}
    </>
  );
}

export default Question;
