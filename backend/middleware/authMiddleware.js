const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes and authenticate users via JWT
const protect = async (req, res, next) => {
  let token;
  
  // Check for the token in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the header (it's in the format "Bearer TOKEN")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the user associated with the token's ID and attach it to the request object
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        // If no user is found, the token is technically valid but the user doesn't exist
        console.error("Authentication failed: User from token not found.");
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // Proceed to the next middleware or route handler
      next();

    } catch (error) {
      console.error("Authentication failed:", error.message);
      // If verification fails for any reason (e.g., malformed or expired token)
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is provided in the header at all
  if (!token) {
    console.error("Authentication failed: No token provided.");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;