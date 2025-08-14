import {
	createNavigationContainerRef,
	NavigationContainerRef,
} from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Optional helpers
export function navigate<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName]
) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
}

export function getCurrentRoute() {
	return navigationRef.getCurrentRoute();
}
