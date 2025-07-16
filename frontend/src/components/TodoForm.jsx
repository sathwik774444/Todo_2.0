import { useState } from 'react';
import { createTodo } from '../services/todo';

const TodoForm = ({ categoryId, onTodoAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      await createTodo({
        ...formData,
        category: categoryId, // required in schema
      });
      alert('Todo created!');
      setFormData({ title: '', description: '' });
      onTodoAdded(); // notify parent to reload
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create todo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      /><br />
      <input
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      /><br />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
