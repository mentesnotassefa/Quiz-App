import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";


function App() {
  const [quizConfig, setQuizConfig] = useState({
    category: "",
    difficulty: "easy",
    amount: 10,
  });
  const [score, setScore] = useState(0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home setQuizConfig={setQuizConfig} />} />
          <Route path="/about" element={<About />} />
          <Route path="/category" element={<Category setQuizConfig={setQuizConfig} />} />
          <Route path="/quiz" element={<Quiz quizConfig={quizConfig} score={score} setScore={setScore} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;