import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import UserManagementScreen from '../screens/admin/UserManagementScreen';
import UserDetailScreen from '../screens/admin/UserDetailScreen';
import ReportedPropertiesScreen from '../screens/admin/ReportedPropertiesScreen';

import { AdminStackParamList } from './types';

const Stack = createNativeStackNavigator<AdminStackParamList>();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="ReportedProperties" component={ReportedPropertiesScreen} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
