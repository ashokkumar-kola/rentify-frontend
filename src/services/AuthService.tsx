import api from '../api/apiClient';

export interface BaseResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  // phoneNumber?: string;
}
export interface RegisterResponse extends BaseResponse {
  data: {
    id: string;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
    user: {
      id: string;
      full_ame: string;
      email: string;
      role: string[];
      profile_image?: string;
      is_verified?: boolean;
    };
  };
}
export interface ForgotPasswordPayload {
  email: string;
}
export interface ForgotPasswordResponse extends BaseResponse {
  data: {
    email_sent: boolean;
  };
}

export interface ConfirmEmailPayload {
  email: string;
  otp: string;
}
export interface ConfirmEmailResponse extends BaseResponse {
  data: {
    verified: boolean;
  };
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  new_password: string;
}
export interface ResetPasswordResponse extends BaseResponse {
  data: {
    password_updated: boolean;
  };
}

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

// Forgot Password
export const forgotPassword = async (email: string): Promise<any> => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data?.data || {};
};

// Confirm Email
export const confirmEmail = async (email: string, otp: string): Promise<any> => {
  const response = await api.post('/auth/confirm-email', {email, otp});
  return response.data?.data || {};
};

// Reset Password
export const resetPassword = async (payload: ConfirmEmailPayload): Promise<any> => {
  const response = await api.post('/auth/reset-password', payload);
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
