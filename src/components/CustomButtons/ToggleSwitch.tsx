import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ToggleSwitch = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const slideAnim = useState(
		new Animated.Value(route.name === "Login" ? 1 : 0)
	)[0];

	const left = slideAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "50%"],
	});

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: route.name === "Login" ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [route.name, slideAnim]);

	const handlePress = (type: "Login" | "Register") => {
		if (route.name !== type) {
			navigation.navigate(type as never);
		}
	};

	return (
		<View style={styles.toggleContainer}>
			<Animated.View style={[styles.slider, { left }]} />
			<Pressable
				style={styles.buttonHalf}
				onPress={() => handlePress("Register")}
			>
				<Text
					style={[
						styles.buttonText,
						route.name === "Register" && styles.activeText,
					]}
				>
					Register
				</Text>
			</Pressable>
			<Pressable
				style={styles.buttonHalf}
				onPress={() => handlePress("Login")}
			>
				<Text
					style={[
						styles.buttonText,
						route.name === "Login" && styles.activeText,
					]}
				>
					Login
				</Text>
			</Pressable>
		</View>
	);
};

export default ToggleSwitch;

const styles = StyleSheet.create({
	toggleContainer: {
		flexDirection: "row",
		width: 280,
		maxWidth: "90%",
		height: 50,
		// marginTop: 16,
		borderRadius: 25,
		backgroundColor: "#dce1ea",
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#bbb",
		// position: 'absolute',
		// bottom: 32,
		alignSelf: "center",
		// marginTop: 40,
	},
	buttonHalf: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2,
	},
	buttonText: {
		fontSize: 16,
		color: "#333",
		fontWeight: "600",
		fontFamily: "Poppins-SemiBold",
	},
	activeText: {
		color: "#fff",
	},
	slider: {
		position: "absolute",
		top: 0,
		bottom: 0,
		width: "50%",
		backgroundColor: "#1d4ed8",
		borderRadius: 25,
		zIndex: 1,
	},
});
