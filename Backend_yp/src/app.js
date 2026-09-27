const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

// ===============================
// CORS CONFIGURATION
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Vercel production
  "https://frontendyp.vercel.app",

  // Current Vercel preview
  "https://frontend-9bz7j7dvy-ramesh123411s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());
app.use(cookieParser());

// ===============================
// STATIC FILES
// ===============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ===============================
// API ROUTES
// ===============================

app.use("/api/yp/user", authRoutes);
app.use("/api/yp/products", productRoutes);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Yava Paints API is running",
  });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS blocked this origin",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;