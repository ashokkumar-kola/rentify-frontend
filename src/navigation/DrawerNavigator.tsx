import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/user/ProfileScreen';
import MyPropertiesScreen from '../screens/user/MyPropertiesScreen';
import CustomDrawer from '../components/CustomNavBars/CustomDrawer';
import WishlistScreen from '../screens/properties/WishlistScreen';

// import MyRentalApplicationsScreen from '../screens/Rentals/MyRentalApplicationsScreen';
// import MyPaymentsScreen from '../screens/Payments/MyPaymentsScreen';

export type DrawerParamList = {
  HomeTabs: undefined;
  Profile: undefined;
  MyProperties: undefined;
  Wishlist: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeDrawerIcon = ({ color }: { color: string }) => (
  <FontAwesome name="home" size={20} color={color} />
);

const ProfileDrawerIcon = ({ color }: { color: string }) => (
  <FontAwesome name="user" size={20} color={color} />
);

const MyPropertiesDrawerIcon = ({ color }: { color: string }) => (
  <FontAwesome name="building" size={20} color={color} />
);

const WishlistDrawerIcon = ({ color }: { color: string }) => (
  <FontAwesome name="heart" size={20} color={color} />
);

const renderCustomDrawer = (props: any) => <CustomDrawer {...props} />;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -5, fontSize: 16 },
        drawerActiveTintColor: '#1e90ff',
        drawerInactiveTintColor: '#555',
        // drawerItemStyle: {
        //   paddingLeft: 10,
        // },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: HomeDrawerIcon,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ProfileDrawerIcon,
        }}
      />
      <Drawer.Screen
        name="MyProperties"
        component={MyPropertiesScreen}
        options={{
          title: 'My Properties',
          drawerIcon: MyPropertiesDrawerIcon,
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Wishlist',
          drawerIcon: WishlistDrawerIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import BottomTabNavigator from './BottomTabNavigator';
// import ProfileScreen from '../screens/user/ProfileScreen';
// import MyPropertiesScreen from '../screens/user/MyPropertiesScreen';

// import CustomDrawer from '../components/CustomNavBars/CustomDrawer';

// export type DrawerParamList = {
//   HomeTabs: undefined;
//   Profile: undefined;
//   MyProperties: undefined;
// };

// const Drawer = createDrawerNavigator<DrawerParamList>();

// const renderCustomDrawer = (props: any) => <CustomDrawer {...props} />;

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       drawerContent={renderCustomDrawer}
//     >
//       <Drawer.Screen name="HomeTabs" component={BottomTabNavigator} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="MyProperties" component={MyPropertiesScreen} />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
