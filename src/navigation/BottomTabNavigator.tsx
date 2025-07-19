import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/dashboards/HomeScreen';
// import ExplorePropertiesScreen from '../screens/properties/ExplorePropertiesScreen';
import FilterScreen from '../screens/properties/FiltersScreen';
import AddPropertyScreen from '../screens/user/AddPropertiesScreen';
import WishlistScreen from '../screens/user/WishlistScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

import CustomTabBar from '../components/CustomNavBars/CustomTabNavigator';

export type TabParamList = {
  Home: undefined;
  // ExploreProperties: undefined;
  Filters: undefined;
  AddProperty: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderCustomTabBar}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //       headerShown: false,
        //   }}
      />

      <Tab.Screen
        name="Filters"
        component={FilterScreen}
        // options={{
        //       headerShown: false,
        //   }}
      />

      <Tab.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        // options={{ tabBarStyle: { display: 'none' }, headerShown: true } }
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        // options={{ tabBarStyle: { display: 'none' }, headerShown: true } }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;





// const tabBarIcon = ({ color, size }: { color: string; size: number }, routeName: keyof TabParamList) => {
//   let iconName: string;

//   switch (routeName) {
//     case 'Home':
//       iconName = 'home';
//       break;
//     case 'Explore':
//       iconName = 'search';
//       break;
//     case 'AddProperty':
//       iconName = 'plus-square';
//       break;
//     case 'Wishlist':
//       iconName = 'heart';
//       break;
//     case 'Profile':
//       iconName = 'user';
//       break;
//     default:
//       iconName = 'circle';
//   }

//   return <Icon name={iconName} size={size} color={color} />;
// };

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarIcon: ({ color, size }) => tabBarIcon({ color, size }, route.name as keyof TabParamList),
//         tabBarActiveTintColor: '#007AFF',
//         tabBarInactiveTintColor: '#8e8e93',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Explore" component={ExploreScreen} />
//       <Tab.Screen name="AddProperty" component={AddPropertyScreen} />
//       <Tab.Screen name="Wishlist" component={WishlistScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;
