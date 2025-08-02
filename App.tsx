import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { EnumsProvider } from './src/context/EnumsContext';

import RootStackNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    // <SafeAreaProvider>
      // <EnumsProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
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
