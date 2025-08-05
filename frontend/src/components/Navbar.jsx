import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="flex space-x-6">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Home
        </Link>
        <Link to="/category" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Quiz
        </Link>
        <Link to="/history" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
          History
        </Link>
        <Link to="/about" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
          About
        </Link>
      </div>
      {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
