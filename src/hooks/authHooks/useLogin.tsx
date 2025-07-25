// src/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/AuthService';

interface LoginErrors {
  email?: string;
  password?: string;
}

import { RootStackParamList } from '../../navigation/types';

const useLogin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const validateForm = () => {
    const newErrors: LoginErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {return;}

    setLoading(true);
    try {
      const { token, user } = await login({ email, password });

      await AsyncStorage.setItem('authToken', token);
      navigation.navigate('AppDrawer');
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setAlertMessage(errorMessage);
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading,
    passwordVisible,
    setPasswordVisible,
    alertVisible,
    setAlertVisible,
    alertMessage,
    handleLogin,
  };
};

export default useLogin;
