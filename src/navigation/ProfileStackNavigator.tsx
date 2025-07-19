import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import KYCVerificationScreen from '../screens/profile/KYCVerificationScreen';

import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
import MyRentalsStackNavigator from './MyRentalsStackNavigator';
import PaymentsStackNavigator from './PaymentsStackNavigator';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  ChangePasswordScreen: undefined;
  KYCVerificationScreen: undefined;
  MyPropertiesStack: undefined;
  MyRentalsStack: undefined;
  PaymentsStack: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="KYCVerificationScreen" component={KYCVerificationScreen} />
      <Stack.Screen name="MyPropertiesStack" component={MyPropertiesStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MyRentalsStack" component={MyRentalsStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentsStack" component={PaymentsStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
