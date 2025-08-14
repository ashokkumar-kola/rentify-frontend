// src/constants/screens.ts
const SCREENS = {
	SPLASH: "Splash",

	ON_BOARDING1: "OnBoarding1",
	ON_BOARDING2: "OnBoarding2",
	ON_BOARDING3: "OnBoarding3",

	LOGIN: "Login",
	SIGNUP: "Signup",
	FORGOT_PASSWORD: "ForgotPassword",
	RESET_PASSWORD: "ResetPassword",
	CONFIRM_EMAIL: "ConfirmEmail",

	HOME: "Home",

	PROFILE: "Profile",
	EDIT_PROFILE: "EditProfile",
	CHANGE_PASSWORD: "ChangePassword",
	KYC_VERIFICATION: "KYCVerification",

	PROPERTIES: "Properties",
	EXPLORE_PROPERTIES: "ExploreProperties",
	FILTER_PROPERTIES: "FilterProperties",
	MY_PROPERTIES: "MyProperties",
	ADD_PROPERTY: "AddProperty",
	EDIT_PROPERTY: "EditProperty",
	PROPERTY_DETAILS: "PropertyDetails",
	PROPERTY_MAP: "PropertyMap",

	MAKE_PAYMENTS: "MakePayments",
	MY_PAYMENTS: "MyPayments",
	PAYMENT_METHODS: "PaymentMethods",
};

export default SCREENS;

// Splash
export { default as SplashScreen } from "./splash/SplashScreen";

// Onboarding
export { default as OnBoarding1Screen } from "./onboarding/Onboarding1Screen";
export { default as OnBoarding2Screen } from "./onboarding/Onboarding2Screen";
export { default as OnBoarding3Screen } from "./onboarding/Onboarding3Screen";

// Auth
export { default as LoginScreen } from "./auth/LoginScreen";
export { default as RegisterScreen } from "./auth/RegisterScreen";
export { default as ForgotPasswordScreen } from "./auth/ForgotPasswordScreen";
export { default as ResetPasswordScreen } from "./auth/ResetPasswordScreen";
export { default as ConfirmEmailScreen } from "./auth/ConfirmEmailScreen";

// Home
export { default as HomeScreen } from "./home/HomeScreen";

// Profile
export { default as ProfileScreen } from "./account/ProfileScreen";
export { default as EditProfileScreen } from "./account/EditProfileScreen";
export { default as ChangePasswordScreen } from "./account/ChangePasswordScreen";
export { default as KYCVerificationScreen } from "./account/KYCVerificationScreen";

// Explore
export { default as PropertiesScreen } from "./explore/PropertiesScreen";
export { default as PropertyDetailsScreen } from "./explore/PropertyDetailsScreen";
export { default as PropertyMapScreen } from "./explore/PropertyMapScreen";
// export { default as ExplorePropertiesScreen } from './explore/ExplorePropertiesScreen';
// export { default as FilterPropertiesScreen } from './properties/FilterPropertiesScreen';

// Properties
export { default as MyPropertiesScreen } from "./properties/MyPropertiesScreen";
export { default as MyPropertyDetailsScreen } from "./properties/MyPropertyDetailsScreen";
export { default as AddPropertyScreen } from "./properties/AddPropertyScreen";
export { default as EditPropertyScreen } from "./properties/EditPropertyScreen";
// export { default as MyPropertyMapScreen } from './properties/MyPropertyMapScreen';

// Payments
export { default as MakePaymentsScreen } from "./payments/MakePaymentScreen";
export { default as MyPaymentsScreen } from "./payments/MyPaymentsScreen";
export { default as PaymentDetailsScreen } from "./payments/PaymentDetailsScreen";

// const SCREENS = {
//     INTRO: 'INTRO',

//     SPLASH: './splash/SplashScreen.tsx',

//     ON_BOARDING1: './onboarding/OnBoarding1Screen.tsx',
//     ON_BOARDING2: './onboarding/OnBoarding2Screen.tsx',
//     ON_BOARDING3: './onboarding/OnBoarding3Screen.tsx',

//     HOME: './home/HomeScreen.tsx',

//     LOGIN: './auth/LoginScreen.tsx',
//     SIGNUP: './auth/SignupScreen.tsx',
//     FORGOT_PASSWORD: './auth/ForgotPasswordScreen.tsx',
//     RESET_PASSWORD: './auth/ResetPasswordScreen.tsx',
//     CONFIRM_EMAIL: './auth/ConfirmEmailScreen.tsx',

//     PROFILE: './profile/ProfileScreen.tsx',
//     EDIT_PROFILE: './profile/EditProfileScreen.tsx',
//     CHANGE_PASSWORD: './profile/ChangePasswordScreen.tsx',
//     KYC_VERIFICATION: './profile/KYCVerificationScreen.tsx',

//     PROPERTIES: './properties/PropertiesScreen.tsx',
//     EXPLORE_PROPERTIES: './properties/ExplorePropertiesScreen.tsx',
//     FILTER_PROPERTIES: './properties/FilterPropertiesScreen.tsx',
//     MY_PROPERTIES: './properties/MyPropertiesScreen.tsx',
//     ADD_PROPERTY: './properties/AddPropertyScreen.tsx',
//     EDIT_PROPERTY: './properties/EditPropertyScreen.tsx',
//     PROPERTY_DETAILS: './properties/PropertyDetailsScreen.tsx',
//     PROPERTY_MAP: './properties/PropertyMapScreen.tsx',

//     MAKE_PAYMENTS: './make-payments/MakePaymentsScreen.tsx',
//     MY_PAYMENTS: './make-payments/MyPaymentsScreen.tsx',
//     PAYMENT_METHODS: './make-payments/PaymentMethodsScreen.tsx',

// ADD_PROPERTY_OWNER: './profile/AddPropertyOwnerScreen.tsx',
// ADD_PROPERTY_MANAGER: './profile/AddPropertyManagerScreen.tsx',
// ADD_PROPERTY_AGENT: './profile/AddPropertyAgentScreen.tsx',
// ADD_PROPERTY_ADMIN: './profile/AddPropertyAdminScreen.tsx',
// ADD_PROPERTY_USER: './profile/AddPropertyUserScreen.tsx',
// ADD_PROPERTY_GUEST: './profile/AddPropertyGuestScreen.tsx',
// ADD_PROPERTY_HOST: './profile/AddPropertyHostScreen.tsx',

// };

// export default SCREENS;
