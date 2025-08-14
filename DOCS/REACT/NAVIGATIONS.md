# React Navigation Setup (Stack, Tab, Drawer)

    Stack Navigator – screen-to-screen (e.g. Login → Home)
    Bottom Tab Navigator – app sections via tabs (e.g. Home | Profile | Settings)
    Drawer Navigator – side menu navigation


    # Install Core Navigation Package
    	- npm install @react-navigation/native

    # Install Required Dependencies
    	- npm install react-native-screens react-native-safe-area-context
    	- npm install react-native-gesture-handler react-native-reanimated
    	- npm install @react-native-masked-view/masked-view
    # MainActivity.java
    	import com.facebook.react.ReactActivity;
    	import android.os.Bundle;

    	@Override
    	protected void onCreate(Bundle savedInstanceState) {
    	  super.onCreate(null);
    	}

    # Install Navigators
    	- npm install @react-navigation/native-stack
    	- npm install @react-navigation/bottom-tabs
    	- npm install @react-navigation/drawer
    		-npm install react-native-gesture-handler react-native-reanimated
    	# Configure react-native-reanimated
    		- Edit babel.config.js
    			module.exports = {
    			  presets: ['module:metro-react-native-babel-preset'],
    			  plugins: [
    			    // other plugins here (if any)
    			    'react-native-reanimated/plugin',
    			  ],
    			};
    		- Rebuild the App
    			- npx react-native run-android

    	# Configure react-native-gesture-handler
    		- In index.js or index.ts (top of file):
    			import 'react-native-gesture-handler';

npm install react@18.3.1 react-native@0.76.0

npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer

npm install formik yup

npm install axios jwt-decode base-64

npm install @react-native-picker/picker react-native-picker-select react-native-element-dropdown

npm install @react-native-async-storage/async-storage

npm install react-native-image-picker

npm install react-native-linear-gradient

npm install react-native-paper

npm install @miblanchard/react-native-slider

npm install typescript @types/react @types/react-native-vector-icons @types/react-test-renderer

npm install -D @babel/core @babel/preset-env @babel/runtime babel-jest eslint prettier jest @react-native/eslint-config @react-native/babel-preset @react-native/typescript-config @react-native/metro-config react-test-renderer

npm install -D @react-native-community/cli @react-native-community/cli-platform-android @react-native-community/cli-platform-ios

npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values react-native-vector-icons

    npm install @react-navigation/elements

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

navigation.navigate('ExploreStack', {
screen: 'CategoryFilter',
params: {
categoryId: 'some-id',
},
});
