import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SupportScreen from '../screens/support/SupportScreen';
import FAQScreen from '../screens/support/FAQScreen';
import TermsAndConditionsScreen from '../screens/support/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/support/PrivacyPolicyScreen';

export type SupportStackParamList = {
	SupportScreen: undefined;
	FAQScreen: undefined;
	TermsAndConditionsScreen: undefined;
	PrivacyPolicyScreen: undefined;
};

const Stack = createNativeStackNavigator<SupportStackParamList>();

const SupportStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SupportScreen" component={SupportScreen} />
			<Stack.Screen name="FAQScreen" component={FAQScreen} />
			<Stack.Screen
				name="TermsAndConditionsScreen"
				component={TermsAndConditionsScreen}
			/>
			<Stack.Screen
				name="PrivacyPolicyScreen"
				component={PrivacyPolicyScreen}
			/>
		</Stack.Navigator>
	);
};

export default SupportStackNavigator;
