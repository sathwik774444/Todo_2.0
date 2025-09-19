import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import axios from '../services/api';
import API from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [username , setUsername] = useState('');
  const {user, logoutUser, loading} = useContext(AuthContext);
  const navigate = useNavigate();


  const fetchCategories = async () => {
    // const res = await axios.get('/categories');
    const res = await API.get('/categories');
    setCategories(res.data);
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    await API.post('/categories', { name: newCategory });
    setNewCategory('');
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
      const getUser = JSON.parse(localStorage.getItem('user'));
      if(getUser?.username){
        setUsername(getUser.username)
      }
  }, []);

  if(loading) return <p>loading...</p>//wait until AuthProvider finishes checking user
  
  return (
    <div className="dashboard-container">
      <div className='Navbar'>
        <h1 className="greeting">
          👋 {user ? `${username}` : '!'} Namaste
        </h1>
        <button onClick={logoutUser} className="logout-button">
          Logout
        </button>
      </div>
      <div className="notice-box">
        <div className="scrolling-text">
          We added login persistence so that when the user refreshes the page, 
          they remain logged in until they press the logout button, 
          which appears at the top-right of the page.
          If you have any suggestions, please send them to this email: sathwikkulkarni123@gmail.com
        </div>
      </div>
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
