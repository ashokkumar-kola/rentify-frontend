import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export type TokenPayload = {
  id: string;
  email?: string;
  role?: string;
  exp?: number;
};

export const getDecodedToken = async (): Promise<TokenPayload | null> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.warn('Auth token not found in storage.');
      return null;
    }

    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
