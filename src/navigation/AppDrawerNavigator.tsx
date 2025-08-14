import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainTabNavigator from "./MainTabNavigator";
import SettingsScreen from "../screens/settings/SettingsScreen";
import SupportStackNavigator from "./SupportStackNavigator";

import CustomDrawer from "../components/CustomNavBars/CustomDrawer";

import { AppDrawerParamList } from "./types";

const Drawer = createDrawerNavigator<AppDrawerParamList>();

const AppDrawerNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="MainTabs"
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				headerShown: false,
				drawerLabelStyle: { marginLeft: -5, fontSize: 16 },
				drawerActiveTintColor: "#1e90ff",
				drawerInactiveTintColor: "#555",
			}}
		>
			<Drawer.Screen name="MainTabs" component={MainTabNavigator} />
			<Drawer.Screen name="Settings" component={SettingsScreen} />
			<Drawer.Screen
				name="SupportStack"
				component={SupportStackNavigator}
			/>
		</Drawer.Navigator>
	);
};

export default AppDrawerNavigator;

// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import MainTabNavigator from './MainTabNavigator';
// import SettingsScreen from '../screens/settings/SettingsScreen';
// import SupportStackNavigator from './SupportStackNavigator';

// // import CustomDrawer from '../components/CustomNavBars/CustomDrawer';

// import { AppDrawerParamList } from './types';

// const Drawer = createDrawerNavigator<AppDrawerParamList>();

// const AppDrawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="MainTabs"
//     //   drawerContentOptions={{drawerContent={renderCustomDrawer}AppDrawerNavigator
//     //   screenOptions={{
//     //     headerShown: false,
//     //     drawerLabelStyle: { marginLeft: -5, fontSize: 16 },
//     //     drawerActiveTintColor: '#1e90ff',
//     //     drawerInactiveTintColor: '#555',
//     //     // drawerItemStyle: {
//     //     //   paddingLeft: 10,
//     //     // },
//     //   }}
//     >
//       <Drawer.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//       <Drawer.Screen name="SupportStack" component={SupportStackNavigator} options={{ headerShown: false }} />
//     </Drawer.Navigator>
//   );
// };

// export default AppDrawerNavigator;
