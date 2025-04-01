import { Link } from "react-router-dom";

function History({ quizHistory }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {quizHistory.length > 0 ? (
        <ul className="space-y-4">
          {quizHistory.map((quiz, idx) => (
            <li key={idx} className="bg-white p-4 rounded-lg shadow">
              <p className="text-lg">
                <strong>Category:</strong> {quiz.category}
              </p>
              <p className="text-lg">
                <strong>Score:</strong> {quiz.score}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {quiz.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No quiz history yet. Take a quiz to see your results here!</p>
      )}
      <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Back to Home
      </Link>
    </div>
  );
}

export default History;