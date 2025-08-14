import React, { useEffect } from "react";
import {
	View,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	StyleSheet,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Asset } from "react-native-image-picker";
import useEditProperty from "../../hooks/propertyHooks/useEditProperty";
import type { MyPropertiesStackParamList } from "../../navigation/types";

type EditPropertyRouteProp = RouteProp<
	MyPropertiesStackParamList,
	"EditProperty"
>;

const EditPropertyScreen: React.FC = () => {
	const navigation = useNavigation();
	const route = useRoute<EditPropertyRouteProp>();
	const { propertyId } = route.params;

	const {
		data,
		errors,
		loading,
		handleChange,
		handleEditProperty,
		// fetchPropertyDetails,
	} = useEditProperty(propertyId);

	// useEffect(() => {
	//   fetchPropertyDetails();
	// }, [propertyId]);

	const onSubmit = async () => {
		const res = await handleEditProperty();
		if (res.success) {
			Alert.alert("Success", "Property updated successfully!", [
				{ text: "OK", onPress: () => navigation.goBack() },
			]);
		} else {
			Alert.alert("Error", res.message || "Failed to update property");
		}
	};

	return (
		<ScrollView
			style={styles.container}
			keyboardShouldPersistTaps="handled"
		>
			<Text style={styles.heading}>Edit Property</Text>

			{/* Title */}
			<TextInput
				style={[styles.input, errors.title && styles.inputError]}
				placeholder="Property Title"
				value={data.title}
				onChangeText={(val) => handleChange("title", val)}
			/>
			{errors.title && <Text style={styles.error}>{errors.title}</Text>}

			{/* Price */}
			<TextInput
				style={[styles.input, errors.price && styles.inputError]}
				placeholder="Price"
				keyboardType="numeric"
				value={String(data.price || "")}
				onChangeText={(val) => handleChange("price", Number(val))}
			/>
			{errors.price && <Text style={styles.error}>{errors.price}</Text>}

			{/* Deposit */}
			<TextInput
				style={[styles.input, errors.deposit && styles.inputError]}
				placeholder="Deposit"
				keyboardType="numeric"
				value={String(data.deposit || "")}
				onChangeText={(val) => handleChange("deposit", Number(val))}
			/>
			{errors.deposit && (
				<Text style={styles.error}>{errors.deposit}</Text>
			)}

			{/* Bedrooms */}
			<TextInput
				style={[styles.input, errors.bedrooms && styles.inputError]}
				placeholder="Bedrooms"
				keyboardType="numeric"
				value={String(data.bedrooms || "")}
				onChangeText={(val) => handleChange("bedrooms", Number(val))}
			/>
			{errors.bedrooms && (
				<Text style={styles.error}>{errors.bedrooms}</Text>
			)}

			{/* Bathrooms */}
			<TextInput
				style={[styles.input, errors.bathrooms && styles.inputError]}
				placeholder="Bathrooms"
				keyboardType="numeric"
				value={String(data.bathrooms || "")}
				onChangeText={(val) => handleChange("bathrooms", Number(val))}
			/>
			{errors.bathrooms && (
				<Text style={styles.error}>{errors.bathrooms}</Text>
			)}

			{/* TODO: Add your image picker & amenities selector components here */}

			{/* Submit Button */}
			<TouchableOpacity
				style={styles.button}
				onPress={onSubmit}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Update Property</Text>
				)}
			</TouchableOpacity>
		</ScrollView>
	);
};

export default EditPropertyScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	heading: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
	},
	inputError: {
		borderColor: "red",
	},
	error: {
		fontSize: 12,
		color: "red",
		marginBottom: 8,
	},
	button: {
		backgroundColor: "#007BFF",
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginTop: 16,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
