import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/Splash/SplashScreen';

import OnboardingStackNavigator from './OnboardingStackNavigator';

import AuthNavigator from './AuthStackNavigator';
import AppNavigator from './AppNavigator';
import AdminNavigator from './AdminStackNavigator';

import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    // <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
      <RootStack.Screen name="AuthStack" component={AuthNavigator} />
      <RootStack.Screen name="AppDrawer" component={AppNavigator} />
      <RootStack.Screen name="AdminStack" component={AdminNavigator} />
    </RootStack.Navigator>
    // </NavigationContainer>
  );
};

export default RootNavigator;
