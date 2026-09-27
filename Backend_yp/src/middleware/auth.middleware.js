// require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model"); // Ensure userModel is imported

async function authuser(req, res, next) {
  try {
    // 1. Extract token from Cookies OR Authorization Header
    const token =
      req.cookies?.token ||
      req.headers?.authorization?.replace("Bearer ", "");

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // 3. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user in database
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // 5. Restrict access strictly to satya@gmail
    if (user.email !== "satya@gmail") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission to perform this action."
      });
    }

    // 6. Attach user data to request object and proceed
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
}

module.exports = { authuser };