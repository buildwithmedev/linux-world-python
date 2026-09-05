import axios from 'axios';

const apiBaseUrl = (import.meta as ImportMeta & {
  env?: {
    VITE_API_URL?: string;
  };
}).env?.VITE_API_URL || 'https://linux-world-python.onrender.com';

const API = axios.create({
  baseURL: apiBaseUrl
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSettings = () => API.get('/settings');
export const registerStudent = (data: any) => API.post('/register', data);
export const getStudent = (id: string) => API.get(`/students/${id}`);
export const verifyPayment = (data: any) => API.post('/verify-payment', data);

// Admin
export const adminLogin = (credentials: any) => API.post('/admin/login', credentials);
export const getAdminDashboard = () => API.get('/admin/dashboard');
export const getAdminStudents = (params: any) => API.get('/admin/students', { params });
export const updateSettings = (data: any) => API.put('/admin/settings', data);

export default API;