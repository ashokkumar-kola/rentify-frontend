import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import {
  RootStackParamList,
//   AppDrawerParamList,
  MainTabParamList,
//   HomeStackParamList,
//   ExploreStackParamList,
//   ProfileStackParamList,
//   MyPropertiesStackParamList,
//   MyRentalsStackParamList,
//   PaymentsStackParamList,
  AuthStackParamList,
  OnboardingStackParamList,
  AdminStackParamList,
} from './types';

// Main navigation type
export type AppNavigationProp = NavigationProp<RootStackParamList>;

// Modern Navigation Helper Hook
export const useNavigationHelper = () => {
  const navigation = useNavigation<AppNavigationProp>();

  // Root Level Navigation
  const navigateToSplash = () => {
    navigation.navigate('Splash');
  };

  const navigateToOnboarding = (screen?: keyof OnboardingStackParamList) => {
    navigation.navigate('OnboardingStack', { screen });
  };

  const navigateToAuth = (screen?: keyof AuthStackParamList, params?: any) => {
    navigation.navigate('AuthStack', { screen, params });
  };

  const navigateToAdmin = (screen?: keyof AdminStackParamList, params?: any) => {
    navigation.navigate('AdminStack', { screen, params });
  };

  // Auth Stack Navigation
  const navigateToLogin = () => {
    navigation.navigate('AuthStack', { screen: 'Login' });
  };

  const navigateToRegister = () => {
    navigation.navigate('AuthStack', { screen: 'Register' });
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('AuthStack', { screen: 'ForgotPassword' });
  };

  const navigateToConfirmEmail = (email: string) => {
    navigation.navigate('AuthStack', { screen: 'ConfirmEmail', params: { email } });
  };

  const navigateToResetPassword = (email: string) => {
    navigation.navigate('AuthStack', { screen: 'ResetPassword', params: { email } });
  };

  // Main App Navigation (Drawer Level)
  const navigateToMainTabs = (screen?: keyof MainTabParamList) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: screen ? { screen } : undefined,
    });
  };

  const navigateToSettings = () => {
    navigation.navigate('AppDrawer', { screen: 'Settings' });
  };

  const navigateToSupport = () => {
    navigation.navigate('AppDrawer', { screen: 'SupportStack' });
  };

  // Home Stack Navigation
  const navigateToHome = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'HomeStack',
        params: { screen: 'Home' },
      },
    });
  };

  const navigateToNotifications = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'HomeStack',
        params: { screen: 'Notifications' },
      },
    });
  };

  // Explore Stack Navigation
  const navigateToProperties = (properties?: any) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ExploreStack',
        params: {
          screen: 'Properties',
          params: { properties },
        },
      },
    });
  };

  const navigateToPropertyDetails = (propertyId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ExploreStack',
        params: {
          screen: 'PropertyDetails',
          params: { propertyId },
        },
      },
    });
  };

  const navigateToFilters = (filters?: any) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ExploreStack',
        params: {
          screen: 'Filters',
          params: { filters },
        },
      },
    });
  };

  const navigateToPropertyMapView = (coordinates?: { lat: number; lng: number }) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ExploreStack',
        params: {
          screen: 'PropertyMapView',
          params: { coordinates },
        },
      },
    });
  };

  // My Properties Navigation
  const navigateToMyProperties = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: { screen: 'MyProperties' },
      },
    });
  };

  const navigateToMyPropertyDetails = (propertyId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: {
          screen: 'MyPropertyDetails',
          params: { propertyId },
        },
      },
    });
  };

  const navigateToAddProperty = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: { screen: 'AddProperty' },
      },
    });
  };

  const navigateToEditProperty = (propertyId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: {
          screen: 'EditProperty',
          params: { propertyId },
        },
      },
    });
  };

  const navigateToPropertyApplications = (propertyId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: {
          screen: 'PropertyApplications',
          params: { propertyId },
        },
      },
    });
  };

  // Profile Stack Navigation
  const navigateToProfile = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'Profile' },
      },
    });
  };

  const navigateToEditProfile = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'EditProfile' },
      },
    });
  };

  const navigateToChangePassword = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'ChangePassword' },
      },
    });
  };

  const navigateToKYCVerification = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'KYCVerification' },
      },
    });
  };

  // Rentals Navigation (Consider flattening in production)
  const navigateToMyRentals = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: {
          screen: 'MyRentalsStack',
          params: { screen: 'MyRentals' },
        },
      },
    });
  };

  const navigateToMyRentalApplications = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: {
          screen: 'MyRentalsStack',
          params: { screen: 'MyRentalApplications' },
        },
      },
    });
  };

  const navigateToApplicationDetails = (applicationId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: {
          screen: 'MyRentalsStack',
          params: {
            screen: 'ApplicationDetails',
            params: { applicationId },
          },
        },
      },
    });
  };

  // Payments Navigation (Consider flattening in production)
  const navigateToMyPayments = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: {
          screen: 'PaymentsStack',
          params: { screen: 'MyPayments' },
        },
      },
    });
  };

  const navigateToPaymentDetails = (paymentId: string) => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: {
          screen: 'PaymentsStack',
          params: {
            screen: 'PaymentDetails',
            params: { paymentId },
          },
        },
      },
    });
  };

  // Wishlist Navigation
  const navigateToWishlist = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: { screen: 'Wishlist' },
    });
  };

  // Admin Navigation
  const navigateToAdminDashboard = () => {
    navigation.navigate('AdminStack', { screen: 'AdminDashboard' });
  };

  const navigateToUserManagement = () => {
    navigation.navigate('AdminStack', { screen: 'UserManagement' });
  };

  const navigateToUserDetail = (userId: string) => {
    navigation.navigate('AdminStack', {
      screen: 'UserDetail',
      params: { userId },
    });
  };

  const navigateToReportedProperties = () => {
    navigation.navigate('AdminStack', { screen: 'ReportedProperties' });
  };

  // Utility Methods
  const resetToAuth = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack', params: { screen: 'Login' } }],
      })
    );
  };

  const resetToApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AppDrawer' }],
      })
    );
  };

  const resetToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AppDrawer',
            params: {
              screen: 'MainTabs',
              params: {
                screen: 'HomeStack',
                params: { screen: 'Home' },
              },
            },
          },
        ],
      })
    );
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback to home if no back history
      navigateToHome();
    }
  };

  const canGoBack = () => navigation.canGoBack();

  // Return all navigation functions
  return {
    // Root navigation
    navigateToSplash,
    navigateToOnboarding,
    navigateToAuth,
    navigateToAdmin,

    // Auth navigation
    navigateToLogin,
    navigateToRegister,
    navigateToForgotPassword,
    navigateToConfirmEmail,
    navigateToResetPassword,

    // Main app navigation
    navigateToMainTabs,
    navigateToSettings,
    navigateToSupport,

    // Home navigation
    navigateToHome,
    navigateToNotifications,

    // Explore navigation
    navigateToProperties,
    navigateToPropertyDetails,
    navigateToFilters,
    navigateToPropertyMapView,

    // My Properties navigation
    navigateToMyProperties,
    navigateToMyPropertyDetails,
    navigateToAddProperty,
    navigateToEditProperty,
    navigateToPropertyApplications,

    // Profile navigation
    navigateToProfile,
    navigateToEditProfile,
    navigateToChangePassword,
    navigateToKYCVerification,

    // Rentals navigation
    navigateToMyRentals,
    navigateToMyRentalApplications,
    navigateToApplicationDetails,

    // Payments navigation
    navigateToMyPayments,
    navigateToPaymentDetails,

    // Wishlist navigation
    navigateToWishlist,

    // Admin navigation
    navigateToAdminDashboard,
    navigateToUserManagement,
    navigateToUserDetail,
    navigateToReportedProperties,

    // Utilities
    resetToAuth,
    resetToApp,
    resetToHome,
    goBack,
    canGoBack,

    // Access to original navigation object if needed
    navigation,
  };
};

// Specialized hooks for specific navigation areas
export const useAuthNavigation = () => {
  const {
    navigateToLogin,
    navigateToRegister,
    navigateToForgotPassword,
    navigateToConfirmEmail,
    navigateToResetPassword,
    resetToAuth,
  } = useNavigationHelper();

  return {
    navigateToLogin,
    navigateToRegister,
    navigateToForgotPassword,
    navigateToConfirmEmail,
    navigateToResetPassword,
    resetToAuth,
  };
};

export const usePropertyNavigation = () => {
  const {
    navigateToProperties,
    navigateToPropertyDetails,
    navigateToFilters,
    navigateToPropertyMapView,
    navigateToMyProperties,
    navigateToMyPropertyDetails,
    navigateToAddProperty,
    navigateToEditProperty,
    navigateToPropertyApplications,
  } = useNavigationHelper();

  return {
    navigateToProperties,
    navigateToPropertyDetails,
    navigateToFilters,
    navigateToPropertyMapView,
    navigateToMyProperties,
    navigateToMyPropertyDetails,
    navigateToAddProperty,
    navigateToEditProperty,
    navigateToPropertyApplications,
  };
};

export const useProfileNavigation = () => {
  const {
    navigateToProfile,
    navigateToEditProfile,
    navigateToChangePassword,
    navigateToKYCVerification,
    navigateToMyRentals,
    navigateToMyRentalApplications,
    navigateToApplicationDetails,
    navigateToMyPayments,
    navigateToPaymentDetails,
  } = useNavigationHelper();

  return {
    navigateToProfile,
    navigateToEditProfile,
    navigateToChangePassword,
    navigateToKYCVerification,
    navigateToMyRentals,
    navigateToMyRentalApplications,
    navigateToApplicationDetails,
    navigateToMyPayments,
    navigateToPaymentDetails,
  };
};

// Context-aware navigation helper
// export const useContextualNavigation = () => {
//   const { navigation } = useNavigationHelper();
//   const navigationHelper = useNavigationHelper();

//   const navigateBasedOnContext = (screenName: string, params?: any) => {
//     const currentRoute = navigation.getState()?.routes?.[navigation.getState()?.index || 0];

//     // Add contextual logic here
//     switch (currentRoute?.name) {
//       case 'AuthStack':
//         // If in auth flow, ensure proper auth navigation
//         break;
//       case 'AdminStack':
//         // If in admin area, handle admin-specific navigation
//         break;
//       default:
//         // Default navigation logic
//         break;
//     }
//   };

//   return {
//     ...navigationHelper,
//     navigateBasedOnContext,
//   };
// };







































// export function goToPropertyDetails(propertyId: string) {
// 	if (!navigationRef.isReady()) {
// 		return;
// 	}

// 	navigationRef.navigate('AppDrawer', {
// 		screen: 'MainTabs',
// 		params: {
// 			screen: 'ExploreStack',
// 			params: {
// 				screen: 'PropertyDetails',
// 				params: {
// 					propertyId,
// 				},
// 			},
// 		},
// 	});
// }

// import { goToPropertyDetails } from '../navigation/NavigationHelpers';

// goToPropertyDetails('abc123');































// import { useNavigation } from '@react-navigation/native';
// import { NavigationProp } from '@react-navigation/native';
// import { AllRoutes, NavigateToParams, RootStackParamList } from './types';

// type AppNavigationProp = NavigationProp<RootStackParamList>;

// const stackHierarchy: Record<string, string[]> = {
// 	OnboardingStack: ['Onboarding1', 'Onboarding2', 'Onboarding3'],
// 	AuthStack: [
// 		'Login',
// 		'Register',
// 		'ForgotPassword',
// 		'ConfirmEmail',
// 		'ResetPassword',
// 	],
// 	AppDrawer: ['MainTabs', 'Settings', 'SupportStack'],
// 	MainTabs: [
// 		'HomeStack',
// 		'ExploreStack',
// 		'MyProperties',
// 		'Wishlist',
// 		'ProfileStack',
// 	],
// 	HomeStack: ['Home', 'Notifications'],
// 	ExploreStack: [
// 		'Properties',
// 		'Filters',
// 		'PropertyDetails',
// 		'PropertyMapView',
// 	],
// 	ProfileStack: [
// 		'Profile',
// 		'EditProfile',
// 		'ChangePassword',
// 		'KYCVerification',
// 		'MyPropertiesStack',
// 		'MyRentalsStack',
// 		'PaymentsStack',
// 	],
// 	AdminStack: [
// 		'AdminDashboard',
// 		'UserManagement',
// 		'UserDetail',
// 		'ReportedProperties',
// 	],
// 	MyPropertiesStack: [
// 		'MyProperties',
// 		'AddProperty',
// 		'EditProperty',
// 		'PropertyApplications',
// 	],
// 	MyRentalsStack: ['MyRentals', 'MyRentalApplications', 'ApplicationDetails'],
// 	PaymentsStack: ['MyPayments', 'PaymentDetails'],
// };

// export const useAppNavigation = () => {
// 	const navigation = useNavigation<AppNavigationProp>();

// 	const navigateTo = <T extends AllRoutes>(
// 		screen: T,
// 		params?: NavigateToParams<T>
// 	) => {
// 		const findStack = (targetScreen: string): string | null => {
// 			for (const [stack, screens] of Object.entries(stackHierarchy)) {
// 				if (screens.includes(targetScreen)) {
// 					return stack;
// 				}
// 			}
// 			return null;
// 		};

// 		const targetStack = findStack(screen);

// 		if (!targetStack) {
// 			navigation.navigate(
// 				screen as keyof RootStackParamList,
// 				params as any
// 			);
// 			return;
// 		}

// 		switch (targetStack) {
// 			case 'OnboardingStack':
// 				navigation.navigate('OnboardingStack', { screen, params });
// 				break;
// 			case 'AuthStack':
// 				navigation.navigate('AuthStack', { screen, params });
// 				break;
// 			case 'AdminStack':
// 				navigation.navigate('AdminStack', { screen, params });
// 				break;
// 			case 'AppDrawer':
// 				if (screen === 'Settings' || screen === 'SupportStack') {
// 					navigation.navigate('AppDrawer', { screen, params });
// 				} else if (stackHierarchy.MainTabs.includes(screen)) {
// 					navigation.navigate('AppDrawer', {
// 						screen: 'MainTabs',
// 						params: { screen, params },
// 					});
// 				} else if (stackHierarchy.HomeStack.includes(screen)) {
// 					navigation.navigate('AppDrawer', {
// 						screen: 'MainTabs',
// 						params: {
// 							screen: 'HomeStack',
// 							params: { screen, params },
// 						},
// 					});
// 				} else if (stackHierarchy.ExploreStack.includes(screen)) {
// 					navigation.navigate('AppDrawer', {
// 						screen: 'MainTabs',
// 						params: {
// 							screen: 'ExploreStack',
// 							params: { screen, params },
// 						},
// 					});
// 				} else if (stackHierarchy.ProfileStack.includes(screen)) {
// 					navigation.navigate('AppDrawer', {
// 						screen: 'MainTabs',
// 						params: {
// 							screen: 'ProfileStack',
// 							params: { screen, params },
// 						},
// 					});
// 				} else if (
// 					stackHierarchy.MyPropertiesStack.includes(screen) ||
// 					stackHierarchy.MyRentalsStack.includes(screen) ||
// 					stackHierarchy.PaymentsStack.includes(screen)
// 				) {
// 					const subStack = stackHierarchy.MyPropertiesStack.includes(
// 						screen
// 					)
// 						? 'MyPropertiesStack'
// 						: stackHierarchy.MyRentalsStack.includes(screen)
// 						? 'MyRentalsStack'
// 						: 'PaymentsStack';
// 					navigation.navigate('AppDrawer', {
// 						screen: 'MainTabs',
// 						params: {
// 							screen: 'ProfileStack',
// 							params: {
// 								screen: subStack,
// 								params: { screen, params },
// 							},
// 						},
// 					});
// 				}
// 				break;
// 			default:
// 				navigation.navigate(
// 					screen as keyof RootStackParamList,
// 					params as any
// 				);
// 		}
// 	};

// 	return { navigateTo };
// };

// ### Usage Examples
// With the `useAppNavigation` hook, you can navigate to any screen like this:

// ```typescript
// const { navigateTo } = useAppNavigation();

// // Navigate to a top-level screen
// navigateTo('Splash');

// // Navigate to a nested screen in AuthStack
// navigateTo('Login');

// // Navigate to a deeply nested screen with params
// navigateTo('PropertyDetails', { propertyId: '123' });

// // Navigate to a deeply nested screen in ProfileStack > MyPropertiesStack
// navigateTo('EditProperty', { propertyId: '456' });
// ```

// #### Benefits
// 1. **Type Safety**: The `navigateTo` function is fully typed, so TypeScript will ensure you pass the correct screen names and parameters.
// 2. **Simplified Navigation**: No need to manually construct nested navigation calls or use `as never`.
// 3. **Centralized Logic**: The `stackHierarchy` object defines the navigation structure, making it easy to update if your app’s navigation changes.
// 4. **Scalability**: Easily extendable to support additional stacks or screens by updating `stackHierarchy` and the type definitions.

// #### Notes
// - Ensure all your stack navigators (e.g., `OnboardingStackNavigator`, `AuthStackNavigator`, etc.) use the updated `navigationTypes.ts` for their param lists.
// - If you need to reset the navigation stack or perform other navigation actions, you can extend the `useAppNavigation` hook with additional methods (e.g., `resetTo`, `goBack`).
// - Test thoroughly to ensure the navigation paths work as expected, especially for deeply nested screens.

// This solution should make navigation across your complex stack structure much simpler and maintainable. Let me know if you need help integrating this into specific components or other navigators!
