function FinishScreen({ score, totalPoints, dispatch, highScore }) {
  const result = Math.round((score / totalPoints) * 100);

  let emoji;

  if (result === 100) emoji = "🥇";
  if (result >= 80 && result < 100) emoji = "🎉";
  if (result >= 50 && result < 80) emoji = "😃";
  if (result >= 0 && result < 50) emoji = "🤔";
  if (result === 0) emoji = "🤦🏼‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored {score} out of {totalPoints} ({result}%)
      </p>

      <p className="highscore">(Highscore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
