import api from '../api/apiClient';

import { handleApiError } from './errorHandler';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

// Login
export const login = async (payload: LoginPayload) => {
  try {
    const response = await api.post('/login', payload);
    return response.data?.data || {};
  } catch (error) {
    handleApiError(error, 'Login failed');
  }
};

// Register
export const register = async (payload: RegisterPayload) => {
    const response = await api.post('/register', payload);
    return response.data?.data || {};

};

// Logout
export const logout = async () => {
    const response = await api.post('/logout');
    return response.data?.message || 'Logged out';
};

// Fetch Profile
export const fetchProfile = async () => {
    const response = await api.get('/profile');
    return response.data?.data || {};
};
