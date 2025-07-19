import { AxiosError } from 'axios';

export const handleApiError = (error: unknown, _message: string): void => {
  const err = error as AxiosError;

  if (err.response && err.response.data) {
    throw err.response.data;
  } else if (err.request) {
    throw { success: false, message: 'No response from server.', errors: err.message };
  } else {
    throw { success: false, message: 'Unexpected error occurred.', errors: err.message };
  }
};
