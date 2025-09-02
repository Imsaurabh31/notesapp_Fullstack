import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/signup', data),
  
  verifyOTP: (data: { email: string; otp: string }) =>
    api.post('/auth/verify-otp', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  googleAuth: (token: string) =>
    api.post('/auth/google', { token }),
};

export const notesAPI = {
  getNotes: () => api.get('/notes'),
  createNote: (data: { title: string; content: string }) =>
    api.post('/notes', data),
  deleteNote: (id: string) => api.delete(`/notes/${id}`),
};

export default api;