import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

import { SplashScreen } from '../screens';

import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import AppDrawerNavigator from './DrawerNavigator';
import AdminStackNavigator from './AdminStackNavigator';

import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	// const { isLoggedIn, user } = useAuth();
	return (
		<RootStack.Navigator
			initialRouteName="Splash"
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="Splash" component={SplashScreen} />

			<RootStack.Screen
				name="OnboardingStack"
				component={OnboardingStackNavigator}
			/>

			<RootStack.Screen
				name="AdminStack"
				component={AdminStackNavigator}
			/>
			<RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
			<RootStack.Screen name="AuthStack" component={AuthStackNavigator} />

			{/* {isLoggedIn ? (
        user?.role === 'admin' ? (
          <RootStack.Screen name="AdminStack" component={AdminStackNavigator} />
        ) : (
          <RootStack.Screen name="AppDrawer" component={AppDrawerNavigator} />
        )
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      )} */}
		</RootStack.Navigator>
	);
};

export default RootNavigator;



// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useAuth } from '../contexts/AuthContext';

// import { SplashScreen } from '../screens';

// import OnboardingStackNavigator from './OnboardingStackNavigator';
// import AuthStackNavigator from './AuthStackNavigator';
// import AppDrawerNavigator from './DrawerNavigator';
// import AdminStackNavigator from './AdminStackNavigator';

// import { RootStackParamList } from './types';

// const RootStack = createNativeStackNavigator<RootStackParamList>();

// const RootNavigator = () => {
// 	const { isLoading, isFirstTime, isLoggedIn, user } = useAuth();

// 	if (isLoading) {
// 		return <SplashScreen />;
// 	}

// 	return (
// 		<RootStack.Navigator
// 			initialRouteName="Splash"
// 			screenOptions={{ headerShown: false }}
// 		>
// 			{isFirstTime ? (
// 				<RootStack.Screen
// 					name="OnboardingStack"
// 					component={OnboardingStackNavigator}
// 				/>
// 			) : isLoggedIn ? (
// 				user?.role?.includes('admin') ? (
// 					<RootStack.Screen
// 						name="AdminStack"
// 						component={AdminStackNavigator}
// 					/>
// 				) : (
// 					<RootStack.Screen
// 						name="AppDrawer"
// 						component={AppDrawerNavigator}
// 					/>
// 				)
// 			) : (
// 				<RootStack.Screen
// 					name="AuthStack"
// 					component={AuthStackNavigator}
// 				/>
// 			)}
// 		</RootStack.Navigator>
// 	);
// };

// export default RootNavigator;
