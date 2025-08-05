const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @route POST /api/auth/register
// @desc Register a new user
router.post("/register", async (req, res) => {
  console.log("Received a registration request.");
  const { email, password } = req.body;
  console.log("Request body:", { email, password });
  
  if (!email || !password) {
    console.error("Missing email or password.");
    return res.status(400).json({ message: "Please provide both email and password." });
  }

  try {
    console.log("Checking if user already exists...");
    let user = await User.findOne({ email });
    if (user) {
      console.error("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("User does not exist, creating new user...");

    user = new User({ email, password });
    console.log("New user instance created. Saving to database...");
    await user.save();
    console.log("User saved successfully.");

    const token = generateToken(user._id);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Registration error:", err);
    // Send a more specific error message to the client for debugging
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ message: 'A user with that email already exists.' });
    }
    if (err.name === 'ValidationError') {
      // This block will now correctly execute and send the Mongoose validation message
      return res.status(400).json({ message: err.message });
    }
    // For any other unexpected error, send a generic 500 error
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/auth/login
// @desc Authenticate user & get token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;