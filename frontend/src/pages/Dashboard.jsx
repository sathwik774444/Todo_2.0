// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api'; // your API service file
import '../styles/Dashboard.css'; // for CSS grid

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await axios.get('/categories');
    setCategories(res.data);
  };

  const handleAdd = async () => {
    await axios.post('/categories', { name: newCategory });
    setNewCategory('');
    fetchCategories(); // refresh
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Your Categories</h1>
      <input
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <div className="grid-container">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="grid-item"
              onClick={() => navigate(`/category/${cat._id}`)}
            >
              {cat.name}
            </div>
          ))
        ) : (
          <p>No categories yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
