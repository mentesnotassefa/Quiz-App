import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 text-black">
        <h1 className="text-3xl font-bold p-4 text-black">Quiz App</h1>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;