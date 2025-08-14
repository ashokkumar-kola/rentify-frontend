import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { AllRoutes, NavigateToParams, RootStackParamList } from "./types";

type AppNavigationProp = NavigationProp<RootStackParamList>;

const stackHierarchy: Record<string, string[]> = {
	OnboardingStack: ["Onboarding1", "Onboarding2", "Onboarding3"],
	AuthStack: [
		"Login",
		"Register",
		"ForgotPassword",
		"ConfirmEmail",
		"ResetPassword",
	],
	AppDrawer: ["MainTabs", "Settings", "SupportStack"],
	MainTabs: [
		"HomeStack",
		"ExploreStack",
		"MyProperties",
		"Wishlist",
		"ProfileStack",
	],
	HomeStack: ["Home", "Notifications"],
	ExploreStack: [
		"Properties",
		"Filters",
		"PropertyDetails",
		"PropertyMapView",
	],
	ProfileStack: [
		"Profile",
		"EditProfile",
		"ChangePassword",
		"KYCVerification",
		"MyPropertiesStack",
		"MyRentalsStack",
		"PaymentsStack",
	],
	AdminStack: [
		"AdminDashboard",
		"UserManagement",
		"UserDetail",
		"ReportedProperties",
	],
	MyPropertiesStack: [
		"MyProperties",
		"AddProperty",
		"EditProperty",
		"PropertyApplications",
	],
	MyRentalsStack: ["MyRentals", "MyRentalApplications", "ApplicationDetails"],
	PaymentsStack: ["MyPayments", "PaymentDetails"],
};

export const useAppNavigation = () => {
	const navigation = useNavigation<AppNavigationProp>();

	const navigateTo = <T extends AllRoutes>(
		screen: T,
		params?: NavigateToParams<T>
	) => {
		const findStack = (targetScreen: string): string | null => {
			for (const [stack, screens] of Object.entries(stackHierarchy)) {
				if (screens.includes(targetScreen)) {
					return stack;
				}
			}
			return null;
		};

		const targetStack = findStack(screen);

		if (!targetStack) {
			navigation.navigate(
				screen as keyof RootStackParamList,
				params as any
			);
			return;
		}

		switch (targetStack) {
			case "OnboardingStack":
				navigation.navigate("OnboardingStack", { screen, params });
				break;
			case "AuthStack":
				navigation.navigate("AuthStack", { screen, params });
				break;
			case "AdminStack":
				navigation.navigate("AdminStack", { screen, params });
				break;
			case "AppDrawer":
				if (screen === "Settings" || screen === "SupportStack") {
					navigation.navigate("AppDrawer", { screen, params });
				} else if (stackHierarchy.MainTabs.includes(screen)) {
					navigation.navigate("AppDrawer", {
						screen: "MainTabs",
						params: { screen, params },
					});
				} else if (stackHierarchy.HomeStack.includes(screen)) {
					navigation.navigate("AppDrawer", {
						screen: "MainTabs",
						params: {
							screen: "HomeStack",
							params: { screen, params },
						},
					});
				} else if (stackHierarchy.ExploreStack.includes(screen)) {
					navigation.navigate("AppDrawer", {
						screen: "MainTabs",
						params: {
							screen: "ExploreStack",
							params: { screen, params },
						},
					});
				} else if (stackHierarchy.ProfileStack.includes(screen)) {
					navigation.navigate("AppDrawer", {
						screen: "MainTabs",
						params: {
							screen: "ProfileStack",
							params: { screen, params },
						},
					});
				} else if (
					stackHierarchy.MyPropertiesStack.includes(screen) ||
					stackHierarchy.MyRentalsStack.includes(screen) ||
					stackHierarchy.PaymentsStack.includes(screen)
				) {
					const subStack = stackHierarchy.MyPropertiesStack.includes(
						screen
					)
						? "MyPropertiesStack"
						: stackHierarchy.MyRentalsStack.includes(screen)
						? "MyRentalsStack"
						: "PaymentsStack";
					navigation.navigate("AppDrawer", {
						screen: "MainTabs",
						params: {
							screen: "ProfileStack",
							params: {
								screen: subStack,
								params: { screen, params },
							},
						},
					});
				}
				break;
			default:
				navigation.navigate(
					screen as keyof RootStackParamList,
					params as any
				);
		}
	};

	return { navigateTo };
};

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
