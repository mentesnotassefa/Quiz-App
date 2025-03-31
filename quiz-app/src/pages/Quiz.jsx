import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz({ quizConfig, score, setScore }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Track if answer is correct
  const navigate = useNavigate();

  // Fetch questions from OpenTDB API
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

  // Handle answer selection
  const handleAnswer = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    // Update score if correct
    if (correct) {
      setScore(score + 1);
    }

    // Move to next question or result after a delay
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset for next question
        setIsCorrect(null);
      } else {
        navigate("/result");
      }
    }, 1500); // 1.5-second delay to show feedback
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {quizConfig.category} Quiz
      </h2>
      <p className="text-lg mb-2">
        Question {currentQuestion + 1}/{questions.length} | Score: {score}
      </p>
      <p
        className="mb-4 text-xl"
        dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}
      />
      <div className="space-y-2">
        {questions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className={`w-full p-3 rounded-lg text-left ${
              selectedAnswer === opt
                ? isCorrect
                  ? "bg-blue-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white shadow hover:bg-gray-100"
            }`}
            disabled={selectedAnswer !== null} // Disable after selection
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      {selectedAnswer && (
        <p className={`mt-4 text-lg ${isCorrect ? "text-blue-600" : "text-red-600"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"} The correct answer was: "
          {questions[currentQuestion].correctAnswer}"
        </p>
      )}
    </div>
  );
}

export default Quiz;