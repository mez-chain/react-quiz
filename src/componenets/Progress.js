function Progress({ currQuestion, numQuestions, score, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currQuestion - 1 + Number(answer !== null)}
      ></progress>
      <p>
        Question<strong> {currQuestion}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score} </strong>/ {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
