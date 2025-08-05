import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Quiz Application</h1>
      <p className="mt-4 text-xl text-gray-600">Please navigate to the Quiz page to start a quiz or History to see your past results.</p>
    </div>
  );
}

export default Home;
