import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AppText from "../AppTheme/AppText";
import { Colors, TextSizes } from "../../constants";
import images from "../../assets/images";

type Props = {
	onPress: () => void;
};

const ExploreMorePropertiesCard: React.FC<Props> = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<Image source={images.defaultHouse} style={styles.image} />
			<View style={styles.textContainer}>
				<AppText weight="SemiBold" style={styles.title}>
					Explore More Properties
				</AppText>
				<AppText style={styles.subtitle}>
					Find homes that suit your lifestyle
				</AppText>
			</View>
		</TouchableOpacity>
	);
};

export default ExploreMorePropertiesCard;

const styles = StyleSheet.create({
	card: {
		width: "90%",
		height: 180,
		backgroundColor: Colors.white,
		borderRadius: 16,
		overflow: "hidden",
		elevation: 4,
		alignSelf: "center",
		marginTop: 16,
		marginBottom: 16,
	},
	image: {
		width: "100%",
		height: "60%",
		resizeMode: "cover",
	},
	textContainer: {
		padding: 12,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: TextSizes.base,
		// fontWeight: 'bold',
		color: Colors.primary,
	},
	subtitle: {
		fontSize: TextSizes.md,
		color: "#666",
		marginTop: 4,
	},
});
