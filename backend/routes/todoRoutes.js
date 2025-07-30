const express = require('express');
const router = express.Router();
const { createTodo, getTodo, getTodosByCategory, deleteTodo} = require('../controllers/todoController');

router.get('/', getTodo); // Fetch all todos
router.post('/', createTodo); // Create a new todo
router.get('/category/:id', getTodosByCategory); // Fetch todos by category
router.delete('/:id', deleteTodo); // Delete a todo by ID

module.exports = router;
