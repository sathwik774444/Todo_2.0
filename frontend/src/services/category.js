import API from './api';

export const createCategory = (data) => API.post('/categories', data);
export const getCategories = () => API.get('/categories');
