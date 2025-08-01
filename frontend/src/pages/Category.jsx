import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Category({ setQuizConfig }) {
  const [selectedCategory, setSelectedCategory] = useState("General Knowledge");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const categories = [
    "General Knowledge", "History", "Science", "Biology", "Chemistry",
    "Physics", "Mathematics", "Social Science", "Computer", "Politics",
    "Music", "Art", "Sport", "Vehicles", "Books", "Geography",
    "Comics", "Film"
  ];

  const difficulties = ["easy", "medium", "hard"];

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setQuizConfig({
      category: selectedCategory,
      amount: parseInt(amount),
      difficulty: selectedDifficulty,
    });
    navigate("/quiz");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Choose Your Quiz</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">Category:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-lg border-2 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">Difficulty:</label>
          <div className="flex space-x-4">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`p-3 rounded-lg border-2 w-full ${
                  selectedDifficulty === diff
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">Number of Questions:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max="50"
            className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleStartQuiz}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-900"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Category;