import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { api } from '../../api/apiClient';
import AppText from '../../components/AppTheme/AppText';
import styles from './styles';

import useAuthForm from '../../hooks/useAuthForm';
import useAlert from '../../hooks/useAlert';
import { validateRegisterForm } from '../../utils/validators';
import { Colors } from '../../constants';
import images from '../../assets/images';

import FormInput from '../../components/CustomForms/FormInput';
import FormButton from '../../components/CustomForms/FormButton';
import ToggleSwitch from '../../components/CustomButtons/ToggleSwitch';
import CustomAlert from '../../components/Common/CustomAlert';

type RegisterScreenProps = {
  navigation: any;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { alertState, showAlert, hideAlert } = useAlert();

  const {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validateForm,
  } = useAuthForm(
    {
      full_name: '',
      email: '',
      password: '',
    },
    validateRegisterForm
  );

  const handleRegister = async () => {
    console.log(!validateForm());
    if (!validateForm()) {return;}

    console.log(formData);
    setLoading(true);
    try {
        console.log('Registering with data:', formData);
      const response = await api.post('/auth/register', {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });
      console.log('Register response:', response.data.success);

      if (response.status === 201 && isFocused) {
        showAlert('Registration Successful', 'Your account has been created successfully', {
          confirmText: 'Continue to Login',
          onConfirm: () => navigation.navigate('Login'),
        });
      }
    } catch (error: any) {
      if (isFocused) {
        let errorMessage = 'Registration failed. Please try again.';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'Email already exists';
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        }
        showAlert('Registration Error', errorMessage, {
          confirmText: 'Try Again',
          onConfirm: () => navigation.replace('Register'),
        });
      }
    } finally {
      if (isFocused) {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.wrapper}
        >
          <View style={styles.logoContainer}>
            <MaterialIcons
              name="arrow-back"
              size={36}
              color={Colors.primary}
              style={styles.backButton}
              onPress={() => navigation.navigate('Main')}
            />
            <Image
              source={images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
          </View>

          <LinearGradient
            colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
            style={styles.container}
          >
            <View style={styles.card}>
              <Text style={styles.welcome}>Welcome!</Text>
              <Text style={styles.subText}>Sign up and create your dream home.</Text>

              <FormInput
                iconName="user"
                iconSize={32}
                placeholder="Enter your fullname"
                value={formData.full_name}
                onChangeText={(text: any) => handleChange('full_name', text)}
                error={errors.full_name ?? undefined}
              />

              <FormInput
                iconName="envelope"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text: any) => handleChange('email', text)}
                error={errors.email ?? undefined}
              />

              <FormInput
                iconName="lock"
                iconSize={32}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text: any) => handleChange('password', text)}
                secureTextEntry={!passwordVisible}
                rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
                onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                error={errors.password ?? undefined}
              />

              <FormButton
                title="Sign up"
                onPress={handleRegister}
                loading={loading}
                style={{ marginTop: 24 }}
              />

              <View style={styles.divider}>
                <View style={styles.line} />
              </View>

              <View style={styles.signContainer}>
                <View style={styles.signTextContainer}>
                  <Text style={styles.signText}>Already have an account? </Text>
                  <Text
                    style={styles.signLink}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Sign in here
                  </Text>
                </View>
                <ToggleSwitch />
              </View>
            </View>
          </LinearGradient>

          <CustomAlert
            visible={alertState.visible}
            title={alertState.title}
            message={alertState.message}
            confirmText={alertState.confirmText}
            onConfirm={
              alertState.onConfirm
                ? (_event) => { alertState.onConfirm && alertState.onConfirm(); }
                : undefined
            }
            onClose={hideAlert}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
