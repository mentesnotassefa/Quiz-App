import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";

const isAuthenticated = () => {
  return localStorage.getItem('token');
};

function App() {
  return (
    <Router>
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <main className="pt-20"> {/* Add top padding to prevent content from being hidden behind the fixed navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes - Only accessible when authenticated */}
          <Route
            path="/"
            element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/category"
            element={isAuthenticated() ? <Category /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz"
            element={isAuthenticated() ? <Quiz /> : <Navigate to="/login" />}
          />
          <Route
            path="/result"
            element={isAuthenticated() ? <Result /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={isAuthenticated() ? <History /> : <Navigate to="/login" />}
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
