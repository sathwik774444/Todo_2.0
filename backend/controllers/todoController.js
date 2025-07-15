// controllers/todoController.js
const Todo = require('../models/todo');

const getTodos = async (req, res) => {
  // Fetch todos for the logged-in user
  const todos = await Todo.find({ user: req.user._id }).populate('category');
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const todo = await Todo.create({
      title,
      description,
      category,
      user: req.user._id,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create todo' });
  }
};

module.exports = {
  getTodos,
  createTodo,
  // add other handlers here later
};
