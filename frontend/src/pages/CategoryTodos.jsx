import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryTodos = () => {
  const { id } = useParams(); // category id
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get(`/api/category/${id}/todos`);
      setTodos(res.data);
    };
    fetchTodos();
  }, [id]);

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div key={todo._id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default CategoryTodos;
