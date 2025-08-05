import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100 p-8">
      <div className="p-10 rounded-xl bg-white shadow-xl text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to the Quiz Application</h1>
        <p className="mt-4 text-xl text-gray-600">Please navigate to the Quiz page to start a new quiz, or view your past results on the History page.</p>
      </div>
    </div>
  );
}

export default Home;
