import { Link } from "react-router-dom";

function Result({ score }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Result</h2>
      <p className="text-lg mb-4">Quiz Completed!</p>
      <p className="text-xl mb-4">You Scored: {score} / 20</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Restart Quiz
      </Link>
    </div>
  );
}

export default Result;