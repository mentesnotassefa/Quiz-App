import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ setQuizConfig }) { // Accept setQuizConfig prop from App.jsx
  const [selectedCategory, setSelectedCategory] = useState(""); // Local state for dropdown
  const navigate = useNavigate();
  const categories = [
    "Biology", "Chemistry", "General Knowledge", "History",
    "Mathematics", "Physics", "Social Science", "Science",
  ];

  // Handle category selection from dropdown
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle Start Quiz button click
  const handleStartQuiz = () => {
    if (selectedCategory) {
      setQuizConfig((prev) => ({ ...prev, category: selectedCategory })); // Update quizConfig
      navigate("/quiz"); // Navigate to quiz
    } else {
      alert("Please select a category!"); // Basic validation
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz App</h1>
      <p className="text-lg mb-6">Test your knowledge with fun quizzes!</p>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-xl font-semibold">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
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
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;