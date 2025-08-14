import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Animated,
	// Text,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors, Spacing, TextSizes } from "../../constants";
import images from "../../assets/images";
import AppText from "../../components/AppTheme/AppText";
import SearchBar from "../Common/SearchBar";

const Banner = () => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [slideAnim] = useState(new Animated.Value(20));

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}),
		]).start();
	}, [fadeAnim, slideAnim]);

	return (
		<ImageBackground
			source={images.banner}
			style={styles.bannerImage}
			resizeMode="cover"
		>
			{/* <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0)']} style={styles.overlay} /> */}
			<Animated.View
				style={[
					styles.contentWrapper,
					{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }],
					},
				]}
			>
				<View style={styles.sloganWrapper}>
					<FontAwesome
						name="quote-left"
						size={14}
						color={Colors.white200}
					/>
					<AppText style={styles.sloganText}>
						Find Your Space. Live Your Dream.
					</AppText>
					<FontAwesome
						name="quote-right"
						size={14}
						color={Colors.white200}
					/>
				</View>

				<SearchBar />
			</Animated.View>
		</ImageBackground>
	);
};

export default Banner;

const styles = StyleSheet.create({
	bannerImage: {
		width: "100%",
		height: 260,
		position: "relative",
		// top: 0,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	contentWrapper: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: Spacing.xl,
	},
	sloganWrapper: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 6,
		marginBottom: Spacing.lg,
		backgroundColor: "rgba(0,0,0,0.6)",
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		borderRadius: 12,
	},
	sloganText: {
		fontSize: TextSizes.base,
		fontWeight: "600",
		color: Colors.textWhite,
		textAlign: "center",
	},
});
