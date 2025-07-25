import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { register, RegisterPayload } from '../../services/AuthService';
import { RootStackParamList } from '../../navigation/types';

interface RegisterErrors {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

const useRegister = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const validateForm = () => {
    const newErrors: RegisterErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Example: 10 digits

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

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

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {return;}

    setLoading(true);
    try {
      const payload: RegisterPayload = {
        full_name: fullName,
        email,
        password,
        // phoneNumber: phoneNumber.trim() ? phoneNumber : undefined,
      };

      const { user } = await register(payload);

    //   await AsyncStorage.setItem('authToken', token);
      navigation.navigate('AuthStack');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';

      if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || errorMessage;
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
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    errors,
    loading,
    passwordVisible,
    setPasswordVisible,
    alertVisible,
    setAlertVisible,
    alertMessage,
    handleRegister,
  };
};

export default useRegister;
