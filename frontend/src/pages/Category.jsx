import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Category() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleStartQuiz = () => {
    // Navigate to the Quiz page with state
    navigate('/quiz', { state: { category: selectedCategory, difficulty: selectedDifficulty, amount: numberOfQuestions } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100 p-8">
      <div className="p-10 rounded-xl bg-white shadow-xl w-full max-w-lg text-center space-y-6 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-gray-800">Select Quiz Options</h1>
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold text-gray-700">
            Select Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ml-4 p-3 rounded-md border border-gray-300 w-full mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">Any Category</option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="Books">Books</option>
              <option value="Film">Film</option>
              <option value="Music">Music</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Geography">Geography</option>
              <option value="Comics">Comics</option>
              <option value="Vehicles">Vehicles</option>
            </select>
          </label>
          <label className="text-lg font-semibold text-gray-700">
            Select Difficulty:
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="ml-4 p-3 rounded-md border border-gray-300 w-full mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="text-lg font-semibold text-gray-700">
            Number of Questions:
            <input
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              min="1"
              max="50"
              className="ml-4 p-3 rounded-md border border-gray-300 w-full mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </label>
        </div>
        <button
          className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 w-full font-bold text-lg"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Category;
