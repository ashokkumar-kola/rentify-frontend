// screens/auth/ForgotPasswordScreen.tsx
import React, { useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";
import useForgotPassword from "../../hooks/authHooks/useForgotPassword";

import AppText from "../../components/AppTheme/AppText";
import { Colors } from "../../constants";
import Icons from "../../constants/Icons";
import images from "../../assets/images";
import styles from "./styles";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
	const {
		email,
		setEmail,
		error,
		loading,
		message,
		setMessage,
		handleForgotPassword,
	} = useForgotPassword();

	const handleSendCode = async () => {
		const result = await handleForgotPassword();
		if (result.success) {
			navigation.navigate("ConfirmEmail", { email });
		} else if (message) {
			Alert.alert("Error", message, [
				{ text: "OK", onPress: () => setMessage("") },
			]);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={styles.wrapper}>
				<View style={styles.logoContainer}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={styles.backButton}
					>
						<Icons.MI
							name="arrow-back"
							size={28}
							color={Colors.primary}
						/>
					</TouchableOpacity>
					<Image
						source={images.logo}
						style={styles.logo}
						resizeMode="contain"
					/>
					<Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
				</View>

				<View style={styles.logoContainer}>
					<Text style={styles.tagline}>Forgot Password</Text>
				</View>

				<View style={styles.card}>
					<AppText style={styles.welcome}>Verify Email</AppText>
					<Text style={styles.subText}>
						Enter your email and we’ll send you a 6-digit
						verification code.
					</Text>

					<View style={styles.inputContainer}>
						<TextInput
							style={[
								styles.input,
								error ? { borderColor: Colors.error } : {},
							]}
							placeholder="Enter email"
							placeholderTextColor={Colors.grey200}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
						/>
						{error ? (
							<Text style={styles.errorText}>{error}</Text>
						) : null}
					</View>

					<TouchableOpacity
						style={styles.sendCodeButton}
						onPress={handleSendCode}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color={Colors.primary} />
						) : (
							<Text style={styles.sendCodeButtonText}>
								Send Code
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default ForgotPasswordScreen;
