// controllers/todoController.js
const Todo = require('../models/todo');

const createTodo = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: 'Title and category are required' });
  }

  try {
    const newTodo = new Todo({
      title,
      description: description || '',
      completed: false,
      category,
      user: req.user.id,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).populate('category');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

const getTodosByCategory = async (req, res) => {
  const { id } = req.params; // Category ID
  try {
    const todos = await Todo.find({ category: id, user: req.user._id }).populate('category');
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos by category:', err);
    res.status(500).json({ message: 'Failed to fetch todos for the category' });
  }
};

module.exports = {
  createTodo,
  getTodo,
  getTodosByCategory, // Export the new function
};
