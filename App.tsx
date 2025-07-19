import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
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
