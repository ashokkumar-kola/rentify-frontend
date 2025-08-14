import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants";
import Icons from "../../constants/Icons";

interface Tag {
	label: string;
	color?: string;
	icon: string;
}

const LabelTag: React.FC<Tag> = ({ label, color = Colors.primary, icon }) => (
	<View style={[styles.labelTag, { backgroundColor: color }]}>
		<Icons.FA
			name={icon}
			size={10}
			color={Colors.white100}
			style={styles.tagIcon}
		/>
		<Text style={styles.labelTagText}>{label}</Text>
	</View>
);

export default LabelTag;

const styles = StyleSheet.create({
	labelTag: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	tagIcon: {
		marginRight: 6,
	},
	labelTagText: {
		color: Colors.white100,
		fontSize: 12,
		fontWeight: "500",
	},
});
