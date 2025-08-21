import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

import { LoadingSplash, SplashScreen } from '../screens';

import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import AppDrawerNavigator from './DrawerNavigator';
import AdminStackNavigator from './AdminStackNavigator';

import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	const { isLoading, isFirstTime, isLoggedIn, user } = useAuth();

	// Show SplashScreen while checking auth state
	if (isLoading) {
		return <LoadingSplash />;
	}

	let initialRoute: keyof RootStackParamList = 'AppDrawer';

	if (isFirstTime) {
		initialRoute = 'OnboardingStack';
	} else if (!isLoggedIn) {
		initialRoute = 'AuthStack';
	} else if (user?.role?.includes('admin')) {
		initialRoute = 'AdminStack';
	} else {
		initialRoute = 'AppDrawer';
	}

	return (
		<RootStack.Navigator
			initialRouteName={initialRoute}
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="Splash" component={SplashScreen} />
			<RootStack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
			<RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
			<RootStack.Screen name="AdminStack" component={AdminStackNavigator} />
			<RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
		</RootStack.Navigator>
	);
};

export default RootNavigator;
