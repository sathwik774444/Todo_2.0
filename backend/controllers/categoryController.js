const Category = require('../models/category');

const getCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  res.json(categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
      user: req.user._id,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category' });
  }
};

module.exports = {
  getCategories,
  createCategory,
};