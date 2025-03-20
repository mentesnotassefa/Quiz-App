import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-red-600 text-white">
        <h1 className="text-3xl font-bold p-4 text-white">Quiz App</h1>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;