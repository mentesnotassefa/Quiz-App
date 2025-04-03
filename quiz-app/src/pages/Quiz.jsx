import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz({ quizConfig, score, setScore, setQuizSummary }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const categoryMap = {
        Biology: 27, Chemistry: 27, "General Knowledge": 9, History: 23,
        Mathematics: 19, Physics: 27, "Social Science": 22, Science: 27,
        Computer: 18, Politics:24, Music: 12, Art: 25, Sport: 21, Vehicles: 28,
        Books: 10, Geography: 22, Comics: 29, Film: 11,
      };
      const categoryId = categoryMap[quizConfig.category] || 9;

      try {
        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: quizConfig.amount,
            category: categoryId,
            difficulty: quizConfig.difficulty,
            type: "multiple",
          },
        });
        setQuestions(
          response.data.results.map((q) => ({
            question: q.question,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: q.correct_answer,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizConfig]);

  const handleAnswer = (answer) => {
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

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        const correctCount = answeredQuestions.filter((q) => q.isCorrect).length + (correct ? 1 : 0);
        const incorrectCount = answeredQuestions.filter((q) => !q.isCorrect).length + (correct ? 0 : 1);
        const quizSummary = {
          correct: correctCount,
          incorrect: incorrectCount,
          questions: [...answeredQuestions, questionData],
        };
        setQuizSummary(quizSummary);

        // Save quiz history to localStorage
        const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
        const newQuiz = {
          category: quizConfig.category,
          score: score + (correct ? 1 : 0), // Final score
          date: new Date().toLocaleString(), // Readable timestamp
        };
        localStorage.setItem("quizHistory", JSON.stringify([...quizHistory, newQuiz]));

        navigate("/result");
      }
    }, 1000);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

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
            className={`w-full p-3 rounded-lg text-left ${
              selectedAnswer === opt
                ? isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white shadow hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            }`}
            disabled={selectedAnswer !== null}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      {selectedAnswer && (
        <p className={`mt-4 text-lg ${isCorrect ? "text-green-600" : "text-red-600"} dark:${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"} The correct answer was: "{questions[currentQuestion].correctAnswer}"
        </p>
      )}
    </div>
  );
}

export default Quiz;