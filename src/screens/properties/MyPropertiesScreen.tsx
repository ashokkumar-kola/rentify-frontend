import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyPropertyCard from "../../components/PropertyCards/MyPropertyCard";
import useMyProperties from "../../hooks/userHooks/useMyProperties";
import AppText from "../../components/AppTheme/AppText";
import { Colors, Fonts, Spacing } from "../../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const MyPropertiesScreen: React.FC = ({ navigation }: any) => {
	const { properties, loading, error, refresh } = useMyProperties();

	const handleCreateProperty = () => {
		navigation.navigate("AddProperty"); // Adjust to your route name
	};

	const handleEdit = (id: string) => {
		navigation.navigate("EditProperty", { propertyId: id });
	};

	const handleDetails = (id: string) => {
		console.log("handleDetails property with ID:", id);
		navigation.navigate("MyPropertyDetails", { propertyId: id });
	};

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Header row */}
			<View style={styles.headerRow}>
				<AppText style={styles.countText}>
					You have{" "}
					<AppText style={styles.countNumber}>
						{properties.length}
					</AppText>{" "}
					{properties.length === 1 ? "property" : "properties"}
				</AppText>

				<TouchableOpacity
					style={styles.createButton}
					onPress={handleCreateProperty}
				>
					<FontAwesome name="plus" size={16} color="#fff" />
					<Text style={styles.createButtonText}>Add Property</Text>
				</TouchableOpacity>
			</View>

			{/* No properties */}
			{properties.length === 0 ? (
				<View style={styles.center}>
					<Text style={styles.emptyText}>
						You haven't added any properties yet.
					</Text>
					<TouchableOpacity
						style={styles.createButton}
						onPress={handleCreateProperty}
					>
						<FontAwesome name="plus" size={16} color="#fff" />
						<Text style={styles.createButtonText}>
							Create Your First Property
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={properties}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<MyPropertyCard
							property={{
								...item,
								onPrimaryAction: () => handleEdit(item.id),
								onSecondaryAction: () => handleDetails(item.id),
								primaryLabel: "Edit",
								secondaryLabel: "View Details",
							}}
						/>
					)}
					// ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
					contentContainerStyle={styles.list}
					refreshing={loading}
					onRefresh={refresh}
				/>
			)}
		</View>
	);
};

export default MyPropertiesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white150,
		padding: 16,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	countText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	countNumber: {
		fontSize: 16,
		fontFamily: Fonts.SemiBold,
		color: Colors.primary,
	},
	createButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
	},
	createButtonText: {
		color: "#fff",
		fontWeight: "700",
		marginLeft: 8,
		fontSize: 16,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 12,
	},
	list: {
		paddingBottom: Spacing.base,
	},
});
