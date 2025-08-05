import React from 'react';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100 p-8">
      <div className="p-10 rounded-xl bg-white shadow-xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">About This Application</h1>
        <p className="text-lg text-gray-600">
          This is a full-stack quiz application built with the MERN stack (MongoDB, Express, React, Node.js). 
          It allows users to register, log in, take quizzes on various topics and difficulties, and view their past results.
          The front-end is built with React and styled using Tailwind CSS for a modern, responsive design.
        </p>
      </div>
    </div>
  );
}

export default About;
