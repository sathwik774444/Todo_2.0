import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import '../styles/TodoListPage.css';

const TodoListPage = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('Loading...');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/todos/category/${id}`);
      setTodos(res.data);
      if (res.data.length > 0) {
        setCategoryName(res.data[0]?.category?.name || 'Unnamed Category');
      }
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const res = await axios.get(`/categories/${id}`);
      setCategoryName(res.data.name);
    } catch (err) {
      console.error('Error fetching category:', err);
      setCategoryName('Unknown Category');
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      alert('Todo title is required');
      return;
    }

    try {
      await axios.post('/todos', {
        title: newTodo,
        category: id,
      });
      setNewTodo('');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err.response?.data?.message || err.message);
      alert('Failed to add todo');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.error('Error deleting todo:', err.response?.data?.message || err.message);
      alert('Failed to delete todo');
    }
  }
  useEffect(() => {
    fetchTodos().then(() => {
      if (todos.length === 0) {
        fetchCategoryName();
      }
    });
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="todo-container">
      <h2 className="category-title">Todos for "{categoryName}"</h2>

      <div className="todo-input-section">
        <input
          className="todo-input"
          value={newTodo}
          placeholder="Add a new task..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span>{todo.title}</span>
              <button
                className="delete-button-item"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoListPage;
