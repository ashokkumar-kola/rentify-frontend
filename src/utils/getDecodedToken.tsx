import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export type TokenPayload = {
	id: string;
	email: string;
	role: string;
	exp: number;
	iat: number;
};

export const getDecodedToken = async (): Promise<TokenPayload | null> => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		console.log('Token :', token);
		if (!token) {
			console.warn('Auth token not found in storage.');
			return null;
		}
		const decoded = jwtDecode<TokenPayload>(token);
		console.log('Decoded Token :', decoded);
		return decoded;
	} catch (error) {
		console.error('Failed to decode token:', error);
		return null;
	}
};

// import { decode as atob } from 'base-64';

// export const decodeJwt = (token: string) => {
//   try {
//     const payload = token.split('.')[1];
//     const decoded = atob(payload);              // Decode base64
//     return JSON.parse(decoded);                 // Parse JSON payload
//   } catch (error) {
//     console.error('Failed to decode JWT:', error);
//     return null;
//   }
// };
