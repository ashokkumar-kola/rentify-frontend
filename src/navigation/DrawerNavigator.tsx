import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabNavigator from './MainTabNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SupportStackNavigator from './SupportStackNavigator';

import CustomDrawer from '../components/CustomNavBars/CustomDrawer';

import { AppDrawerParamList } from './types';
import { Colors } from '../constants';

const Drawer = createDrawerNavigator<AppDrawerParamList>();

const renderCustomDrawer = (props: any) => <CustomDrawer {...props} />;

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="MainTabs"
			drawerContent={renderCustomDrawer}
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: { marginLeft: -5, fontSize: 16 },
				drawerActiveTintColor: Colors.primary,
				drawerInactiveTintColor: '#555',
			}}
		>
			<Drawer.Screen
				name="MainTabs"
				component={MainTabNavigator}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
			/>
			<Drawer.Screen
				name="SupportStack"
				component={SupportStackNavigator}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
