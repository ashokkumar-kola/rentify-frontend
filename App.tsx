import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/contexts/AuthContext";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { EnumsProvider } from './src/context/EnumsContext';
// import { FavoritesProvider } from './src/context/FavoritesContext';
// import { navigationRef } from './src/navigation/NavigationService'; // ref={navigationRef}

import RootNavigator from "./src/navigation/RootNavigator";

const App = () => {
	return (
		// <SafeAreaProvider>
		// <EnumsProvider>
		// <FavoritesProvider>
		<AuthProvider>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</AuthProvider>
		// </FavoritesProvider>
		// </EnumsProvider>
		// </SafeAreaProvider>
	);
};

export default App;

// import 'react-native-reanimated';
// // import { AppRegistry } from 'react-native';

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;
