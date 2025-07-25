import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import ExploreStackNavigator from './ExploreStackNavigator';
// import AddPropertyScreen from '../screens/properties/AddPropertyScreen';
import WishlistScreen from '../screens/properties/WishlistScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';

import CustomTabBar from '../components/CustomNavBars/CustomTabNavigator';

import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderCustomTabBar} >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="ExploreStack" component={ExploreStackNavigator} options={{ title: 'Explore' }} />
      {/* <Tab.Screen name="AddProperty" component={AddPropertyScreen} options={{ title: 'Add Property' }} /> */}
      <Tab.Screen name="MyProperties" component={MyPropertiesStackNavigator} options={{ title: 'Add Property' }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Wishlist' }} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
