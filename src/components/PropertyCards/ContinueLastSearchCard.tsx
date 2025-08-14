import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Colors, TextSizes, Spacing, Fonts } from "../../constants";
import Icons from "../../constants/Icons";

interface Props {
	userEmail?: string;
	onPress: () => void;
}

const ContinueLastSearchCard: React.FC<Props> = ({ userEmail, onPress }) => {
	const username = userEmail?.split("@")[0];

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<View style={styles.row}>
				<Icons.FA name="history" size={24} color={Colors.primary} />
				<View style={styles.textContainer}>
					<Text style={styles.greeting}>Hey {username},</Text>
					<Text style={styles.subText}>
						Continue your last search
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ContinueLastSearchCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.white100,
		borderRadius: 16,
		padding: 16,
		marginHorizontal: Spacing.lg,
		marginTop: Spacing.base,
		marginBottom: Spacing.base,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		marginLeft: 12,
	},
	greeting: {
		fontSize: TextSizes.base,
		fontFamily: Fonts.SemiBold,
		color: Colors.black100,
	},
	subText: {
		fontSize: TextSizes.sm,
		color: Colors.textGrey,
		fontFamily: Fonts.Regular,
	},
});
