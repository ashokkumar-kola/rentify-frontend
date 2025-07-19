export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: undefined;
  AuthStack: undefined;
  AppDrawer: undefined;
  AdminStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: undefined;
  ChangePassword: undefined;
//   VerifyEmail: { email: string };
//   ChangePassword: { token: string };
};

export type MainTabParamList = {
  HomeStack: undefined;
  SearchStack: undefined;
  AddProperty: undefined;
  Wishlist: undefined;
  ProfileStack: undefined;
};

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    Notifications: undefined;
}

export type AppDrawerParamList = {
  MainTabs: undefined;
  Settings: undefined;
  SupportStack: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  UserManagement: undefined;
  UserDetail: { userId: string };
  ReportedProperties: undefined;
};

export type MyPropertiesStackParamList = {
  MyPropertiesScreen: undefined;
  EditPropertyScreen: { propertyId: string };
  PropertyApplicationsScreen: { propertyId: string };
};

export type MyRentalsStackParamList = {
  MyRentalsScreen: undefined;
  MyRentalApplicationsScreen: undefined;
  ApplicationDetailsScreen: { applicationId: string };
};

export type PaymentsStackParamList = {
  MyPaymentsScreen: undefined;
  PaymentDetailsScreen: { paymentId: string };
};
