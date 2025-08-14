import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppTheme/AppText";
import { Colors, Spacing, TextSizes } from "../../constants";

interface Notification {
	id: string;
	title: string;
	message: string;
	date: string;
	read: boolean;
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
	return (
		<View style={[styles.container, !notification.read && styles.unread]}>
			<AppText style={styles.title}>{notification.title}</AppText>
			<AppText style={styles.message}>{notification.message}</AppText>
			<AppText style={styles.date}>{notification.date}</AppText>
		</View>
	);
};

export default NotificationItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderRadius: 8,
		padding: Spacing.md,
		marginBottom: Spacing.md,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	unread: {
		borderLeftWidth: 4,
		borderLeftColor: Colors.primary,
	},
	title: {
		fontSize: TextSizes.md,
		fontWeight: "bold",
		marginBottom: 4,
	},
	message: {
		fontSize: TextSizes.sm,
		color: Colors.textGrey,
		marginBottom: 4,
	},
	date: {
		fontSize: TextSizes.xs,
		color: Colors.textGrey,
	},
});
