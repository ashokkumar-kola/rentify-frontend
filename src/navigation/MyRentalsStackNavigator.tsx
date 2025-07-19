import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyRentalsScreen from '../screens/rentals/MyRentalsScreen';
import MyRentalApplicationsScreen from '../screens/rentals/MyRentalApplicationsScreen';
import ApplicationDetailsScreen from '../screens/rentals/ApplicationDetailsScreen';

import { MyRentalsStackParamList } from './types';

const Stack = createNativeStackNavigator<MyRentalsStackParamList>();

const MyRentalsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyRentalsScreen" component={MyRentalsScreen} />
      <Stack.Screen name="MyRentalApplicationsScreen" component={MyRentalApplicationsScreen} />
      <Stack.Screen name="ApplicationDetailsScreen" component={ApplicationDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MyRentalsStackNavigator;
