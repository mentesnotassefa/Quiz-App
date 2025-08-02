const express = require("express");
const axios = require("axios");
const QuizHistory = require("../models/QuizResult");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Map friendly category names to OpenTDB category IDs.
// The keys are now all lowercase to handle case-insensitivity from the frontend.
const categoryMap = {
  "general knowledge": 9,
  "books": 10,
  "film": 11,
  "music": 12,
  "science": 17,
  "biology": 17,
  "chemistry": 17,
  "physics": 17,
  "mathematics": 19,
  "computer science": 18,
  "history": 23,
  "politics": 24,
  "art": 25,
  "sports": 21,
  "geography": 22,
  "comics": 29,
  "vehicles": 28,
};

// @route GET /api/quizzes/questions
// @desc Fetch quiz questions from OpenTDB
router.get("/questions", async (req, res) => {
  const { amount = 10, category, difficulty = "easy" } = req.query;
  // Convert the category string to lowercase to match the keys in our map.
  const lowercaseCategory = category.toLowerCase();
  const categoryId = categoryMap[lowercaseCategory];
  
  console.log("Fetching quiz questions with parameters:", { amount, category, difficulty });
  console.log("Normalized category name:", lowercaseCategory);
  console.log("Mapped category ID:", categoryId);

  if (!categoryId) {
    return res.status(400).json({ message: `Invalid category: "${category}". Please ensure it's a valid category from your list.` });
  }

  try {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    console.log("OpenTDB API URL:", url);
    const response = await axios.get(url);
    
    // Check the OpenTDB response code
    if (response.data.response_code !== 0) {
      const responseMessages = {
        1: "No Results: The API doesn't have enough questions for your query. Try a different category, amount, or difficulty.",
        2: "Invalid Parameter: Your request contains an invalid parameter. Check your category ID or amount.",
        3: "Token Not Found: The provided session token does not exist.",
        4: "Token Empty: The session token has been reset.",
        5: "Rate Limit: Too many requests.",
      };
      const errorMessage = responseMessages[response.data.response_code] || "An unexpected error occurred with the OpenTDB API.";
      console.error("OpenTDB API Error:", errorMessage);
      return res.status(404).json({ message: errorMessage });
    }

    if (response.data.results.length === 0) {
      console.error("OpenTDB API returned an empty results array.");
      return res.status(404).json({ message: "No questions found for the selected category. Please try again with a different category or difficulty." });
    }

    res.json(response.data.results);
  } catch (err) {
    console.error("Error fetching questions from OpenTDB:", err);
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// @route POST /api/QuizHistory/history
// @desc Save a completed quiz to history
router.post("/history", auth, async (req, res) => {
  const { category, score, questions } = req.body;
  try {
    const newHistory = new QuizHistory({
      user: req.user.id,
      category,
      score,
      questions,
    });
    await newHistory.save();
    res.status(201).json({ message: "Quiz history saved successfully" });
  } catch (err) {
    console.error("Error saving quiz history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/QuizHistory/history
// @desc Get all quiz history for the authenticated user
router.get("/history", auth, async (req, res) => {
  try {
    const history = await QuizHistory.find({ user: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error("Error fetching quiz history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;