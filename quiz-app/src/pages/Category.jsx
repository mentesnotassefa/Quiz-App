import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Category({ setQuizConfig }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(10); // Default to 10
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy"); // Default to easy
  const navigate = useNavigate();

  const categories = [
    "Biology", "Chemistry", "General Knowledge", "History",
    "Mathematics", "Physics", "Social Science", "Science",
  ];
  const amounts = [5, 10, 15, 20];
  const difficulties = ["easy", "medium", "hard"];

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
      <h2 className="text-2xl font-bold mb-6">Select Your Quiz</h2>
      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block mb-2 text-xl font-semibold">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full max-w-xs p-2 border rounded-lg bg-white shadow"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block mb-2 text-xl font-semibold">Number of Questions </label>
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
        <div>
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
    </div>
  );
}

export default Category;