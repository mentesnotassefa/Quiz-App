import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Category({ setQuizConfig }) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const navigate = useNavigate();

  const categories = [
    "Biology", "Chemistry", "General Knowledge", "History",
    "Mathematics", "Physics", "Social Science", "Science",
  ];
  const amounts = [5, 10, 15, 20];
  const difficulties = ["easy", "medium", "hard"];

  // Filter categories based on search term
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
      <h2 className="text-2xl font-bold mb-6">Configure Your Quiz</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search quiz topics..."
          className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold">Category:</label>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-lg shadow ${
                  selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600">
            No topics match your search. Try something like "Biology" or "History".
          </p>
        )}
      </div>

      {/* Number of Questions */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold">Number of Questions:</label>
        <select
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
          className="w-full max-w-xs p-2 border rounded-lg bg-white shadow"
        >
          {amounts.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Level */}
      <div className="mb-6">
        <label className="block mb-2 text-xl font-semibold">Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-lg bg-white shadow"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full max-w-xs"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Category;