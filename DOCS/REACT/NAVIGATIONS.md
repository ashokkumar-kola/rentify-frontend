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






Inside screens → Use useNavigation or the navigation prop.

Inside child components → useNavigation is fine (cleaner than prop drilling).

Outside React components (Redux, services, API callbacks, sockets, etc.) → Use a navigation ref.










# 1. navigate(name, params?)
Purpose: Navigate to a screen in current or parent navigator
When to use: Most common navigation method
Behavior:

In stacks: Pushes new screen if different, updates params if same
In tabs/drawer: Switches to screen and updates params

// Basic navigation
navigation.navigate('PostDetails', { postId: '123' });

// Cross-stack navigation (Feed → Settings)
navigation.navigate('Settings', {
  screen: 'Account',
  params: { section: 'privacy' }
});

// Deep navigation (Feed → Messages → Chat)
navigation.navigate('Messages', {
  screen: 'ChatScreen',
  params: { 
    conversationId: 'conv123',
    recipientName: 'John'
  }
});

// Navigate to drawer screen from nested stack
navigation.getParent('drawer')?.navigate('Notifications');


# 2. goBack()
Purpose: Go back to the previous screen, this will pop the current screen when used in a stack
When to use: Return to previous screen
Edge cases: May not work as expected in nested navigators

// Simple go back
navigation.goBack();

// Conditional go back with fallback
const handleGoBack = () => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.navigate('FeedHome'); // Fallback
  }
};

// Go back to specific parent navigator
const goBackToTab = () => {
  const parentNavigation = navigation.getParent('tab');
  if (parentNavigation?.canGoBack()) {
    parentNavigation.goBack();
  }
};



# 3. reset(state)
Purpose: Replace the navigation state of the navigator with the given state
When to use:

Authentication flow changes
Clear navigation history
App state reset

// Reset to login after logout
const handleLogout = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Auth', params: { screen: 'Login' } }],
  });
};

// Reset to main flow after authentication
const handleLoginSuccess = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Main' }],
  });
};

// Reset specific stack with multiple screens
const resetFeedStack = () => {
  navigation.reset({
    index: 1,
    routes: [
      { name: 'FeedHome' },
      { name: 'PostDetails', params: { postId: 'featured' } }
    ],
  });
};


## ---


# 4. Stack-Specific Methods

push(name, params?)
Purpose: Always pushes new screen to stack (unlike navigate)
When to use: When you want multiple instances of same screen

// Push same screen multiple times
navigation.push('UserProfile', { userId: 'user1' });
navigation.push('UserProfile', { userId: 'user2' }); // Creates second instance

// Push with complex navigation
const viewUserFromPost = (userId: string) => {
  navigation.push('UserProfile', { userId });
};

---

pop(count?)
Purpose: Remove screens from stack
When to use: Go back multiple screens

// Go back one screen
navigation.pop();

// Go back multiple screens
navigation.pop(2); // Goes back 2 screens

// Pop to specific count
navigation.pop(navigation.getState().routes.length - 2); // Keep only first screen

---

popTo(name, params?)
Purpose: Pop to specific screen in stack
When to use: Return to specific screen in history

// Pop to specific screen
navigation.popTo('FeedHome');

// Pop to screen with specific params
navigation.popTo('PostDetails', { postId: 'original' });

---

popToTop()
Purpose: Pop to first screen in stack
When to use: Return to root of current stack

// Go to root of current stack
navigation.popToTop();

// Equivalent to:
navigation.pop(navigation.getState().routes.length - 1);

---

replace(name, params?)
Purpose: Replace current screen with new one
When to use:

Prevent going back to current screen
Navigation flows where back shouldn't work

// Replace current screen
navigation.replace('PostDetails', { postId: 'new123' });

// Use in authentication flows
const handleSuccessfulLogin = () => {
  navigation.replace('Main'); // Can't go back to login
};


## ---

## 5. Tab-Specific Methods
jumpTo(name, params?)
Purpose: Switch to specific tab
When to use: Programmatic tab switching

// Jump to specific tab
navigation.jumpTo('Profile');

// Jump to tab with params
navigation.jumpTo('Messages', { highlight: 'unread' });

// Jump to tab in nested navigator
const goToExplore = () => {
  navigation.getParent('tab')?.jumpTo('Explore', {
    screen: 'SearchResults',
    params: { query: 'trending' }
  });
};


## 6. Drawer-Specific Methods
openDrawer(), closeDrawer(), toggleDrawer()
Purpose: Control drawer state
When to use: Custom drawer controls

// Drawer controls
const openMenu = () => navigation.getParent('drawer')?.openDrawer();
const closeMenu = () => navigation.getParent('drawer')?.closeDrawer();
const toggleMenu = () => navigation.getParent('drawer')?.toggleDrawer();

// In nested screen
const MenuButton = () => {
  const drawerNavigation = navigation.getParent('drawer');
  
  return (
    <IconButton
      icon="menu"
      onPress={() => drawerNavigation?.toggleDrawer()}
    />
  );
};


## Advanced Navigation Patterns
1. Cross-Stack Navigation Helper

// src/navigation/NavigationService.ts
class AdvancedNavigationService {
  
  // Navigate to any screen from anywhere
  navigateToScreen(
    stackName: keyof DrawerParamList,
    screenName: string,
    params?: any
  ) {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Main', {
        screen: stackName,
        params: {
          screen: screenName,
          params
        }
      });
    }
  }

  // Navigate to deeply nested screen
  navigateToDeepScreen(path: NavigationPath) {
    if (navigationRef.isReady()) {
      let navigation: any = { navigate: navigationRef.navigate };
      
      path.forEach((segment, index) => {
        if (index === 0) {
          navigation.navigate(segment.name, {
            screen: path[1]?.name,
            params: this.buildNestedParams(path.slice(1))
          });
        }
      });
    }
  }

  // Handle notification navigation
  handleNotificationNavigation(notification: AppNotification) {
    switch (notification.type) {
      case 'message':
        this.navigateToScreen('HomeTabs', 'Messages', {
          screen: 'ChatScreen',
          params: { conversationId: notification.data.conversationId }
        });
        break;
      case 'post_comment':
        this.navigateToScreen('HomeTabs', 'Feed', {
          screen: 'PostDetails',
          params: { 
            postId: notification.data.postId,
            fromNotification: true
          }
        });
        break;
    }
  }

  // Smart back navigation
  smartGoBack() {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      const routeName = currentRoute?.name;

      // Custom back logic based on screen
      switch (routeName) {
        case 'PostDetails':
          // If came from notification, go to feed home
          if (currentRoute?.params?.fromNotification) {
            navigationRef.navigate('Main', {
              screen: 'HomeTabs',
              params: { screen: 'Feed' }
            });
          } else {
            navigationRef.goBack();
          }
          break;
        default:
          navigationRef.goBack();
      }
    }
  }
}




2. Navigation State Management

// src/hooks/useNavigationState.ts
export function useNavigationState() {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const state = e.data.state;
      const route = state.routes[state.index];
      
      setCurrentRoute(route.name);
      setNavigationHistory(prev => [...prev.slice(-9), route.name]); // Keep last 10
    });

    return unsubscribe;
  }, [navigation]);

  const canNavigateBack = useCallback(() => {
    return navigationHistory.length > 1;
  }, [navigationHistory]);

  const getNavigationPath = useCallback(() => {
    // Get full navigation path for debugging
    const state = navigation.getState();
    return extractPath(state);
  }, [navigation]);

  return {
    currentRoute,
    navigationHistory,
    canNavigateBack,
    getNavigationPath,
  };
}



## 




## 




## 




## 