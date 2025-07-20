// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../services/api';

// const TodoListPage = () => {
//   const { id } = useParams();
//   const [categoryName, setCategoryName] = useState('Loading...');
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch todos for a category
//   const fetchTodos = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/todos/category/${id}`);
//       setTodos(res.data);
//       if (res.data.length > 0) {
//         setCategoryName(res.data[0]?.category?.name || 'Unnamed Category');
//       }
//     } catch (err) {
//       console.error('Error fetching todos:', err);
//       setError('Failed to load todos.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback to fetch category name (if there are no todos)
//   const fetchCategoryName = async () => {
//     try {
//       const res = await axios.get(`/categories/${id}`);
//       setCategoryName(res.data.name);
//     } catch (err) {
//       console.error('Error fetching category:', err);
//       setCategoryName('Unknown Category');
//     }
//   };

//   // Add a new todo
//   const handleAddTodo = async () => {
//     if (!newTodo.trim()) {
//       alert('Todo title is required');
//       return;
//     }

//     try {
//       await axios.post('/todos', {
//         title: newTodo,
//         category: id,
//       });
//       setNewTodo('');
//       fetchTodos(); // Refresh todos
//     } catch (err) {
//       console.error('Error adding todo:', err.response?.data?.message || err.message);
//       alert('Failed to add todo');
//     }
//   };

//   useEffect(() => {
//     fetchTodos().then(() => {
//       if (todos.length === 0) {
//         fetchCategoryName();
//       }
//     });
//     // eslint-disable-next-line
//   }, [id]);

//   return (
//     <div>
//       <h2>Todos for "{categoryName}"</h2>

//       <input
//         value={newTodo}
//         placeholder="Add Todo"
//         onChange={(e) => setNewTodo(e.target.value)}
//       />
//       <button onClick={handleAddTodo}>Add</button>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : todos.length === 0 ? (
//         <p>No todos yet.</p>
//       ) : (
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo._id}>{todo.title}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TodoListPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import '../styles/TodoListPage.css'; // ✅ Styling file

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
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoListPage;
