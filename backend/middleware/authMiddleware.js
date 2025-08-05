const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes and authenticate users via JWT
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        console.error("Authentication failed: User from token not found.");
        return res.status(401).json({ message: "Not authorized, user not found" });
      }
      next();

    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.error("Authentication failed: No token provided.");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
