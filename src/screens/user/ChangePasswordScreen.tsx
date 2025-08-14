import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { api } from "../../api/apiClient"; // your Axios instance
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJwt } from "../../utils/jwt"; // your custom JWT decode util

const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [secureEntry, setSecureEntry] = useState(true);
	const [loading, setLoading] = useState(false);

	const toggleSecureEntry = () => setSecureEntry((prev) => !prev);

	const handleChangePassword = async () => {
		if (!currentPassword || !newPassword || !confirmPassword) {
			Alert.alert("Error", "All fields are required.");
			return;
		}

		if (newPassword.length < 6) {
			Alert.alert(
				"Error",
				"Password must be at least 6 characters long."
			);
			return;
		}

		if (newPassword !== confirmPassword) {
			Alert.alert("Error", "New passwords do not match.");
			return;
		}

		try {
			setLoading(true);
			const token = await AsyncStorage.getItem("authToken");
			if (!token) {
				throw new Error("User not authenticated.");
			}

			const decoded = decodeJwt(token);
			const userId = decoded?.id;

			const res = await api.put(`/users/change-password/${userId}`, {
				current_password: currentPassword,
				new_password: newPassword,
			});

			if (res.data.success) {
				Alert.alert("Success", "Password updated successfully");
				setCurrentPassword("");
				setNewPassword("");
				setConfirmPassword("");
			} else {
				Alert.alert(
					"Error",
					res.data.message || "Failed to update password"
				);
			}
		} catch (err: any) {
			console.error(err);
			Alert.alert(
				"Error",
				err.response?.data?.message || "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Change Password</Text>

			<Text style={styles.label}>Current Password</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={currentPassword}
					onChangeText={setCurrentPassword}
					placeholder="Enter current password"
					secureTextEntry={secureEntry}
					style={styles.input}
				/>
				<TouchableOpacity onPress={toggleSecureEntry}>
					<Icon
						name={secureEntry ? "eye-off" : "eye"}
						size={20}
						color="#888"
					/>
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>New Password</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={newPassword}
					onChangeText={setNewPassword}
					placeholder="Enter new password"
					secureTextEntry={secureEntry}
					style={styles.input}
				/>
				<TouchableOpacity onPress={toggleSecureEntry}>
					<Icon
						name={secureEntry ? "eye-off" : "eye"}
						size={20}
						color="#888"
					/>
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>Confirm New Password</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					placeholder="Confirm new password"
					secureTextEntry={secureEntry}
					style={styles.input}
				/>
				<TouchableOpacity onPress={toggleSecureEntry}>
					<Icon
						name={secureEntry ? "eye-off" : "eye"}
						size={20}
						color="#888"
					/>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={handleChangePassword}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Update Password</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default ChangePassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 24,
		color: "#333",
	},
	label: {
		marginTop: 12,
		fontSize: 14,
		color: "#555",
		marginBottom: 4,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#ccc",
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 8,
		backgroundColor: "#f9f9f9",
	},
	input: {
		flex: 1,
		height: 45,
		fontSize: 14,
	},
	button: {
		marginTop: 24,
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		borderRadius: 10,
		alignItems: "center",
		elevation: 2,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
