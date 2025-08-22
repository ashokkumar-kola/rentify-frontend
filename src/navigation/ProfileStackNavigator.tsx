import React from 'react';
import { TouchableOpacity, InteractionManager } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
import { useNavigationHelper } from './navigationHelper';
import Icons from '.././constants/Icons';

import { ProfileScreen, EditProfileScreen, ChangePasswordScreen, KYCVerificationScreen } from '../screens';
import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
import MyRentalsStackNavigator from './MyRentalsStackNavigator';
import PaymentsStackNavigator from './PaymentsStackNavigator';

// import { useAuth } from '../contexts/AuthContext';
import { ProfileStackParamList } from './types';
import { Colors } from '../constants';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const useGoHomeButton = () => {
  const { resetToHome } = useNavigationHelper();

  const handlePress = () => {
    console.log('Button pressed!');
    console.log('resetToHome:', typeof resetToHome);

    if (resetToHome) {
		InteractionManager.runAfterInteractions(() => {
			resetToHome();
		});
    } else {
      console.error('resetToHome is undefined');
    }
  };

  return () => (
    <TouchableOpacity onPress={handlePress}>
      <Icons.MI name="arrow-back" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
};

// 🔹 Reusable custom back button
// const useGoHomeButton = () => {
//   const navigation = useNavigation();
//   const { resetToHome, navigateToHome } = useNavigationHelper();
//   return () => (
//     <TouchableOpacity onPress={ navigateToHome }>
//       <Icons.MI name="arrow-back" size={24} color={Colors.primary} />
//     </TouchableOpacity>
//   );
// };

const ProfileStackNavigator = () => {
//   const { isLoggedIn } = useAuth();
  const renderGoHomeButton = useGoHomeButton();

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: renderGoHomeButton, // 🔹 Custom back button for first screen
          title: 'Profile',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
      <Stack.Screen name="MyPropertiesStack" component={MyPropertiesStackNavigator} />
      <Stack.Screen name="MyRentalsStack" component={MyRentalsStackNavigator} />
      <Stack.Screen name="PaymentsStack" component={PaymentsStackNavigator} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;


// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { ProfileScreen, EditProfileScreen, ChangePasswordScreen, KYCVerificationScreen } from '../screens';

// import MyPropertiesStackNavigator from './MyPropertiesStackNavigator';
// import MyRentalsStackNavigator from './MyRentalsStackNavigator';
// import PaymentsStackNavigator from './PaymentsStackNavigator';

// import { useAuth } from '../contexts/AuthContext';

// import { ProfileStackParamList } from './types';
// import { Colors } from '../constants';

// const Stack = createNativeStackNavigator<ProfileStackParamList>();

// const ProfileStackNavigator = () => {
// 	const { isLoggedIn } = useAuth();

// 	return (
// 		<Stack.Navigator
// 			initialRouteName="Profile"
// 			screenOptions={{
// 				headerShown: true,
// 				// headerStyle: { backgroundColor: Colors.primary},
// 				// headerTintColor: Colors.white,
// 				// gestureEnabled: true,
// 			}}
// 			// mode="card"
// 			// detachInactiveScreens={true}
// 		>
// 			<Stack.Screen
// 				name="Profile"
// 				component={ProfileScreen}
// 			/>
// 			<Stack.Screen
// 				name="EditProfile"
// 				component={EditProfileScreen}
// 			/>
// 			<Stack.Screen
// 				name="ChangePassword"
// 				component={ChangePasswordScreen}
// 			/>
// 			<Stack.Screen
// 				name="KYCVerification"
// 				component={KYCVerificationScreen}
// 			/>
// 			<Stack.Screen
// 				name="MyPropertiesStack"
// 				component={MyPropertiesStackNavigator}
// 				// options={{ headerShown: false }}
// 			/>
// 			<Stack.Screen
// 				name="MyRentalsStack"
// 				component={MyRentalsStackNavigator}
// 				// options={{ headerShown: false }}
// 			/>
// 			<Stack.Screen
// 				name="PaymentsStack"
// 				component={PaymentsStackNavigator}
// 				// options={{ headerShown: false }}
// 			/>
// 		</Stack.Navigator>
// 	);
// };

// export default ProfileStackNavigator;
