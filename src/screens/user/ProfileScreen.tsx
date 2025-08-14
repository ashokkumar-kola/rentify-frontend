import React, { useEffect, useState, useCallback } from "react";

import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	Modal,
	TextInput,
	Dimensions,
	SafeAreaView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../../api/apiClient";
import images from "../../assets/images";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

// const defaultProfileImg = require('../../assets/images/');
import { decodeJwt } from "../../utils/jwt";
import { Colors } from "../../constants";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [otpModalVisible, setOtpModalVisible] = useState(false);
	const [otpType, setOtpType] = useState<"email" | "phone" | null>(null);
	const [otpValue, setOtpValue] = useState("");

	useEffect(() => {
		fetchUserData();
	}, []);

	const fetchUserData = async () => {
		try {
			const userToken = await AsyncStorage.getItem("authToken");
			if (!userToken) {
				return;
			}

			const decodedUser = decodeJwt(userToken);

			const response = await api.get(`/users/${decodedUser.id}`);
			console.log(response.data.success);

			if (response.data.success) {
				setUser(response.data.data);
				console.log("User data fetched:", response.data.data);
			} else {
				Alert.alert(
					"Error",
					response.data.message || "Failed to fetch user data"
				);
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			Alert.alert("Error", "Could not load user data");
		} finally {
			setLoading(false);
		}
	};

	const handleVerify = async (type: "email" | "phone") => {
		try {
			const endpoint =
				type === "email"
					? `/auth/forgot-password/${user._id}`
					: `/auth/verify-phone/${user._id}`;
			const res = await api.post(endpoint);

			if (res.data.success) {
				setOtpType(type);
				setOtpModalVisible(true);
				Alert.alert("OTP Sent", `An OTP has been sent to your ${type}`);
			} else {
				Alert.alert(
					"Failed",
					res.data.message || "Verification failed"
				);
			}
		} catch (err) {
			console.error(err);
			Alert.alert("Error", "Verification request failed");
		}
	};

	const handleValidateOtp = async () => {
		if (!otpValue) {
			return Alert.alert("Missing OTP", "Please enter the OTP");
		}

		try {
			const endpoint =
				otpType === "email"
					? "/auth/verify-email"
					: "/auth/verify-phone";
			const res = await api.post(endpoint, {
				email: user.email,
				otp: otpValue,
			});

			if (res.data.success) {
				Alert.alert("Success", `${otpType} verified successfully`);
				setOtpModalVisible(false);
				setOtpValue("");
				fetchUserData();
			} else {
				Alert.alert("Invalid OTP", res.data.message);
			}
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "OTP validation failed");
		}
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("authToken");
		navigation.reset({ index: 0, routes: [{ name: "Login" }] });
	};

	const handleDeleteAccount = async () => {
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account? This action is irreversible.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							const res = await api.delete(`/users/${user._id}`);
							if (res.data.success) {
								await AsyncStorage.removeItem("authToken");
								navigation.reset({
									index: 0,
									routes: [{ name: "Login" }],
								});
							} else {
								Alert.alert("Failed", res.data.message);
							}
						} catch (err) {
							console.error(err);
							Alert.alert("Error", "Failed to delete account");
						}
					},
				},
			],
			{ cancelable: true }
		);
	};

	if (loading) {
		return (
			<ActivityIndicator
				style={{ flex: 1 }}
				size="large"
				color={Colors.primary}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.profileHeader}>
				<Image
					source={images.defaultProfileImg}
					style={styles.avatar}
				/>
				<TouchableOpacity
					style={styles.editIcon}
					onPress={() => navigation.navigate("EditProfile")}
				>
					<FontAwesome name="pencil" size={16} color="#fff" />
				</TouchableOpacity>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>
						{user?.full_name || "User Name"}
					</Text>
					{user?.verified && <VerifiedBadge />}
				</View>
				<View style={styles.roleContainer}>
					<Text style={styles.role}>{user?.role || "User"}</Text>
					{/* {user?.verified && <VerifiedBadge />} */}
				</View>
			</View>

			<View style={styles.verificationContainer}>
				<VerifyRow
					label={user?.email}
					type="email"
					isVerified={user?.is_email_verified}
					onVerify={() => handleVerify("email")}
				/>

				<VerifyRow
					label={user?.phone_no}
					type="phone"
					isVerified={user?.is_phone_verified}
					onVerify={() => handleVerify("phone")}
					onAdd={() => navigation.navigate("EditProfile")}
				/>
			</View>

			<View style={styles.menu}>
				<MenuItem
					icon="user"
					label="Edit Profile"
					onPress={() => navigation.navigate("EditProfile")}
				/>
				<MenuItem
					icon="lock"
					label="Change Password"
					onPress={() => navigation.navigate("ChangePassword")}
				/>
				<MenuItem
					icon="trash"
					label="Delete Account"
					color="red"
					onPress={handleDeleteAccount}
				/>
				<MenuItem
					icon="sign-out"
					label="Logout"
					color="#e11d48"
					onPress={handleLogout}
				/>
			</View>

			{/* <Modal visible={otpModalVisible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter OTP</Text>
                    <TextInput
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={6}
                        value={otpValue}
                        onChangeText={setOtpValue}
                        placeholder="Enter 6-digit OTP"
                    />
                    <TouchableOpacity style={styles.modalButton} onPress={handleValidateOtp}>
                        <Text style={styles.modalButtonText}>Validate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOtpModalVisible(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> */}

			{otpModalVisible && (
				<Modal
					visible={otpModalVisible}
					animationType="fade"
					transparent
				>
					<View style={styles.modalOverlay}>
						<View style={styles.modalCard}>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setOtpModalVisible(false)}
							>
								<FontAwesome
									name="close"
									size={24}
									color="#333"
									style={{ alignSelf: "flex-end" }}
								/>
							</TouchableOpacity>

							<Text style={styles.modalTitle}>
								Gmail Verification
							</Text>
							<Text style={styles.modalSubtitle}>
								Enter the 6-digit verification code that was
								sent to your email.
							</Text>

							<TextInput
								style={styles.otpInput}
								keyboardType="number-pad"
								maxLength={6}
								value={otpValue}
								onChangeText={setOtpValue}
								placeholder="Enter 6-digit OTP"
							/>

							{/* <View style={styles.otpInputContainer}>
                        {[...Array(6)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpBox}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={otpValue[index] || ''}
                            onChangeText={(text) => {
                            const updated = otpValue.split('');
                            updated[index] = text;
                            setOtpValue(updated.join(''));
                            }}
                        />
                        ))}
                    </View> */}

							<TouchableOpacity
								style={styles.verifyModelButton}
								onPress={handleValidateOtp}
							>
								<Text style={styles.verifyButtonText}>
									Verify Account
								</Text>
							</TouchableOpacity>

							<Text style={styles.resendText}>
								Didn't receive code?{" "}
								<Text
									style={styles.resendLink}
									onPress={() =>
										handleVerify(otpType || "email")
									}
								>
									Resend
								</Text>
							</Text>
						</View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
};

const VerifiedBadge = () => (
	<View style={styles.verifiedBadge}>
		<FontAwesome name="check-circle" size={14} color="#10b981" />
		<Text style={styles.verifiedText}>Verified</Text>
	</View>
);

const VerifyRow = ({
	label,
	isVerified,
	type,
	onVerify,
	onAdd,
}: {
	label: string;
	isVerified?: boolean;
	type: "email" | "phone";
	onVerify: () => void;
	onAdd?: () => void;
}) => (
	<View style={styles.verifyRow}>
		<Text style={styles.email}>{label || `No ${type}`}</Text>
		{isVerified ? (
			<VerifiedBadge />
		) : label ? (
			<TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
				<Text style={styles.verifyText}>Verify</Text>
			</TouchableOpacity>
		) : (
			<TouchableOpacity style={styles.verifyButton} onPress={onAdd}>
				<Text style={styles.verifyText}>Add</Text>
			</TouchableOpacity>
		)}
	</View>
);

const MenuItem = ({
	icon,
	label,
	color = "#333",
	onPress,
}: {
	icon: string;
	label: string;
	color?: string;
	onPress: () => void;
}) => (
	<TouchableOpacity style={styles.menuItem} onPress={onPress}>
		<FontAwesome
			name={icon}
			size={20}
			color={color}
			style={{ width: 25 }}
		/>
		<Text style={[styles.menuText, { color }]}>{label}</Text>
		<FontAwesome
			name="angle-right"
			size={20}
			color="#aaa"
			style={{ marginLeft: "auto" }}
		/>
	</TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f1f5f9",
	},
	profileHeader: {
		alignItems: "center",
		paddingVertical: 30,
		backgroundColor: "#fff",
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		marginBottom: 20,
	},
	avatar: {
		width: width * 0.24,
		height: width * 0.24,
		borderRadius: width * 0.12,
	},
	editIcon: {
		position: "absolute",
		right: width * 0.34,
		top: width * 0.2,
		backgroundColor: "#2563eb",
		padding: 6,
		borderRadius: 20,
		elevation: 2,
	},
	nameContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 12,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 8,
		color: "#1e293b",
	},
	verifiedBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#d1fae5",
		borderRadius: 6,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	verifiedText: {
		fontSize: 12,
		color: "#059669",
		marginLeft: 4,
	},
	verificationContainer: {
		marginHorizontal: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 14,
		elevation: 2,
	},
	verifyRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#e2e8f0",
	},
	email: {
		fontSize: 15,
		color: "#334155",
		maxWidth: "70%",
	},
	verifyButton: {
		backgroundColor: "#2563eb",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
	},
	verifyText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14,
	},
	menu: {
		marginHorizontal: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingVertical: 10,
		elevation: 2,
		marginTop: 24,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#e2e8f0",
	},
	menuText: {
		fontSize: 16,
		marginLeft: 15,
	},

	// MODAL STYLES
	// modalOverlay: {
	//     flex: 1,
	//     backgroundColor: 'rgba(0,0,0,0.5)',
	//     justifyContent: 'center',
	//     alignItems: 'center',
	// },
	// modalContent: {
	//     width: '80%',
	//     backgroundColor: '#fff',
	//     borderRadius: 12,
	//     padding: 20,
	//     alignItems: 'center',
	//     elevation: 5,
	// },
	// modalTitle: {
	//     fontSize: 18,
	//     fontWeight: 'bold',
	//     marginBottom: 12,
	// },
	otpInput: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#cbd5e1",
		borderRadius: 8,
		padding: 10,
		textAlign: "center",
		marginBottom: 12,
		fontSize: 16,
		letterSpacing: 4,
	},
	// modalButton: {
	//     backgroundColor: '#2563eb',
	//     paddingVertical: 10,
	//     paddingHorizontal: 20,
	//     borderRadius: 8,
	// },
	// modalButtonText: {
	//     color: '#fff',
	//     fontWeight: 'bold',
	// },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalCard: {
		width: "85%",
		backgroundColor: "#fff",
		borderRadius: 16,
		paddingVertical: 30,
		paddingHorizontal: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 8,
	},
	closeButton: {
		position: "absolute",
		top: 5,
		right: 10,
		zIndex: 1,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	modalSubtitle: {
		fontSize: 14,
		color: "#6b7280",
		textAlign: "center",
		marginBottom: 24,
		lineHeight: 20,
	},
	otpInputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
		marginBottom: 24,
	},
	otpBox: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#cbd5e1",
		borderRadius: 8,
		textAlign: "center",
		fontSize: 20,
		color: "#111827",
		backgroundColor: "#f9fafb",
	},
	verifyModelButton: {
		backgroundColor: "#6366f1",
		paddingVertical: 14,
		borderRadius: 10,
		width: "100%",
		alignItems: "center",
		marginBottom: 16,
	},
	verifyButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	resendText: {
		fontSize: 13,
		color: "#6b7280",
		textAlign: "center",
	},
	resendLink: {
		color: "#6366f1",
		fontWeight: "600",
		textDecorationLine: "underline",
	},
});
