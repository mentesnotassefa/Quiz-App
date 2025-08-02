// controllers/quizController.js
// This file contains the logic for handling quiz results.

const QuizHistory = require('../models/QuizResult');
const QuizResult = require('../models/QuizResult');

// @desc    Submit a new quiz result
// @route   POST /api/quizzes/submit
// @access  Private
exports.submitQuiz = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id; // This comes from the auth middleware

  try {
    // Create a new quiz result instance
    const newQuizResult = new QuizHistory({
      user: userId,
      score,
    });

    // Save the result to the database
    const quizResult = await newQuizResult.save();

    res.status(201).json(quizResult);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all quiz results for the authenticated user
// @route   GET /api/quizzes/results
// @access  Private
exports.getQuizResults = async (req, res) => {
  const userId = req.user.id; // This comes from the auth middleware

  try {
    // Find all quiz results for the authenticated user, sorted by date
    const quizResults = await QuizResult.find({ user: userId }).sort({ date: -1 });

    res.json(quizResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
