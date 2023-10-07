// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if the token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_Key);

    // Attach the user information to the request for further use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an unauthorized status
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticate;
