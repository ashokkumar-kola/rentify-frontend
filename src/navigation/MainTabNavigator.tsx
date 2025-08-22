import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
// import { CommonActions } from '@react-navigation/native';

// import { useAuth } from '../contexts/AuthContext';

import CustomTabBar from '../components/CustomNavBars/CustomTabNavigator';

import HomeStackNavigator from './HomeStackNavigator';
import ExploreStackNavigator from './ExploreStackNavigator';
import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
import WishlistScreen from '../screens/properties/WishlistScreen';
import ProfileStackNavigator from './ProfileStackNavigator';

// import AuthStackNavigator from './AuthStackNavigator';

import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const MainTabNavigator = () => {
	// const { isLoggedIn } = useAuth();

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
				// listeners={({ navigation }) => ({
				// 	tabPress: (e) => {
				// 		e.preventDefault();
				// 		navigation.dispatch(
				// 		CommonActions.reset({
				// 			index: 0,
				// 			routes: [{ name: 'HomeStack' }],
				// 		})
				// 		);
				// 	},
				// })}
			/>
			<Tab.Screen
				name="ExploreStack"
				component={ExploreStackNavigator}
				options={{ title: 'Explore' }}
				// listeners={({ navigation }) => ({
				// 	tabPress: (e) => {
				// 		e.preventDefault();
				// 		navigation.dispatch(
				// 		CommonActions.reset({
				// 			index: 0,
				// 			routes: [{ name: 'ExploreStack' }],
				// 		})
				// 		);
				// 	},
				// })}
			/>
			<Tab.Screen
				name="MyPropertiesStack"
				component={MyPropertiesStackNavigator} // isLoggedIn ? MyPropertiesStackNavigator : AuthStackNavigator
				options={{ title: 'Add Property' }}
			/>
			<Tab.Screen
				name="Wishlist"
				component={ WishlistScreen } // isLoggedIn ? WishlistScreen : AuthStackNavigator
				options={{ title: 'Wishlist' }}
			/>
			<Tab.Screen
				name="ProfileStack"
				component={ ProfileStackNavigator } // isLoggedIn ? ProfileStackNavigator : AuthStackNavigator
				options={{ title: 'Profile' }}
			/>
		</Tab.Navigator>
	);
};

export default MainTabNavigator;
