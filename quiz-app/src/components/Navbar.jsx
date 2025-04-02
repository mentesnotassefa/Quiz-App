import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/quiz-it-logo.png"; // Import the logo

function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo in Top-Left Corner */}
        <Link to="/">
          <img
            src={logo}
            alt="Quiz It! Logo"
            className="h-10 w-auto" // Adjust size as needed
          />
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex items-center space-x-4 md:space-x-6`}
        >
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/category" className="text-white hover:text-gray-200">
            Category
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
          
          <Link to="/history" className="text-white hover:text-gray-200">
            History
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;