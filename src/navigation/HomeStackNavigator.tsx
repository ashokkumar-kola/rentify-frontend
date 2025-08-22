import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';

import { Fonts } from '../constants';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const AdminStackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerTitleStyle: {
					fontFamily: Fonts.SemiBold,
					fontSize: 20,
					color: '#000',
				},
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{ headerShown: true, title: 'Notifications' }}
			/>
		</Stack.Navigator>
	);
};

export default AdminStackNavigator;
