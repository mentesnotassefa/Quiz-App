import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white animate-fade-in delay-600">Welcome to the Quiz App</h1>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">Test your knowledge with fun quizzes!</p>
      <Link
        to="/category"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 "
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default Home;