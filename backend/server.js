const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/QuizHistory");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// IMPORTANT: The database name in the MONGO_URI must match the case of the
// existing database on your MongoDB server. For example, if your database
// is named "Test", the URI must be '.../Test', not '.../test'.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// Simple health check route for the root URL
app.get("/", (req, res) => {
  res.send("Server is running!");
});

try {
  console.log("Loading routes...");
  app.use("/api/auth", authRoutes);
  console.log("Auth routes loaded successfully.");
  app.use("/api/QuizHistory", quizRoutes);
  console.log("Quiz routes loaded successfully.");
} catch (error) {
  console.error("Error loading routes:", error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));