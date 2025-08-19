import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen, EditProfileScreen, ChangePasswordScreen, KYCVerificationScreen } from '../screens';

import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
import MyRentalsStackNavigator from './MyRentalsStackNavigator';
import PaymentsStackNavigator from './PaymentsStackNavigator';

import { ProfileStackParamList } from './types';
import { Colors } from '../constants';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="Profile"
			screenOptions={{
				headerShown: false,
				// headerStyle: { backgroundColor: Colors.primary},
				// headerTintColor: Colors.white,
				// gestureEnabled: true,
			}}
			// mode="card"
			// detachInactiveScreens={true}
		>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
			/>
			<Stack.Screen
				name="EditProfile"
				component={EditProfileScreen}
			/>
			<Stack.Screen
				name="ChangePassword"
				component={ChangePasswordScreen}
			/>
			<Stack.Screen
				name="KYCVerification"
				component={KYCVerificationScreen}
			/>
			<Stack.Screen
				name="MyPropertiesStack"
				component={MyPropertiesStackNavigator}
				// options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="MyRentalsStack"
				component={MyRentalsStackNavigator}
				// options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="PaymentsStack"
				component={PaymentsStackNavigator}
				// options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default ProfileStackNavigator;
