import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import useResetPassword from '../../hooks/authHooks/useResetPassword';

import AppText from '../../components/AppTheme/AppText';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';
import images from '../../assets/images';
import styles from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({ route, navigation }) => {
  const email = route.params.email;
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    message,
    setMessage,
    handleResetPassword,
  } = useResetPassword(email);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    const result = await handleResetPassword();

    if (result.success) {
      Alert.alert('Success', 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else if (message) {
      Alert.alert('Error', message, [{ text: 'OK', onPress: () => setMessage('') }]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icons.MI name="arrow-back" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <AppText style={styles.tagline}>LIVE YOUR DREAM HOME</AppText>
        </View>

        <View style={styles.logoContainer}>
          <AppText style={styles.tagline}>Reset Password</AppText>
        </View>

        <View style={styles.card}>
          <AppText style={styles.welcome}>Create a New Password</AppText>
          <AppText style={styles.subText}>
            Enter your new password to update your account.
          </AppText>

          {/* New Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor={Colors.grey200}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Icons.MI
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color={Colors.grey500}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.grey200}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirm(prev => !prev)}
            >
              <Icons.MI
                name={showConfirm ? 'visibility' : 'visibility-off'}
                size={22}
                color={Colors.grey500}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.sendCodeButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <AppText style={styles.sendCodeButtonText}>Reset Password</AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
