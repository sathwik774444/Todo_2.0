import API from './api';

export const login = (data) => API.post('/api/auth/login', data);
export const signup = (data) => API.post('/api/auth/signup', data);
