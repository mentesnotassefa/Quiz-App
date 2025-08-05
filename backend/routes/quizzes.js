const express = require("express");
const auth = require("../middleware/authMiddleware");
const { fetchQuestions, saveHistory, getHistory } = require("../controllers/quizController");

const router = express.Router();

// @route GET /api/quizzes/questions
// @desc Fetch quiz questions from OpenTDB using the controller function
router.get("/questions", fetchQuestions);

// @route POST /api/quizzes/history
// @desc Save a completed quiz to history using the controller function
router.post("/history", auth, saveHistory);

// @route GET /api/quizzes/history
// @desc Get all quiz history for the authenticated user using the controller function
router.get("/history", auth, getHistory);

module.exports = router;