import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "easy",
    amount: 10,
  });
  const [score, setScore] = useState(0);
  const [quizSummary, setQuizSummary] = useState({ correct: 0, incorrect: 0, questions: [] }); // Include questions

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category setQuizConfig={setQuizConfig} />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings setQuizConfig={setQuizConfig} />} />
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
          <Route path="/result" element={<Result score={score} quizSummary={quizSummary} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;