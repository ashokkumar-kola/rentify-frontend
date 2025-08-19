import { NavigationProp, CommonActions } from '@react-navigation/native';
import {
  RootStackParamList,
  AppDrawerParamList,
  MainTabParamList,
  HomeStackParamList,
  ExploreStackParamList,
  ProfileStackParamList,
  MyPropertiesStackParamList,
  MyRentalsStackParamList,
  PaymentsStackParamList,
  AuthStackParamList,
  OnboardingStackParamList,
  AdminStackParamList,
} from './types';

// Type for the main navigation prop used throughout the app
export type AppNavigationProp = NavigationProp<RootStackParamList>;

export class NavigationHelper {
  private navigation: AppNavigationProp;

  constructor(navigation: AppNavigationProp) {
    this.navigation = navigation;
  }

  // Root Level Navigation
  navigateToSplash = () => {
    this.navigation.navigate('Splash');
  };

  navigateToOnboarding = (screen?: keyof OnboardingStackParamList) => {
    this.navigation.navigate('OnboardingStack', { screen });
  };

  navigateToAuth = (screen?: keyof AuthStackParamList, params?: any) => {
    this.navigation.navigate('AuthStack', { screen, params });
  };

  navigateToAdmin = (screen?: keyof AdminStackParamList, params?: any) => {
    this.navigation.navigate('AdminStack', { screen, params });
  };

  // Auth Stack Navigation
  navigateToLogin = () => {
    this.navigation.navigate('AuthStack', { screen: 'Login' });
  };

  navigateToRegister = () => {
    this.navigation.navigate('AuthStack', { screen: 'Register' });
  };

  navigateToForgotPassword = () => {
    this.navigation.navigate('AuthStack', { screen: 'ForgotPassword' });
  };

  navigateToConfirmEmail = (email: string) => {
    this.navigation.navigate('AuthStack', {
      screen: 'ConfirmEmail',
      params: { email },
    });
  };

  navigateToResetPassword = (email: string) => {
    this.navigation.navigate('AuthStack', {
      screen: 'ResetPassword',
      params: { email },
    });
  };

  // Main App Navigation (Drawer Level)
  navigateToMainTabs = (screen?: keyof MainTabParamList) => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: screen ? { screen } : undefined,
    });
  };

  navigateToSettings = () => {
    this.navigation.navigate('AppDrawer', { screen: 'Settings' });
  };

  navigateToSupport = () => {
    this.navigation.navigate('AppDrawer', { screen: 'SupportStack' });
  };

  // Home Stack Navigation
  navigateToHome = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'HomeStack',
        params: { screen: 'Home' },
      },
    });
  };

  navigateToNotifications = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'HomeStack',
        params: { screen: 'Notifications' },
      },
    });
  };

  // Explore Stack Navigation
  navigateToProperties = (properties: any) => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToPropertyDetails = (propertyId: string) => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToFilters = (filters: any) => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToPropertyMapView = (coordinates?: { lat: number; lng: number }) => {
    this.navigation.navigate('AppDrawer', {
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

  // SIMPLIFIED: Direct navigation to main property screens (RECOMMENDED APPROACH)
  // Instead of deeply nesting, these should be direct tabs or drawer items
  navigateToMyProperties = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: { screen: 'MyProperties' },
      },
    });
  };

  navigateToMyPropertyDetails = (propertyId: string) => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToAddProperty = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'MyPropertiesStack',
        params: { screen: 'AddProperty' },
      },
    });
  };

  navigateToEditProperty = (propertyId: string) => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToPropertyApplications = (propertyId: string) => {
    this.navigation.navigate('AppDrawer', {
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
  navigateToProfile = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'Profile' },
      },
    });
  };

  navigateToEditProfile = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'EditProfile' },
      },
    });
  };

  navigateToChangePassword = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'ChangePassword' },
      },
    });
  };

  navigateToKYCVerification = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'ProfileStack',
        params: { screen: 'KYCVerification' },
      },
    });
  };

  // DEEPLY NESTED (CURRENT STRUCTURE) - Consider flattening these
  navigateToMyRentals = () => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToMyRentalApplications = () => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToApplicationDetails = (applicationId: string) => {
    this.navigation.navigate('AppDrawer', {
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

  // Payments Navigation (Also deeply nested)
  navigateToMyPayments = () => {
    this.navigation.navigate('AppDrawer', {
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

  navigateToPaymentDetails = (paymentId: string) => {
    this.navigation.navigate('AppDrawer', {
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

  // Wishlist (Simple navigation)
  navigateToWishlist = () => {
    this.navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: { screen: 'Wishlist' },
    });
  };

  // Admin Navigation
  navigateToAdminDashboard = () => {
    this.navigation.navigate('AdminStack', { screen: 'AdminDashboard' });
  };

  navigateToUserManagement = () => {
    this.navigation.navigate('AdminStack', { screen: 'UserManagement' });
  };

  navigateToUserDetail = (userId: string) => {
    this.navigation.navigate('AdminStack', {
      screen: 'UserDetail',
      params: { userId },
    });
  };

  navigateToReportedProperties = () => {
    this.navigation.navigate('AdminStack', { screen: 'ReportedProperties' });
  };

  // Utility Methods
  resetToAuth = () => {
    this.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      })
    );
  };

  resetToApp = () => {
    this.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AppDrawer' }],
      })
    );
  };

  goBack = () => {
    if (this.navigation.canGoBack()) {
      this.navigation.goBack();
    }
  };
}

// Hook to use navigation helper
import { useNavigation } from '@react-navigation/native';

export const useNavigationHelper = () => {
  const navigation = useNavigation<AppNavigationProp>();
  return new NavigationHelper(navigation);
};
