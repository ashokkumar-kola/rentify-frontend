import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { navigationRef } from '../navigation/NavigationService';
// import { API_BASE_URL } from '@env';

const API_BASE_URL = 'http://localhost:3000/api';
// const API_BASE_URL = 'http://10.0.2.2:3000/api'; // Emulator
// const API_BASE_URL = 'http://192.168.1.229:3000/api'; // YTP
// const API_BASE_URL = 'http://192.168.0.105:3000/api'; // PG
// const API_BASE_URL = 'http://192.168.1.9:3000/api'; // GP
// const API_BASE_URL = 'http://192.168.1.5:3000/api'; // MP

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    switch (status) {
      case 400:
        Toast.show({ type: 'error', text1: 'Validation Error', text2: message });
        break;

      case 401:
        Toast.show({ type: 'error', text1: 'Session Expired', text2: 'Please log in again.' });
        AsyncStorage.removeItem('authToken');
        navigationRef.navigate('AuthStack', { screen: 'Login' });
        break;

      case 403:
        Toast.show({ type: 'error', text1: 'Access Denied', text2: message });
        break;

      case 404:
        Toast.show({ type: 'error', text1: 'Not Found', text2: message });
        break;

      case 500:
        Toast.show({ type: 'error', text1: 'Server Error', text2: 'Please try again later.' });
        break;

      default:
        Toast.show({ type: 'error', text1: 'Error', text2: message });
    }

    return Promise.reject(error);
  }
);


export default api;
