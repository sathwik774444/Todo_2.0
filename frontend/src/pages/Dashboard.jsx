// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { getCategories, createCategory } from '../services/category';
import CategoryList from '../components/CategoryList';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error('Fetch category error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory({ name });
      setName('');
      fetchCategories(); // Refresh list
    } catch (err) {
      alert('Failed to create category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Your Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="New Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <CategoryList categories={categories} />
    </div>
  );
};

export default Dashboard;
