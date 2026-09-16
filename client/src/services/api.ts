import axios from 'axios';

// Ensure /api suffix is present so routes reach your Express endpoints
const rawBaseUrl =
  (import.meta as ImportMeta & {
    env?: {
      VITE_API_URL?: string;
    };
  }).env?.VITE_API_URL || 'https://linux-world-python.onrender.com';

const apiBaseUrl = rawBaseUrl.endsWith('/api')
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, '')}/api`;

const API = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student & Public Endpoints
export const getSettings = () => API.get('/settings');
export const registerStudent = (data: any) => API.post('/register', data);
export const getStudent = (id: string) => API.get(`/students/${id}`);

// Instant payment confirmation (replaces manual UTR verification)
export const confirmPayment = (data: { phone: string; autoApprove?: boolean }) =>
  API.post('/confirm-payment', data);

// Backward compatibility helper
export const verifyPayment = (data: any) => API.post('/confirm-payment', data);

// Direct access check for enrolled students
export const checkAccess = (identifier: string) =>
  API.post('/check-access', { identifier });

// Admin Endpoints
export const adminLogin = (credentials: any) => API.post('/admin/login', credentials);
export const getAdminDashboard = () => API.get('/admin/dashboard');
export const getAdminStudents = (params?: any) => API.get('/admin/students', { params });
export const updateSettings = (data: any) => API.put('/admin/settings', data);

export default API;