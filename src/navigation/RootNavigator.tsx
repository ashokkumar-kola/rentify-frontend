import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';
import AdminStackNavigator from './AdminStackNavigator';

import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
      <RootStack.Screen name="AdminStack" component={AdminStackNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
