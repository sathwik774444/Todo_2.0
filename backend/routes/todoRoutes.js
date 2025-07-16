const express = require('express');
const router = express.Router();
const { createTodo, getTodo } = require('../controllers/todoController');

router.get('/', getTodo);
router.post('/', createTodo);

module.exports = router;


