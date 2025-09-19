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

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Step 1: Delete all todos associated with the category
    await Todo.deleteMany({ category: categoryId });

    // Step 2: Delete the category itself
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Category and its todos deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};



module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
