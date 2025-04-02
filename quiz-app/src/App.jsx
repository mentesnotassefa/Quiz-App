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
    return JSON.parse(localStorage.getItem("quizHistory") || "[]");
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Load from localStorage
  });

  // Sync quizHistory with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      setQuizHistory(updatedHistory);
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Apply dark mode class and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const resetQuiz = () => {
    setScore(0);
    setQuizSummary({ correct: 0, incorrect: 0, questions: [] });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
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