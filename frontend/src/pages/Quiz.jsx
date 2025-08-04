import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  // Utility function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch quiz history on component mount or when user logs in
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const headers = getHeaders();
        if (!headers.Authorization) {
          console.log("No authorization token found. Cannot fetch history.");
          // You might want to display a message to the user here
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:5000/api/QuizResult/history', { headers });
        setHistory(response.data);
      } catch (err) {
        console.error("Failed to fetch quiz history:", err);
        setError("Failed to fetch quiz history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const startQuiz = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/QuizHistory/questions`, {
        params: {
          amount: 10,
          category: selectedCategory,
          difficulty: selectedDifficulty,
        },
      });

      const decodedQuestions = response.data.map(q => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(ans => decodeHtml(ans)),
      }));

      setQuestions(decodedQuestions);
      setQuizStarted(true);
      setQuizFinished(false);
      setScore(0);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Error starting quiz:", err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : 'Error starting quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);
    const token = getToken();
    if (!token) {
      console.error("No token found. Cannot save quiz history.");
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/QuizHistory/history', {
        category: selectedCategory,
        score,
        questions: questions,
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      // Update history state to show new quiz
      const response = await axios.get('http://localhost:5000/api/QuizHistory/history', { headers: { Authorization: `Bearer ${token}` } });
      setHistory(response.data);

    } catch (err) {
      console.error("Failed to save quiz history:", err.response ? err.response.data.message : err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderQuiz = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    // Shuffle the answers to make the quiz more dynamic
    answers.sort(() => Math.random() - 0.5);

    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h2>
        <p className="text-xl">{currentQuestion.question}</p>
        <div className="flex flex-col space-y-2">
          {answers.map((answer, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg transition-colors duration-200 ${
                selectedAnswer === answer
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
        <button
          className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400"
          onClick={checkAnswer}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    );
  };

  const renderQuizSetup = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Start a New Quiz</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col space-y-2">
        <label>
          Select Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ml-2 p-2 rounded-md border"
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
        <label>
          Select Difficulty:
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="ml-2 p-2 rounded-md border"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <button
        className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400"
        onClick={startQuiz}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Start Quiz'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Quiz Application</h1>
      <button
        className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 absolute top-4 right-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      {quizFinished && (
        <div className="text-center mb-8 p-6 rounded-lg bg-white shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-green-600 mb-2">Quiz Finished!</h2>
          <p className="text-2xl">Your Score: {score} / {questions.length}</p>
          <button
            className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            onClick={() => setQuizFinished(false)}
          >
            Take Another Quiz
          </button>
        </div>
      )}

      {!quizStarted ? (
        renderQuizSetup()
      ) : (
        <div className="p-6 rounded-lg bg-white shadow-lg w-full max-w-2xl">
          {renderQuiz()}
        </div>
      )}

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Quiz History</h2>
        {loading ? (
          <p>Loading history...</p>
        ) : (
          <ul className="space-y-4">
            {history.length > 0 ? (
              history.map((h) => (
                <li key={h._id} className="p-4 rounded-lg bg-white shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{h.category}</p>
                    <p className="text-sm text-gray-500">{new Date(h.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-lg font-semibold">{`Score: ${h.score} / ${h.questions.length}`}</p>
                </li>
              ))
            ) : (
              <p>No quiz history found. Take a quiz to get started!</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Quiz;
