import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';

// Onboard Screens
import SplashScreen from '../screens/splash/SplashScreen';

import Onboarding1Screen from '../screens/onboarding/Onboarding1Screen';
import Onboarding2Screen from '../screens/onboarding/Onboarding2Screen';
import Onboarding3Screen from '../screens/onboarding/Onboarding3Screen';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import ChangePasswordScreen from '../screens/auth/ChangePasswordScreen';


import EditProfileScreen from '../screens/user/EditProfileScreen';
// import ChangePasswordScreen from '../screens//user/ChangePasswordScreen';

// import PropertyDetailsScreen from '../screens/Main/PropertyDetailsScreen';
// import AddPropertyScreen from '../screens/Properties/AddPropertyScreen';
// import EditPropertyScreen from '../screens/Properties/EditPropertyScreen';
// import PropertyApplicationsScreen from '../screens/Properties/PropertyApplicationsScreen';
// import PropertyTenantsScreen from '../screens/Properties/PropertyTenantsScreen';

import PropertiesScreen from '../screens/properties/PropertiesScreen2';
import MyPropertiesScreen from '../screens/properties/PropertiesScreen2';
import ExplorePropertiesScreen from '../screens/properties/ExplorePropertiesScreen';
// import PropertyDetailsScreen from '../screens/properties/PropertyDetailsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Properties: undefined;
  MyProperties: undefined;
  ExploreProperties: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      {/* Splash */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Onboarding Flow */}
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />

      {/* Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ animation: 'fade' }}
        />

        {/* Main App */}
      <Stack.Screen name="Main" component={DrawerNavigator} />

      <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                }}
            />
      <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                }}
            />

      <Stack.Screen name="Properties" component={PropertiesScreen} />
      <Stack.Screen
          name="MyProperties"
          component={MyPropertiesScreen}
          options={{
              headerShown: true,
              title: 'My Properties',
          }}
      />
      <Stack.Screen
          name="ExploreProperties"
          component={ExplorePropertiesScreen}
          options={{ title: 'Filtered Properties' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
