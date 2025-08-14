import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AppText from "../../components/AppTheme/AppText";
import styles from "./styles";

import { Colors } from "../../constants";
import images from "../../assets/images";

import FormInput from "../../components/CustomForms/FormInput";
import FormButton from "../../components/CustomForms/FormButton";
import ToggleSwitch from "../../components/CustomButtons/ToggleSwitch";
import CustomAlert from "../../components/Common/CustomAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";

import useRegister from "../../hooks/authHooks/useRegister";

type RegisterScreenProps = NativeStackScreenProps<
	AuthStackParamList,
	"Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const {
		fullName,
		setFullName,
		email,
		setEmail,
		password,
		setPassword,
		errors,
		loading,
		alertVisible,
		alertTitle,
		alertMessage,
		setAlertVisible,
		handleRegister,
	} = useRegister();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={styles.wrapper}
				>
					<View style={styles.logoContainer}>
						<MaterialIcons
							name="arrow-back"
							size={36}
							color={Colors.primary}
							style={styles.backButton}
							onPress={() => navigation.navigate("AppDrawer")}
						/>
						<Image
							source={images.logo}
							style={styles.logo}
							resizeMode="contain"
						/>
						<Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
					</View>

					<>
						<View style={styles.card}>
							<Text style={styles.welcome}>Welcome!</Text>
							<Text style={styles.subText}>
								Sign up and create your dream home.
							</Text>

							<FormInput
								iconName="user"
								iconSize={32}
								placeholder="Enter fullname"
								value={fullName}
								onChangeText={setFullName}
								error={errors.fullName}
							/>

							<FormInput
								iconName="envelope"
								placeholder="Enter email"
								keyboardType="email-address"
								value={email}
								onChangeText={setEmail}
								error={errors.email}
							/>

							<FormInput
								iconName="lock"
								iconSize={32}
								placeholder="Enter password"
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!passwordVisible}
								rightIcon={
									passwordVisible
										? "visibility-off"
										: "visibility"
								}
								onRightIconPress={() =>
									setPasswordVisible(!passwordVisible)
								}
								error={errors.password}
							/>

							<FormButton
								title="Sign up"
								onPress={() => handleRegister(navigation)}
								loading={loading}
								style={{ marginTop: 24 }}
							/>

							<View style={styles.divider}>
								<View style={styles.line} />
							</View>

							<View style={styles.signContainer}>
								<View style={styles.signTextContainer}>
									<Text style={styles.signText}>
										Already have an account?{" "}
									</Text>
									<Text
										style={styles.signLink}
										onPress={() =>
											navigation.navigate("Login")
										}
									>
										Sign in here
									</Text>
								</View>
								<ToggleSwitch />
							</View>
						</View>
					</>

					<CustomAlert
						visible={alertVisible}
						title={alertTitle}
						message={alertMessage}
						confirmText="Continue to Login"
						onConfirm={() => {
							setAlertVisible(false);
							navigation.navigate("Login");
						}}
						onClose={() => setAlertVisible(false)}
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RegisterScreen;
