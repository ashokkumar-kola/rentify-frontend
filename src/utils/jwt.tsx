import { decode as atob } from 'base-64';

export const decodeJwt = (token: string) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);              // Decode base64
    return JSON.parse(decoded);                 // Parse JSON payload
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};
