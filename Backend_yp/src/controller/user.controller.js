const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");

// require("dotenv").config();

// Helper to standardise cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // True in production HTTPS
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
};

async function registerUser(req, res) {
  try {
    const { username, email,Phone, password, confirmPassword } = req.body;

    // 1. Validation
    if (!username || !email || !Phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Prevent Privilege Escalation (Always force default role or sanitize)
    const role = "user"; 

    // 3. Check existing user
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({ message: "User or email already exists" });
    }

    // 4. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await userModel.create({
      username,
      email,
      Phone,
      password: hashed,
      confirmPassword: hashed, // Store hashed confirmPassword for consistency, though ideally not stored
      role
    });

    // 6. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 7. Set Secure Cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        Phone: user.Phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginuser(req, res) {
  try {
    const { identifier, email, username, password ,employeeId} = req.body;
    const loginKey = identifier || username || email;

    if (!loginKey || !password) {
      return res.status(400).json({ message: "Please enter your username/email and password" });
    }

    // Explicitly select password in case model marks it as select: false
    const user = await userModel.findOne({
      $or: [{ username: loginKey }, { email: loginKey }]
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isAdminLogin = req.body.role === "admin";

    if (isAdminLogin && user.role === "admin") {

       async function validateEmployeeId(employeeId) {
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required for admin login",
        });
      }

      const employee = await Employee.findOne({
        employeeId: employeeId.trim(),
        status: "active",
      });

      if (!employee) {
        return res.status(403).json({
          success: false,
          message:
            "Invalid or inactive Employee ID",
        });
      }

    } 
  }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



async function logoutUser(req, res) {
  try {
    // Pass same cookie options when clearing
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    // Safe extraction handling missing cookies middleware or missing token
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getAllUsers(req, res) {
  try {

    // 1. Fetch all users excluding their password fields
   
    const users = await userModel.find().select("-password");


    // 2. Return the array of users
    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginuser, logoutUser, getCurrentUser,getAllUsers };