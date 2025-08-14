import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';
// const API_BASE_URL = 'http://10.0.2.2:3000/api'; // Emulator
// const API_BASE_URL = 'http://192.168.1.229:3000/api'; // YTP
// const API_BASE_URL = 'http://192.168.0.105:3000/api'; // PG
// const API_BASE_URL = 'http://192.168.1.9:3000/api'; // GP

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

api.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem('authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;

// // Request interceptors
// apiClient.interceptors.request.use((config) => {
//   // Add auth token if exists
//   const token = ''; // Get from storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     return Promise.reject(error);
//   }
// );

// // tokenStore.ts
// let authToken = '';

// export const setToken = (token: string) => {
//   authToken = token;
// };

// export const getToken = () => authToken;

// // apiClient.ts
// import axios from 'axios';
// import { getToken } from './tokenStore';

// const apiClient = axios.create({
//   baseURL: 'https://your-api.com/api',
// });

// apiClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default apiClient;

// // On login success:
// await AsyncStorage.setItem('authToken', newToken);
// setToken(newToken);
