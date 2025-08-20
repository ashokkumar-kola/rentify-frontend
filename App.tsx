import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { EnumsProvider } from './src/context/EnumsContext';
// import { FavoritesProvider } from './src/context/FavoritesContext';
// import { navigationRef } from './src/navigation/NavigationService'; // ref={navigationRef}

import AppProvider from './src/providers/AppProvider';

import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
	return (
		// <SafeAreaProvider>
		// <EnumsProvider>
		// <FavoritesProvider>
			<AuthProvider>
				<AppProvider>
					<NavigationContainer ref={navigationRef}>
						<RootNavigator />
					</NavigationContainer>
				</AppProvider>
			</AuthProvider>
		// </FavoritesProvider>
		// </EnumsProvider>
		// </SafeAreaProvider>
	);
};

export default App;
