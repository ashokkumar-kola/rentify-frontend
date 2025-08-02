// hooks/authHooks/useForgotPassword.ts
import { useState } from 'react';
import { forgotPassword } from '../../services/AuthService';

const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleForgotPassword = async (): Promise<{ success: boolean }> => {
    if (!validateEmail()) {return { success: false };}

    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess(true);
      setMessage('Verification code sent successfully');
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Something went wrong';
      setMessage(msg);
      setSuccess(false);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    error,
    loading,
    success,
    message,
    setMessage,
    handleForgotPassword,
  };
};

export default useForgotPassword;
