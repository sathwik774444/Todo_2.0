const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse incoming JSON

// public Routes
app.use('/api/auth', authRoutes);

// protected Routes
app.use('/api/categories', protect, categoryRoutes); 
app.use('/api/todos', protect, todoRoutes);          

// Basic health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
