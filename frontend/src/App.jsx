import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    amount: 10,
    difficulty: "easy",
  });
  const [score, setScore] = useState(0);
  const [quizSummary, setQuizSummary] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetQuiz = () => {
    setScore(0);
    setQuizSummary(null);
    setQuizConfig({ category: "", amount: 10, difficulty: "easy" });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <main className="container mx-auto mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/category" element={<Category setQuizConfig={setQuizConfig} />} />
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
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;