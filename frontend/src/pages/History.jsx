import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api";

function History() {
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => { 
      try {
        const response = await axios.get(`${API_BASE_URL}/QuizHistory/history`);
        setQuizHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to fetch quiz history.");
        setLoading(false);
      }
    };
    fetchHistory();
  }, [token, navigate]);

  if (loading) {
    return <div className="text-center p-4 dark:text-white">Loading history...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Quiz History</h2>

      {quizHistory.length > 0 ? (
        <ul className="space-y-4">
          {quizHistory.map((quiz, idx) => (
            <li key={idx} className="bg-white p-4 rounded-lg shadow dark:bg-gray-800 dark:text-gray-100">
              <p className="text-lg">
                <strong>Category:</strong> {quiz.category}
              </p>
              <p className="text-lg">
                <strong>Score:</strong> {quiz.score}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Date:</strong> {new Date(quiz.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          You have no quiz history yet. Take a quiz to see your results here!
        </p>
      )}

      <Link
        to="/"
        className="mt-6 inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-600"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default History;