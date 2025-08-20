import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PropertiesScreen, FilterScreen, PropertyDetailsScreen, PropertyMapScreen } from '../screens';

// import PropertiesScreen from '../screens/explore/PropertiesScreen';
// import FilterScreen from '../screens/explore/FilterScreen';
// import PropertyDetailsScreen from '../screens/explore/PropertyDetailsScreen';
// import PropertyMapViewScreen from '../screens/explore/PropertyMapScreen';

import { FilterProvider } from '../contexts/FilterContext';

import { ExploreStackParamList } from './types';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

const SearchStackNavigator = () => {
	return (
		<FilterProvider>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Properties"
			>
				<Stack.Screen name="Properties" component={PropertiesScreen} />
				<Stack.Screen
					name="Filters"
					component={FilterScreen}
					options={{
						presentation: 'transparentModal',
						animation: 'slide_from_bottom',
						animationDuration: 400,
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="PropertyDetails"
					component={PropertyDetailsScreen}
					options={{ headerShown: true, title: 'Property Details' }}
				/>
				<Stack.Screen
					name="PropertyMapView"
					component={PropertyMapScreen}
				/>
			</Stack.Navigator>
		</FilterProvider>
	);
};

export default SearchStackNavigator;
