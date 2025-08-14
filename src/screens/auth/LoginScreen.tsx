import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants';
import Icons from '../../constants/Icons';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import styles from './styles';

import FormInput from '../../components/CustomForms/FormInput';
import FormButton from '../../components/CustomForms/FormButton';
import ToggleSwitch from '../../components/CustomButtons/ToggleSwitch';

import CustomAlert from '../../components/Common/CustomAlert';

import useLogin from '../../hooks/authHooks/useLogin';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		errors,
		loading,
		passwordVisible,
		setPasswordVisible,
		alertVisible,
		setAlertVisible,
		alertMessage,
		handleLogin,
	} = useLogin();

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					style={styles.wrapper}
				>
					{/* Header */}
					<View style={styles.logoContainer}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => navigation.navigate('AppDrawer')}
						>
							<Icons.MI
								name="arrow-back"
								size={36}
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

					{/* Card */}
					<View style={styles.card}>
						<Text style={styles.welcome}>Welcome back!</Text>
						<Text style={styles.subText}>
							Log in and unlock your dream home.
						</Text>

						<FormInput
							iconName="envelope"
							placeholder="Enter email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
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
									? 'visibility-off'
									: 'visibility'
							}
							onRightIconPress={() =>
								setPasswordVisible(!passwordVisible)
							}
							error={errors.password}
						/>

						<TouchableOpacity
							style={styles.forgotContainer}
							onPress={() =>
								navigation.navigate('ForgotPassword')
							}
						>
							<Text style={styles.forgotText}>
								Forgot Password?
							</Text>
						</TouchableOpacity>

						<FormButton
							title="Sign in"
							onPress={handleLogin}
							loading={loading}
							style={{ marginTop: 24 }}
						/>

						<View style={styles.divider}>
							<View style={styles.line} />
						</View>

						<View style={styles.signContainer}>
							<View style={styles.signTextContainer}>
								<Text style={styles.signText}>
									Don't have an account?{' '}
								</Text>
								<Text
									style={styles.signLink}
									onPress={() =>
										navigation.navigate('Register')
									}
								>
									Sign up here
								</Text>
							</View>
							<ToggleSwitch />
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>

			<CustomAlert
				visible={alertVisible}
				title="Login Error"
				message={alertMessage}
				statusIcon="cancel"
				statusIconColor={Colors.error}
				confirmText="Try Again"
				onConfirm={() => setAlertVisible(false)}
				onClose={() => setAlertVisible(false)}
			/>
		</SafeAreaView>
	);
};

export default LoginScreen;
