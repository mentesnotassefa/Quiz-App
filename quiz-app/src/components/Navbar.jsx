import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-white text-xl font-bold">
          Quiz App
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} md:flex space-x-4 md:space-x-6`}>
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/category" className="text-white hover:text-gray-200">Category</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;