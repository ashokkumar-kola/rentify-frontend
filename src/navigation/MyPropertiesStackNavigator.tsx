import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyPropertiesScreen from "../screens/properties/MyPropertiesScreen";
import MyPropertyDetailsScreen from "../screens/properties/MyPropertyDetailsScreen";
import EditPropertyScreen from "../screens/properties/EditPropertyScreen";
import AddPropertyScreen from "../screens/properties/AddPropertyScreen";
import PropertyApplicationsScreen from "../screens/properties/PropertyApplicationsScreen";

import { MyPropertiesStackParamList } from "./types";

const Stack = createNativeStackNavigator<MyPropertiesStackParamList>();

const MyPropertiesStackNavigator = () => {
	return (
		<Stack.Navigator
			// screenOptions={{ headerShown: true }}
			initialRouteName="MyProperties"
		>
			<Stack.Screen name="MyProperties" component={MyPropertiesScreen} />
			<Stack.Screen
				name="MyPropertyDetails"
				component={MyPropertyDetailsScreen}
			/>
			<Stack.Screen name="AddProperty" component={AddPropertyScreen} />
			<Stack.Screen name="EditProperty" component={EditPropertyScreen} />
			<Stack.Screen
				name="PropertyApplications"
				component={PropertyApplicationsScreen}
			/>
		</Stack.Navigator>
	);
};

export default MyPropertiesStackNavigator;
