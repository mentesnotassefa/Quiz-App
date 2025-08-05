import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, difficulty, amount } = location.state || {};
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Utility function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    if (!category || !amount) {
      setError("Please select a category, difficulty, and number of questions to start a quiz.");
      // Redirect back to category page if no state is present
      navigate('/category');
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/questions`, {
          params: {
            amount: amount,
            category: category,
            difficulty: difficulty,
          },
        });

        const decodedQuestions = response.data.map(q => ({
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(ans => decodeHtml(ans)),
          // Combine and shuffle all answers for the quiz
          all_answers: [...q.incorrect_answers.map(ans => decodeHtml(ans)), decodeHtml(q.correct_answer)].sort(() => Math.random() - 0.5),
        }));

        setQuestions(decodedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err.response ? err.response.data.message : err.message);
        setError(err.response ? err.response.data.message : 'Error fetching questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [category, difficulty, amount, navigate]);

  const handleAnswerSelect = (answer) => {
    if (showResults) return; // Prevent changing selection after results are shown
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    setShowResults(true); // Show results
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    
    // Move to the next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResults(false);
      } else {
        finishQuiz();
      }
    }, 2000); // 2-second delay
  };

  const finishQuiz = async () => {
    const quizResult = {
      category: category,
      score: score,
      questions: questions,
    };
    navigate('/result', { state: { quizResult } });
  };

  const getButtonClass = (answer) => {
    const baseClasses = "p-4 rounded-lg text-left font-semibold transition-colors duration-200 ease-in-out transform hover:scale-105";

    if (!showResults) {
      // Before results are shown
      return `${baseClasses} ${selectedAnswer === answer ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`;
    } else {
      // After results are shown
      const currentQuestion = questions[currentQuestionIndex];
      if (answer === currentQuestion.correct_answer) {
        return `${baseClasses} bg-blue-600 text-white shadow-lg border-2 border-blue-800`;
      } else if (answer === selectedAnswer) {
        return `${baseClasses} bg-red-600 text-white shadow-lg border-2 border-red-800`;
      } else {
        return `${baseClasses} bg-gray-400 text-gray-800`;
      }
    }
  };

  const renderQuiz = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div className="p-8 rounded-xl bg-white shadow-xl w-full max-w-3xl text-center space-y-6">
        <div className="flex justify-between items-center text-gray-600 text-lg font-bold">
            <span className="bg-gray-200 px-4 py-1 rounded-full shadow-inner">Question {currentQuestionIndex + 1} / {questions.length}</span>
            <span className="bg-gray-200 px-4 py-1 rounded-full shadow-inner">Score: {score}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 my-4">{currentQuestion.question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {currentQuestion.all_answers.map((answer, index) => (
            <button
              key={index}
              className={getButtonClass(answer)}
              onClick={() => handleAnswerSelect(answer)}
              disabled={showResults}
            >
              {answer}
            </button>
          ))}
        </div>
        <button
          className="mt-6 bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 w-full md:w-auto"
          onClick={checkAnswer}
          disabled={!selectedAnswer || showResults}
        >
          {showResults ? "Next Question" : "Submit Answer"}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center pt-20">
      {loading ? (
        <p className="text-3xl font-semibold text-gray-700">Loading questions...</p>
      ) : error ? (
        <p className="text-2xl text-red-500 p-6 rounded-lg bg-white shadow-lg">{error}</p>
      ) : questions.length > 0 ? (
        renderQuiz()
      ) : (
        <p className="text-2xl p-6 rounded-lg bg-white shadow-lg text-gray-700">No questions found. Please try another category or number of questions.</p>
      )}
    </div>
  );
}

export default Quiz;
