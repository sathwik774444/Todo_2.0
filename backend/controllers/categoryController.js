const Category = require('../models/category');
const Todo = require('../models/todo');


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).sort({ createdAt: -1 });

    const categoriesWithTodoCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Todo.countDocuments({ category: cat._id });
        return {
          ...cat.toObject(),
          todoCount: count,
        };
      })
    );

    res.json(categoriesWithTodoCount);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
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

// ⬇️ ADD THIS DELETE CONTROLLER
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the category belongs to the current user
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this category' });
    }

    await category.deleteOne(); // <-- Use deleteOne instead of remove (modern Mongoose)

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err); // ✅ Add this log
    res.status(500).json({ message: 'Failed to delete category' });
  }
};


module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
