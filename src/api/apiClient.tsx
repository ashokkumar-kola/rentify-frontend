import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
// const API_BASE_URL = 'http://10.0.2.2:3000/api';
// const API_BASE_URL = 'http://192.168.1.229:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;

// Request interceptors
// apiClient.interceptors.request.use((config) => {
//   // Add auth token if exists
//   const token = ''; // Get from storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Response interceptors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );
