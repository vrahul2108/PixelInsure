// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config/env");

// module.exports = (req, res, next) => {
//   try {
//     console.log("Authorization Header:", req.headers.authorization);

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized - Token missing" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);

//     console.log("Decoded Token:", decoded);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log("JWT Error:", error.message);
//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token format",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // contains id + role

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};