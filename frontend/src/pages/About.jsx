import React from 'react';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
      <div className="p-8 rounded-lg bg-white shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About This Application</h1>
        <p className="text-lg text-gray-600">
          This is a full-stack quiz application built with the MERN stack (MongoDB, Express, React, Node.js). 
          It allows users to register, log in, take quizzes on various topics and difficulties, and view their past results.
        </p>
      </div>
    </div>
  );
}

export default About;
