import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen, ForgotPasswordScreen, ConfirmEmailScreen, ResetPasswordScreen } from '../screens';

import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
      // presentation: 'transparentModal',
      // cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }, // subtle overlay
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      // transitionSpec: {
      //   open: { animation: 'timing', config: { duration: 250 } },
      //   close: { animation: 'timing', config: { duration: 250 } },
      // },
  }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'transparentModal'  }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;


// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import LoginScreen from '../screens/auth/LoginScreen';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
// import VerifyEmailScreen from '../screens/auth/ConfirmEmailScreen';
// import ChangePasswordScreen from '../screens/auth/ResetPasswordScreen';

// import { AuthStackParamList } from './types';

// const Stack = createNativeStackNavigator<AuthStackParamList>();

// const AuthStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//       <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
//       <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AuthStackNavigator;
