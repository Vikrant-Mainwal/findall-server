const jwt = require("jsonwebtoken");

// Middleware to verify the provided token and extract user information
const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.headers.Token; // Extract token from headers 
  if (!token) {
    return res.status(401).json("You are not authenticated!"); // No token provided
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid Token!"); // Invalid token
    }
    req.user = user; // Attach user information to request object
    next(); // Move to next middleware or route handler
  });
};

// Middleware to verify token and check user authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    const { id, isAdmin } = req.user;
    const { userId: requestedUserId } = req.body;
    // Check if user is authorized based on ID match or admin status
    if (id === requestedUserId || isAdmin) {
      next(); // User is authorized, proceed to next middleware or route handler
    } else {
      res.status(403).json("You are not allowed to do that!"); // User not authorized
    }
  });
};

// Middleware to verify token and check if user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const { isAdmin } = req.user;

    if (isAdmin) {
      next(); // User is an admin, proceed to next middleware or route handler
    } else {
      res.status(403).json("You are not allowed to do that!"); // User not an admin
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
