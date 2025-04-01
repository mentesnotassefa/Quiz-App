import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";

import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import History from "./pages/History";

function App() {
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "easy",
    amount: 10,
  });
  const [score, setScore] = useState(0);
  const [quizSummary, setQuizSummary] = useState({ correct: 0, incorrect: 0, questions: [] });
  const [quizHistory, setQuizHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("quizHistory") || "[]"); // Initialize from localStorage
  });

  // Sync quizHistory with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      setQuizHistory(updatedHistory);
      console.log("Loaded from localStorage in App:", updatedHistory); // Debug log
    };

    // Load initial history and listen for changes
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange); // Cleanup
  }, []);

  const resetQuiz = () => {
    setScore(0);
    setQuizSummary({ correct: 0, incorrect: 0, questions: [] });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category setQuizConfig={setQuizConfig} />} />
          <Route path="/about" element={<About />} />
         
          <Route
            path="/quiz"
            element={
              <Quiz
                quizConfig={quizConfig}
                score={score}
                setScore={setScore}
                setQuizSummary={setQuizSummary}
              />
            }
          />
          <Route
            path="/result"
            element={<Result score={score} quizSummary={quizSummary} resetQuiz={resetQuiz} />}
          />
          <Route path="/history" element={<History quizHistory={quizHistory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;