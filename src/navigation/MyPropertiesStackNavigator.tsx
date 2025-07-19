import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPropertiesScreen from '../screens/propertyManagement/MyPropertiesScreen';
import EditPropertyScreen from '../screens/propertyManagement/EditPropertyScreen';
import PropertyApplicationsScreen from '../screens/propertyManagement/PropertyApplicationsScreen';

import { MyPropertiesStackParamList } from './types';

const Stack = createNativeStackNavigator<MyPropertiesStackParamList>();

const MyPropertiesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPropertiesScreen" component={MyPropertiesScreen} />
      <Stack.Screen name="EditPropertyScreen" component={EditPropertyScreen} />
      <Stack.Screen name="PropertyApplicationsScreen" component={PropertyApplicationsScreen} />
    </Stack.Navigator>
  );
};

export default MyPropertiesStackNavigator;
