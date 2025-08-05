import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizResult } = location.state || {};
  const [historySaved, setHistorySaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const saveQuizHistory = async () => {
    const token = getToken();
    if (!token) {
      console.error("No token found. Cannot save quiz history.");
      setError("You must be logged in to save your history.");
      setLoading(false);
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/quizzes/history', quizResult, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Quiz history saved successfully.");
      setHistorySaved(true);
      setLoading(false);
    } catch (err) {
      console.error("Failed to save quiz history:", err.response?.status, err.response?.data?.message || err.message);
      setError("Failed to save quiz history. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizResult) {
      saveQuizHistory();
    }
  }, [quizResult]);

  if (!quizResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
        <p className="text-2xl text-red-500">No quiz result found. Please take a quiz first.</p>
        <button
          onClick={() => navigate('/category')}
          className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Go to Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
      <div className="p-10 rounded-xl bg-white shadow-xl w-full max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">Quiz Finished!</h1>
        <p className="text-xl text-gray-700">Category: <span className="font-semibold">{quizResult.category || "General"}</span></p>
        <p className="text-3xl font-bold text-gray-800">Your Score: <span className="text-5xl text-green-600">{quizResult.score}</span> / {quizResult.questions.length}</p>
        
        {loading ? (
          <p className="text-gray-500">Saving history...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-600 font-semibold">Quiz history has been saved successfully!</p>
        )}

        <button
          onClick={() => navigate('/category')}
          className="mt-6 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-bold text-lg"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
