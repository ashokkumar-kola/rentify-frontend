import api from '../api/apiClient';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  // phoneNumber?: string;
};

// Login
export const login = async (payload: LoginPayload) => {
  const response = await api.post('/auth/login', payload);
  return response.data?.data || {};
};

// Register
export const register = async (payload: RegisterPayload) => {
    const response = await api.post('/auth/register', payload);
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
