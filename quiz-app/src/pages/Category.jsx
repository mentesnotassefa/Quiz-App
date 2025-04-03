import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Category({ setQuizConfig }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const navigate = useNavigate();

  const categories = [
    "Biology", "Chemistry", "General Knowledge", "History",
    "Mathematics", "Physics", "Social Science", "Science","Computer","Politics","Music","Art",
    "Sport","Vehicles", "Books", "Geography", "Comics", "Film",
  ];
  const amounts = [5, 10, 15, 20];
  const difficulties = ["easy", "medium", "hard"];

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartQuiz = () => {
    if (selectedCategory) {
      setQuizConfig((prev) => ({
        ...prev,
        category: selectedCategory,
        amount: selectedAmount,
        difficulty: selectedDifficulty,
      }));
      navigate("/quiz");
    } else {
      alert("Please select a category!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Configure Your Quiz</h2>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search quiz topics..."
          className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">Category:</label>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-lg shadow ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:animate-bounce delay-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No topics match your search. Try something like "Biology" or "History".
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">Number of Questions:</label>
        <select
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
          className="w-full max-w-xs p-2 border rounded-lg bg-white shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {amounts.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-lg bg-white shadow dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleStartQuiz}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-900 w-full max-w-xs"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Category;