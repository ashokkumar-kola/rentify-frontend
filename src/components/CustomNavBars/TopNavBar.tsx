import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Platform,
	Text,
} from "react-native";
import {
	useNavigation,
	DrawerActions,
	NavigationProp,
} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, Spacing } from "../../constants";
import images from "../../assets/images";
import { RootStackParamList } from "../../navigation/types";

const TopNavBar = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notificationCount] = useState(3);

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem("authToken");
			setIsLoggedIn(!!token);
		};
		checkToken();
	}, []);

	return (
		<View style={styles.navBar}>
			<TouchableOpacity
				style={styles.iconTouchable}
				onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
				accessible
				accessibilityLabel="Open Menu"
			>
				<FontAwesome name="bars" size={24} color={Colors.primary} />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.logoWrapper}
				onPress={() => navigation.navigate("Home" as never)}
				accessible
				accessibilityLabel="Go Home"
			>
				<Image
					source={images.logo}
					style={styles.logo}
					resizeMode="contain"
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.notificationWrapper}
				onPress={() =>
					navigation.navigate(
						isLoggedIn ? "Notifications" : ("AuthStack" as never)
					)
				}
				accessible
				accessibilityLabel={isLoggedIn ? "View Notifications" : "Login"}
			>
				<FontAwesome
					name={isLoggedIn ? "bell" : "user"}
					size={isLoggedIn ? 22 : 18}
					color={Colors.primary}
				/>
				{isLoggedIn && notificationCount > 0 && (
					<View style={styles.notificationBadge}>
						<Text style={styles.notificationText}>
							{notificationCount}
						</Text>
					</View>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default TopNavBar;

const styles = StyleSheet.create({
	navBar: {
		width: "100%",
		height: 52,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: Spacing.lg,
		backgroundColor: "#fff",
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		zIndex: 1000,
		...Platform.select({
			android: { elevation: 6 },
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.15,
				shadowRadius: 4,
			},
		}),
	},
	iconTouchable: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	logoWrapper: {
		flex: 1,
		alignItems: "center",
	},
	logo: {
		width: 130,
		height: 40,
	},
	notificationWrapper: {
		position: "relative",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	notificationBadge: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		width: 18,
		height: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	notificationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
});
