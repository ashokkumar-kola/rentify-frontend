export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: undefined;
  AuthStack: undefined;
  AppDrawer: undefined;
  AdminStack: undefined;
};

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ConfirmEmail: {email: string};
  ResetPassword: {email: string};
};

export type AppDrawerParamList = {
  MainTabs: undefined;
  Settings: undefined;
  SupportStack: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  ExploreStack: undefined;
  MyProperties: undefined
  Wishlist: undefined;
  ProfileStack: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    Notifications: undefined;
}

export type ExploreStackParamList = {
  Properties: undefined;
  Filters: { filters: any };
  PropertyDetails: { propertyId: string };
  PropertyMapView: { coordinates?: { lat: number; lng: number } };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  KYCVerification: undefined;
  MyPropertiesStack: undefined;
  MyRentalsStack: undefined;
  PaymentsStack: undefined;
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  UserManagement: undefined;
  UserDetail: { userId: string };
  ReportedProperties: undefined;
};

export type MyPropertiesStackParamList = {
  MyProperties: undefined;
  AddProperty: undefined;
  EditProperty: { propertyId: string };
  PropertyApplications: { propertyId: string };
};

export type MyRentalsStackParamList = {
  MyRentals: undefined;
  MyRentalApplications: undefined;
  ApplicationDetails: { applicationId: string };
};

export type PaymentsStackParamList = {
  MyPayments: undefined;
  PaymentDetails: { paymentId: string };
};
