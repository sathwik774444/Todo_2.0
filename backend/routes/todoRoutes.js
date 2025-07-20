const express = require('express');
const router = express.Router();
const { createTodo, getTodo, getTodosByCategory } = require('../controllers/todoController');

router.get('/', getTodo); // Fetch all todos
router.post('/', createTodo); // Create a new todo
router.get('/category/:id', getTodosByCategory); // Fetch todos by category

module.exports = router;


