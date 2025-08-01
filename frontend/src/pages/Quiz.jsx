import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Quiz component to fetch, display, and manage a quiz session.
 * @param {object} props - Component props.
 * @param {object} props.quizConfig - Configuration for the quiz (category, amount, difficulty).
 * @param {number} props.score - The current score.
 * @param {function} props.setScore - Function to update the score.
 * @param {function} props.setQuizSummary - Function to save the quiz summary at the end.
 */
function Quiz({ quizConfig, score, setScore, setQuizSummary }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Redirect if not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quizzes/questions`, {
          params: {
            amount: quizConfig.amount,
            category: quizConfig.category,
            difficulty: quizConfig.difficulty,
          },
        });
        setQuestions(response.data.map(q => ({
          ...q,
          // Shuffle options on the frontend for variety
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizConfig, token, navigate]);

  const handleAnswer = async (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    const questionData = {
      question: questions[currentQuestion].question,
      userAnswer: answer,
      correctAnswer: questions[currentQuestion].correctAnswer,
      isCorrect: correct,
    };
    setAnsweredQuestions((prev) => [...prev, questionData]);

    setTimeout(async () => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        const correctCount = answeredQuestions.filter((q) => q.isCorrect).length + (correct ? 1 : 0);
        const incorrectCount = answeredQuestions.filter((q) => !q.isCorrect).length + (correct ? 0 : 1);
        const finalQuizSummary = {
          correct: correctCount,
          incorrect: incorrectCount,
          questions: [...answeredQuestions, questionData],
        };
        setQuizSummary(finalQuizSummary);

        // Save the quiz history to the backend
        try {
          await axios.post(`${API_BASE_URL}/quizzes/history`, {
            category: quizConfig.category,
            score: finalScore,
            questions: finalQuizSummary.questions,
            date: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Error saving quiz history:", error);
        }

        navigate("/result");
      }
    }, 1000);
  };

  if (loading) {
    return <div className="text-center p-4 dark:text-white">Loading...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-4 dark:text-white">
        No questions found for the selected category. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{quizConfig.category} Quiz</h2>
      <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
        Question {currentQuestion + 1}/{questions.length} | Score: {score}
      </p>
      <p className="mb-4 text-xl text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
      <div className="space-y-2">
        {questions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className={`w-full p-3 rounded-lg text-left transition-colors duration-300
              ${
                selectedAnswer === opt
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white shadow hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              }
              ${selectedAnswer && "cursor-not-allowed"}
            `}
            disabled={selectedAnswer !== null}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      {selectedAnswer && (
        <p className={`mt-4 text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"} dark:${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"} The correct answer was: "<span dangerouslySetInnerHTML={{ __html: questions[currentQuestion].correctAnswer }} />"
        </p>
      )}
    </div>
  );
}

export default Quiz;