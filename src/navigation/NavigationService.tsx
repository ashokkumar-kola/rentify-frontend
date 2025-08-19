import {
	createNavigationContainerRef,
	// NavigationContainerRef,
} from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName]
) {
	if (navigationRef.isReady()) {
		if (params !== undefined) {
			navigationRef.navigate(name as any, params as any);
		} else {
			navigationRef.navigate(name as any);
		}
	}
}

export function getCurrentRoute() {
	return navigationRef.getCurrentRoute();
}
