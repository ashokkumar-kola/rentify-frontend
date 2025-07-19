// src/screens/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import { FontAwesome, MaterialIcons } from '../../utils/imports';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants';
import images from '../../assets/images';
import styles from './styles';
import FormInput from '../../components/CustomForms/FormInput';
import FormButton from '../../components/CustomForms/FormButton';
import ToggleSwitch from '../../components/CustomButtons/ToggleSwitch';
import CustomAlert from '../../components/Common/CustomAlert';
import useLogin from '../../hooks/authHooks/useLogin';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const {
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
  } = useLogin();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.wrapper}
        >
          {/* Header */}
          <View style={styles.logoContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
              <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
            </TouchableOpacity>
            <Image
              source={images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.welcome}>Welcome back!</Text>
            <Text style={styles.subText}>Log in and unlock your dream home.</Text>

            <FormInput
              iconName="envelope"
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />

            <FormInput
              iconName="lock"
              iconSize={32}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
              onRightIconPress={() => setPasswordVisible(!passwordVisible)}
              error={errors.password}
            />

            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <FormButton
              title="Sign in"
              onPress={handleLogin}
              loading={loading}
              style={{ marginTop: 24 }}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
            </View>

            <View style={styles.signContainer}>
              <View style={styles.signTextContainer}>
                <Text style={styles.signText}>Don't have an account? </Text>
                <Text style={styles.signLink} onPress={() => navigation.navigate('Register')}>
                  Sign up here
                </Text>
              </View>
              <ToggleSwitch />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title="Login Error"
        message={alertMessage}
        statusIcon="cancel"
        statusIconColor={Colors.error}
        confirmText="Try Again"
        onConfirm={() => setAlertVisible(false)}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// //   useAlert,
// //   Alert,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';

// import { FontAwesome, MaterialIcons } from '../../utils/imports';

// // import useAlert from '../../hooks/useAlert';

// import api from '../../api/apiClient';
// import { Colors } from '../../constants';
// import images from '../../assets/images';
// import styles from './styles';

// import FormInput from '../../components/CustomForms/FormInput';
// import FormButton from '../../components/CustomForms/FormButton';
// import ToggleSwitch from '../../components/CustomButtons/ToggleSwitch';
// import CustomAlert from '../../components/Common/CustomAlert';

// interface Props {
//   navigation: any;
// }

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//   const [loading, setLoading] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
// //   const { alertState, showAlert, hideAlert } = useAlert();

//   const validateForm = () => {
//     const newErrors: typeof errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email.trim()) {newErrors.email = 'Email is required';}
//     else if (!emailRegex.test(email)) {newErrors.email = 'Please enter a valid email';}
//     if (!password) {newErrors.password = 'Password is required';}
//     else if (password.length < 6) {newErrors.password = 'Password must be at least 6 characters';}
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async () => {
//         if (!validateForm()) { return; }

//         setLoading(true);
//         try {
//             console.log('Attempting login with:', { email, password });
//             const response = await api.post('/auth/login', { email, password });
//             console.log('Login response:', response.data);
//             const { token, user } = response.data.data;
//             console.log('Login successful:', user, token);
//             await AsyncStorage.setItem('authToken', token);

//             navigation.replace('Main');
//         } catch (error: any) {
//             let errorMessage = 'Login failed. Please try again.';
//             if (error.response?.status === 401) {
//                 errorMessage = 'Invalid email or password';
//             } else if (error.response?.data?.message) {
//                 errorMessage = error.response.data.message;
//             }

//             setAlertMessage(errorMessage);
//             setAlertVisible(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//         {/* <LinearGradient
//             colors={[Colors.white100, Colors.white200, Colors.primary, Colors.blue500]}
//             style={styles.container}
//         > */}
//             <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                 style={styles.wrapper}
//             >
//                 {/* Header */}
//                 <View style={styles.logoContainer}>
//                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
//                     <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
//                 </TouchableOpacity>
//                 <Image
//                     source={images.logo}
//                     style={styles.logo}
//                     resizeMode="contain"
//                 />
//                 <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
//                 </View>

//                 {/* Card */}
//                 <View style={styles.card}>
//                 <Text style={styles.welcome}>Welcome back!</Text>
//                 <Text style={styles.subText}>Log in and unlock your dream home.</Text>

//                 <FormInput
//                     iconName="envelope"
//                     placeholder="Enter email"
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     error={errors.email}
//                 />

//                 <FormInput
//                     iconName="lock"
//                     iconSize={32}
//                     placeholder="Enter password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!passwordVisible}
//                     rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
//                     onRightIconPress={() => setPasswordVisible(!passwordVisible)}
//                     error={errors.password}
//                 />

//                 <TouchableOpacity style={styles.forgotContainer}>
//                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                 </TouchableOpacity>

//                 <FormButton
//                     title="Sign in"
//                     onPress={handleLogin}
//                     loading={loading}
//                     style={{ marginTop: 24 }}
//                 />

//                 <View style={styles.divider}>
//                     <View style={styles.line} />
//                 </View>

//                 <View style={styles.signContainer}>
//                     <View style={styles.signTextContainer}>
//                     <Text style={styles.signText}>Don't have an account? </Text>
//                     <Text style={styles.signLink} onPress={() => navigation.navigate('Register')}>
//                         Sign up here
//                     </Text>
//                     </View>
//                     <ToggleSwitch />
//                 </View>
//                 </View>
//             </KeyboardAvoidingView>
//             </ScrollView>
//         {/* </LinearGradient> */}

//         <CustomAlert
//             visible={alertVisible}
//             title="Login Error"
//             message={alertMessage}
//             statusIcon="cancel"
//             statusIconColor= {Colors.error}
//             confirmText="Try Again"
//             onConfirm={() => setAlertVisible(false)}
//             onClose={() => setAlertVisible(false)}
//         />
//         </SafeAreaView>
//     );
// };

// export default LoginScreen;
