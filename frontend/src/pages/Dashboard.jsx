import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await axios.get('/categories');
    setCategories(res.data);
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    await axios.post('/categories', { name: newCategory });
    setNewCategory('');
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="greeting">👋 Welcome back!</h1>
      <div className="input-section">
        <input
          className="category-input"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="grid-container">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div className="grid-item" key={cat._id}>
              <div
                className="category-content"
                onClick={() => navigate(`/category/${cat._id}`)}
              >
                <h2>{cat.name}</h2>
                <p className="meta">
                  🗓️ Created: {new Date(cat.createdAt).toLocaleDateString()}
                </p>
                <p className="meta">✅ Todos: {cat.todoCount}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(cat._id)}
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p className="no-categories">No categories yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
