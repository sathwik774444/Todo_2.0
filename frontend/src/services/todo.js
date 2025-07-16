import API from './api';

export const createTodo = (todoData) => API.post('/todos', todoData);
