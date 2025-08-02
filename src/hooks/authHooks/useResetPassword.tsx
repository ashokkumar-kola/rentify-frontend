// hooks/authHooks/useResetPassword.ts
import { useState } from 'react';
import { resetPassword } from '../../services/AuthService';

const useResetPassword = (email: string) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (): Promise<{ success: boolean }> => {
    if (!password || !confirmPassword) {
      setMessage('All fields are required');
      setSuccess(false);
      return { success: false };
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setSuccess(false);
      return { success: false };
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setSuccess(false);
      return { success: false };
    }

    setLoading(true);
    try {
      await resetPassword({ email, password, confirm_password: password });
      setSuccess(true);
      setMessage('Password reset successful');
      return { success: true };
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to reset password';
      setMessage(msg);
      setSuccess(false);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    message,
    setMessage,
    success,
    handleResetPassword,
  };
};

export default useResetPassword;
