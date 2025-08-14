export function goToPropertyDetails(propertyId: string) {
	if (!navigationRef.isReady()) {
		return;
	}

	navigationRef.navigate("AppDrawer", {
		screen: "MainTabs",
		params: {
			screen: "ExploreStack",
			params: {
				screen: "PropertyDetails",
				params: {
					propertyId,
				},
			},
		},
	});
}

// import { goToPropertyDetails } from '../navigation/NavigationHelpers';

// goToPropertyDetails('abc123');
