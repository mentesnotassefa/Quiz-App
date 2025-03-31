import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz({ quizConfig, score, setScore }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const categoryMap = {
        Biology: 27, Chemistry: 27, "General Knowledge": 9, History: 23,
        Mathematics: 19, Physics: 27, "Social Science": 22, Science: 27,
      };
      const categoryId = categoryMap[quizConfig.category] || 9;

      try {
        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: quizConfig.amount, // Uses selected amount
            category: categoryId,
            difficulty: quizConfig.difficulty, // Uses selected difficulty
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
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/result");
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {quizConfig.category} Question {currentQuestion + 1}/{questions.length}
      </h2>
      <p className="mb-4" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
      <div className="space-y-2">
        {questions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="w-full bg-white p-3 rounded-lg shadow hover:bg-gray-100 text-left"
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;