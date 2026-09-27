const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

// 1. Configure CORS to allow frontend requests and credentials
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Replace with your frontend URL/port
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 2. Serve static files from the 'uploads' directory
// Fixes GET http://localhost:7000/uploads/... ERR_CONNECTION_REFUSED
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/yp/user', authRoutes);
app.use('/api/yp/products', productRoutes);

module.exports = app;