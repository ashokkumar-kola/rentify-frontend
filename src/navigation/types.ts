export type RootStackParamList = {
	Splash: undefined;
	OnboardingStack: { screen?: keyof OnboardingStackParamList };
	AuthStack: {
		screen?: keyof AuthStackParamList;
		params?: AuthStackParamList[keyof AuthStackParamList];
	};
	AppDrawer: {
		screen?: keyof AppDrawerParamList;
		params?: AppDrawerParamList[keyof AppDrawerParamList];
	};
	AdminStack: {
		screen?: keyof AdminStackParamList;
		params?: AdminStackParamList[keyof AdminStackParamList];
	};
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
	ConfirmEmail: { email: string };
	ResetPassword: { email: string };
};

export type AppDrawerParamList = {
	MainTabs: {
		screen?: keyof MainTabParamList;
		params?: MainTabParamList[keyof MainTabParamList];
	};
	Settings: undefined;
	SupportStack: undefined;
};

export type MainTabParamList = {
	HomeStack: {
		screen?: keyof HomeStackParamList;
		params?: HomeStackParamList[keyof HomeStackParamList];
	};
	ExploreStack: {
		screen?: keyof ExploreStackParamList;
		params?: ExploreStackParamList[keyof ExploreStackParamList];
	};
	MyPropertiesStack: {
		screen?: keyof MyPropertiesStackParamList;
		params?: MyPropertiesStackParamList[keyof MyPropertiesStackParamList];
	};
	Wishlist: undefined;
	ProfileStack: {
		screen?: keyof ProfileStackParamList;
		params?: ProfileStackParamList[keyof ProfileStackParamList];
	};
};

export type HomeStackParamList = {
	Home: undefined;
	Notifications: undefined;
};

export type ExploreStackParamList = {
	Properties: { properties: any };
	Filters: { filters: any };
	PropertyDetails: { propertyId: string };
	PropertyMapView: { coordinates?: { lat: number; lng: number } };
};

export type ProfileStackParamList = {
	Profile: undefined;
	EditProfile: undefined;
	ChangePassword: undefined;
	KYCVerification: undefined;
	MyPropertiesStack: {
		screen?: keyof MyPropertiesStackParamList;
		params?: MyPropertiesStackParamList[keyof MyPropertiesStackParamList];
	};
	MyRentalsStack: {
		screen?: keyof MyRentalsStackParamList;
		params?: MyRentalsStackParamList[keyof MyRentalsStackParamList];
	};
	PaymentsStack: {
		screen?: keyof PaymentsStackParamList;
		params?: PaymentsStackParamList[keyof PaymentsStackParamList];
	};
};

export type AdminStackParamList = {
	AdminDashboard: undefined;
	UserManagement: undefined;
	UserDetail: { userId: string };
	ReportedProperties: undefined;
};

export type MyPropertiesStackParamList = {
	MyProperties: undefined;
	MyPropertyDetails: { propertyId: string };
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

// Unified type for all possible navigation routes
export type AllRoutes =
	| keyof RootStackParamList
	| keyof OnboardingStackParamList
	| keyof AuthStackParamList
	| keyof AppDrawerParamList
	| keyof MainTabParamList
	| keyof HomeStackParamList
	| keyof ExploreStackParamList
	| keyof ProfileStackParamList
	| keyof AdminStackParamList
	| keyof MyPropertiesStackParamList
	| keyof MyRentalsStackParamList
	| keyof PaymentsStackParamList;

// Map of all route parameters
export type RouteParams =
	| RootStackParamList
	| OnboardingStackParamList
	| AuthStackParamList
	| AppDrawerParamList
	| MainTabParamList
	| HomeStackParamList
	| ExploreStackParamList
	| ProfileStackParamList
	| AdminStackParamList
	| MyPropertiesStackParamList
	| MyRentalsStackParamList
	| PaymentsStackParamList;

// Type for navigation function
export type RouteParamMap = {
	[key in keyof RootStackParamList]: RootStackParamList[key];
} & {
	[key in keyof OnboardingStackParamList]: OnboardingStackParamList[key];
} & {
	[key in keyof AuthStackParamList]: AuthStackParamList[key];
} & {
	[key in keyof AppDrawerParamList]: AppDrawerParamList[key];
} & {
	[key in keyof MainTabParamList]: MainTabParamList[key];
} & {
	[key in keyof HomeStackParamList]: HomeStackParamList[key];
} & {
	[key in keyof ExploreStackParamList]: ExploreStackParamList[key];
} & {
	[key in keyof ProfileStackParamList]: ProfileStackParamList[key];
} & {
	[key in keyof AdminStackParamList]: AdminStackParamList[key];
} & {
	[key in keyof MyPropertiesStackParamList]: MyPropertiesStackParamList[key];
} & {
	[key in keyof MyRentalsStackParamList]: MyRentalsStackParamList[key];
} & {
	[key in keyof PaymentsStackParamList]: PaymentsStackParamList[key];
};

export type NavigateToParams<T extends AllRoutes> = RouteParamMap[T];

// export type RootStackParamList = {
//   Splash: undefined;
//   OnboardingStack: undefined;
//   AuthStack: undefined;
//   AppDrawer: undefined;
//   AdminStack: undefined;
// };

// export type OnboardingStackParamList = {
//   Onboarding1: undefined;
//   Onboarding2: undefined;
//   Onboarding3: undefined;
// };

// export type AuthStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   ForgotPassword: undefined;
//   ConfirmEmail: {email: string};
//   ResetPassword: {email: string};
// };

// export type AppDrawerParamList = {
//   MainTabs: undefined;
//   Settings: undefined;
//   SupportStack: undefined;
// };

// export type MainTabParamList = {
//   HomeStack: undefined;
//   ExploreStack: undefined;
//   MyProperties: undefined
//   Wishlist: undefined;
//   ProfileStack: undefined;
// };

// export type HomeStackParamList = {
//     Home: undefined;
//     Notifications: undefined;
// }

// export type ExploreStackParamList = {
//   Properties: undefined;
//   Filters: { filters: any };
//   PropertyDetails: { propertyId: string };
//   PropertyMapView: { coordinates?: { lat: number; lng: number } };
// };

// export type ProfileStackParamList = {
//   Profile: undefined;
//   EditProfile: undefined;
//   ChangePassword: undefined;
//   KYCVerification: undefined;
//   MyPropertiesStack: undefined;
//   MyRentalsStack: undefined;
//   PaymentsStack: undefined;
// };

// export type AdminStackParamList = {
//   AdminDashboard: undefined;
//   UserManagement: undefined;
//   UserDetail: { userId: string };
//   ReportedProperties: undefined;
// };

// export type MyPropertiesStackParamList = {
//   MyProperties: undefined;
//   AddProperty: undefined;
//   EditProperty: { propertyId: string };
//   PropertyApplications: { propertyId: string };
// };

// export type MyRentalsStackParamList = {
//   MyRentals: undefined;
//   MyRentalApplications: undefined;
//   ApplicationDetails: { applicationId: string };
// };

// export type PaymentsStackParamList = {
//   MyPayments: undefined;
//   PaymentDetails: { paymentId: string };
// };
