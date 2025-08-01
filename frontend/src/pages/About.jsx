import { Link } from "react-router-dom";

function About() {
  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About</h2>
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
        Welcome to the Quiz App! This application is designed to test your knowledge across various topics, including
        Biology, History, Mathematics, and more. Whether you're a student, a trivia enthusiast, or just looking to have
        some fun, we've got you covered.
      </p>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
      <p className="mb-4">Challenge your knowledge with fun and interactive quizzes!</p>
      <p><strong>Get in Touch:</strong> mentesnotassefa0@gmail.com</p>
      <p><strong>Developed By:</strong> Mentesnot Assefa</p>
      <p className="animate-pulse text-blue-900 dark:text-gray-300">ALX AFRICA Capstone Project</p>
      <p className="animate-pulse text-red-900 dark:text-gray-300">April 2025</p>
        
      </p>
      
      <Link
        to="/"
        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-900"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default About;