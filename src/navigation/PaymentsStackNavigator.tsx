import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPaymentsScreen from '../screens/payments/MyPaymentsScreen';
import PaymentDetailsScreen from '../screens/payments/PaymentDetailsScreen';

import { PaymentsStackParamList } from './types';

const Stack = createNativeStackNavigator<PaymentsStackParamList>();

const PaymentsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPaymentsScreen" component={MyPaymentsScreen} />
      <Stack.Screen name="PaymentDetailsScreen" component={PaymentDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PaymentsStackNavigator;
