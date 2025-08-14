import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

import CustomTabBar from '../components/CustomNavBars/CustomTabNavigator';

import HomeStackNavigator from './HomeStackNavigator';
import ExploreStackNavigator from './ExploreStackNavigator';
import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
import WishlistScreen from '../screens/properties/WishlistScreen';
import ProfileStackNavigator from './ProfileStackNavigator';

import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const MainTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				// tabBarStyle: { height: 60 },
			}}
			tabBar={renderCustomTabBar}
		>
			<Tab.Screen
				name="HomeStack"
				component={HomeStackNavigator}
				options={{ title: 'Home' }}
			/>
			<Tab.Screen
				name="ExploreStack"
				component={ExploreStackNavigator}
				options={{ title: 'Explore' }}
			/>
			<Tab.Screen
				name="MyPropertiesStack"
				component={MyPropertiesStackNavigator}
				options={{ title: 'Add Property' }}
			/>
			<Tab.Screen
				name="Wishlist"
				component={WishlistScreen}
				options={{ title: 'Wishlist' }}
			/>
			<Tab.Screen
				name="ProfileStack"
				component={ProfileStackNavigator}
				options={{ title: 'Profile' }}
			/>
		</Tab.Navigator>
	);
};

export default MainTabNavigator;

// options={{
//     tabBarStyle: { height: 60 }, // default height
// }}
