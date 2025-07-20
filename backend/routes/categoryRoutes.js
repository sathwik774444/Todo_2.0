const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory, // ⬅️ Add this
} = require('../controllers/categoryController');

const Category = require('../models/category');

// Routes
router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch category' });
  }
});


router.delete('/:id', deleteCategory);

module.exports = router;

