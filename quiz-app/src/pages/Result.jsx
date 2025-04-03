import { Link } from "react-router-dom";

function Result({ score, quizSummary, resetQuiz }) {
  const correctQuestions = quizSummary.questions.filter((q) => q.isCorrect);
  const incorrectQuestions = quizSummary.questions.filter((q) => !q.isCorrect);

  return (
    <div className="max-w-4xl mx-auto p-4 text-center dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quiz Completed!</h2>
      <p className="text-xl mb-2 text-gray-900 dark:text-white">Your Final Score: {score}</p>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
        Summary: Correct: {quizSummary.correct}, Incorrect: {quizSummary.incorrect}
      </p>

      {/* Correct Answers */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">Correct Answers</h3>
        {correctQuestions.length > 0 ? (
          <ul className="space-y-2 text-left">
            {correctQuestions.map((q, idx) => (
              <li
                key={idx}
                className="bg-green-100 p-2 rounded dark:bg-green-800 dark:text-green-100"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400">No correct answers.</p>
        )}
      </div>

      {/* Incorrect Answers */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">Incorrect Answers</h3>
        {incorrectQuestions.length > 0 ? (
          <ul className="space-y-2 text-left">
            {incorrectQuestions.map((q, idx) => (
              <li key={idx} className="bg-red-100 p-2 rounded dark:bg-red-800 dark:text-red-100">
                <span dangerouslySetInnerHTML={{ __html: q.question }} />{" "}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  (You answered: "<span dangerouslySetInnerHTML={{ __html: q.userAnswer }} />", Correct: "
                  <span dangerouslySetInnerHTML={{ __html: q.correctAnswer }} />")
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400">No incorrect answers.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        <Link
          to="/"
          onClick={resetQuiz}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-900"
        >
          Restart Quiz
        </Link>
        <Link
          to="/history"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
        >
          View History
        </Link>
      </div>
    </div>
  );
}

export default Result;