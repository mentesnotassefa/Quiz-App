import { Link } from "react-router-dom";

function Result({ score, quizSummary }) {
  const correctQuestions = quizSummary.questions.filter((q) => q.isCorrect);
  const incorrectQuestions = quizSummary.questions.filter((q) => !q.isCorrect);

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-2">Your Final Score: {score}</p>
      <p className="text-lg mb-6">
        Summary: Correct: {quizSummary.correct}, Incorrect: {quizSummary.incorrect}
      </p>

      {/* Correct Answers */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-green-600">Correct Answers</h3>
        {correctQuestions.length > 0 ? (
          <ul className="space-y-2 text-left">
            {correctQuestions.map((q, idx) => (
              <li key={idx} className="bg-green-100 p-2 rounded">
                <span dangerouslySetInnerHTML={{ __html: q.question }} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No correct answers.</p>
        )}
      </div>

      {/* Incorrect Answers */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-red-600">Incorrect Answers</h3>
        {incorrectQuestions.length > 0 ? (
          <ul className="space-y-2 text-left">
            {incorrectQuestions.map((q, idx) => (
              <li key={idx} className="bg-red-100 p-2 rounded">
                <span dangerouslySetInnerHTML={{ __html: q.question }} />{" "}
                <span className="text-sm">
                  (You answered: "<span dangerouslySetInnerHTML={{ __html: q.userAnswer }} />", Correct: "
                  <span dangerouslySetInnerHTML={{ __html: q.correctAnswer }} />")
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No incorrect answers.</p>
        )}
      </div>

      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Restart Quiz
      </Link>
    </div>
  );
}

export default Result;