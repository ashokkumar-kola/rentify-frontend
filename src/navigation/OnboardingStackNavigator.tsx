import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1Screen from '../screens/onboarding/Onboarding1Screen';
import Onboarding2Screen from '../screens/onboarding/Onboarding2Screen';
import Onboarding3Screen from '../screens/onboarding/Onboarding3Screen';

import { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding1">
			<Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
			<Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
			<Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
		</Stack.Navigator>
	);
};

export default OnboardingStackNavigator;
