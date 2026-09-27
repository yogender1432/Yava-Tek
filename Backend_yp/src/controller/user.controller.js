const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");

// ======================================================
// COOKIE OPTIONS
// ======================================================

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000,
};

// ======================================================
// REGISTER USER
// ======================================================

async function registerUser(req, res) {
  try {
    console.log("REGISTER REQUEST BODY:", req.body);

    const {
      username,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // --------------------------------------------------
    // 1. Required fields
    // --------------------------------------------------

    if (
      !username ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // --------------------------------------------------
    // 2. Password confirmation
    // --------------------------------------------------

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // --------------------------------------------------
    // 3. Password length
    // --------------------------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // --------------------------------------------------
    // 4. Clean input
    // --------------------------------------------------

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // --------------------------------------------------
    // 5. Check existing user
    // --------------------------------------------------

    const existingUser = await userModel.findOne({
      $or: [
        { username: cleanUsername },
        { email: cleanEmail },
        { phone: cleanPhone },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // --------------------------------------------------
    // 6. Hash password
    // --------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // --------------------------------------------------
    // 7. Create user
    //
    // Do NOT save confirmPassword
    // --------------------------------------------------

    const user = await userModel.create({
      username: cleanUsername,
      email: cleanEmail,
      phone: cleanPhone,
      password: hashedPassword,
      role: "user",
    });

    // --------------------------------------------------
    // 8. Check JWT secret
    // --------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    // --------------------------------------------------
    // 9. Generate JWT
    // --------------------------------------------------

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // --------------------------------------------------
    // 10. Set cookie
    // --------------------------------------------------

    res.cookie(
      "token",
      token,
      COOKIE_OPTIONS
    );

    // --------------------------------------------------
    // 11. Response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "User registered successfully",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("================================");
    console.error("REGISTER ERROR");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Full Error:", error);
    console.error("================================");

    // --------------------------------------------------
    // Duplicate MongoDB key
    // --------------------------------------------------

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username, email or phone already exists",
        duplicate: error.keyValue,
      });
    }

    // --------------------------------------------------
    // Mongoose validation error
    // --------------------------------------------------

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    // --------------------------------------------------
    // Other error
    // --------------------------------------------------

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// ======================================================
// LOGIN USER
// ======================================================

async function loginuser(req, res) {
  try {
    const {
      identifier,
      email,
      username,
      password,
      role,
      employeeId,
    } = req.body;

    const loginKey = (
      identifier ||
      username ||
      email ||
      ""
    ).trim();

    if (!loginKey || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter your username/email and password",
      });
    }

    // Find user and explicitly include password
    const user = await userModel
      .findOne({
        $or: [
          { username: loginKey },
          { email: loginKey.toLowerCase() },
        ],
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ==================================================
    // ADMIN EMPLOYEE ID CHECK
    // ==================================================

    if (role === "admin") {

      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required",
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

    // --------------------------------------------------
    // JWT
    // --------------------------------------------------

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Cookie
    res.cookie(
      "token",
      token,
      COOKIE_OPTIONS
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// ======================================================
// LOGOUT
// ======================================================

async function logoutUser(req, res) {
  try {

    res.clearCookie(
      "token",
      COOKIE_OPTIONS
    );

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });

  } catch (error) {

    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// ======================================================
// GET CURRENT USER
// ======================================================

async function getCurrentUser(req, res) {
  try {

    const token =
      req.cookies?.token ||
      req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    let decoded;

    try {

      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    } catch (error) {

      return res.status(401).json({
        success: false,
        message:
          "Unauthorized: Invalid or expired token",
      });
    }

    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Get Current User Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// ======================================================
// GET ALL USERS
// ======================================================

async function getAllUsers(req, res) {
  try {

    const users = await userModel
      .find()
      .select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    console.error(
      "Get All Users Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  registerUser,
  loginuser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
};