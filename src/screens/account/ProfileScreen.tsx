import React, { useEffect, useState, useCallback } from 'react';
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
	ScrollView,
	Animated,
	StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/apiClient';

import images from '../../assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants';
import { LinearGradient } from 'react-native-linear-gradient';
import { Screen } from 'react-native-screens';
import { useNavigationHelper } from '../../navigation/navigationHelper';

const { width } = Dimensions.get('window');

// Custom Hooks
const useOTPVerification = () => {
	const [otpModalVisible, setOtpModalVisible] = useState(false);
	const [otpType, setOtpType] = useState<'email' | 'phone' | null>(null);
	const [otpValue, setOtpValue] = useState('');
	const [loading, setLoading] = useState(false);

	const resetOTP = useCallback(() => {
		setOtpValue('');
		setOtpType(null);
		setOtpModalVisible(false);
	}, []);

	return {
		otpModalVisible,
		setOtpModalVisible,
		otpType,
		setOtpType,
		otpValue,
		setOtpValue,
		loading,
		setLoading,
		resetOTP,
	};
};

const useProfileActions = (navigation: any, user: any) => {
	const { logout } = useAuth();
	const [actionLoading, setActionLoading] = useState(false);

	const handleLogout = useCallback(async () => {
		Alert.alert(
			'Logout',
			'Are you sure you want to logout?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Logout',
					style: 'destructive',
					onPress: async () => {
						try {
							setActionLoading(true);
							await logout();
							navigation.reset({
								index: 0,
								routes: [{ name: 'Login' }],
							});
						} catch (error) {
							Alert.alert('Error', 'Failed to logout');
						} finally {
							setActionLoading(false);
						}
					},
				},
			],
			{ cancelable: true }
		);
	}, [logout, navigation]);

	const handleDeleteAccount = useCallback(async () => {
		Alert.alert(
			'Delete Account',
			'This action is permanent and cannot be undone. All your data will be lost.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Delete Forever',
					style: 'destructive',
					onPress: async () => {
						try {
							setActionLoading(true);
							const res = await api.delete(`/users/${user._id}`);
							if (res.data.success) {
								await AsyncStorage.removeItem('authToken');
								navigation.reset({
									index: 0,
									routes: [{ name: 'Login' }],
								});
							} else {
								Alert.alert('Failed', res.data.message);
							}
						} catch (err) {
							console.error(err);
							Alert.alert('Error', 'Failed to delete account');
						} finally {
							setActionLoading(false);
						}
					},
				},
			],
			{ cancelable: true }
		);
	}, [user, navigation]);

	return { handleLogout, handleDeleteAccount, actionLoading };
};

// Component Functions
const LoadingScreen = () => (
	<View style={styles.loadingContainer}>
		<ActivityIndicator size="large" color={Colors.primary} />
		<Text style={styles.loadingText}>Loading profile...</Text>
	</View>
);

const UnauthenticatedScreen = ({ onPress }: { onPress: () => void }) => (
	<View style={styles.unauthContainer}>
		<MaterialIcons name="account-circle" size={80} color={Colors.primary} />
		<Text style={styles.unauthTitle}>Not Logged In</Text>
		<Text style={styles.unauthSubtitle}>
			Please log in to access your profile
		</Text>
		<TouchableOpacity
			style={styles.loginButton}
			onPress={() => onPress } // navigation.replace('AuthStack', { screen: 'Login' })
		>
			<LinearGradient
				colors={[Colors.primary, Colors.blue400]}
				style={styles.loginButtonGradient}
			>
				<Text style={styles.loginButtonText}>Login</Text>
			</LinearGradient>
		</TouchableOpacity>
	</View>
);

const ProfileHeader = ({
	user,
	navigation,
}: {
	user: any;
	navigation: any;
}) => {
	const fadeAnim = new Animated.Value(0);

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 600,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Animated.View style={[styles.profileHeader, { opacity: fadeAnim }]}>
			<LinearGradient
				colors={[Colors.primary, Colors.blue400]}
				style={styles.headerGradient}
			>
				<View style={styles.avatarContainer}>
					<Image
						source={
							user?.profile_image
								? { uri: user.profile_image }
								: images.defaultProfileImg
						}
						style={styles.avatar}
					/>
					<TouchableOpacity
						style={styles.editIcon}
						onPress={() => navigation.navigate('EditProfile')}
					>
						<FontAwesome name="pencil" size={16} color="#fff" />
					</TouchableOpacity>
				</View>

				<View style={styles.userInfo}>
					<View style={styles.nameContainer}>
						<Text style={styles.name}>
							{user?.full_name || 'User Name'}
						</Text>
						{user?.verified && <VerifiedBadge />}
					</View>
					<View style={styles.roleContainer}>
						<Text style={styles.role}>
							{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}
						</Text>
					</View>
					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>
								{user?.properties_count || 0}
							</Text>
							<Text style={styles.statLabel}>Properties</Text>
						</View>
						<View style={styles.statDivider} />
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>
								{user?.bookings_count || 0}
							</Text>
							<Text style={styles.statLabel}>Bookings</Text>
						</View>
					</View>
				</View>
			</LinearGradient>
		</Animated.View>
	);
};

const VerificationSection = ({
	user,
	onVerify,
}: {
	user: any;
	onVerify: (type: 'email' | 'phone') => void;
}) => (
	<View style={styles.verificationContainer}>
		<Text style={styles.sectionTitle}>Account Verification</Text>

		<VerificationRow
			icon="email"
			label={user?.email || 'No email'}
			type="email"
			isVerified={user?.is_email_verified}
			onVerify={() => onVerify('email')}
		/>

		<VerificationRow
			icon="phone"
			label={user?.phone_no || 'No phone'}
			type="phone"
			isVerified={user?.is_phone_verified}
			onVerify={() => onVerify('phone')}
		/>
	</View>
);

const KYCSection = ({
	user,
	navigation,
}: {
	user: any;
	navigation: any;
}) => {
	const getKYCStatus = () => {
		if (user?.kyc_status === 'approved') {return { text: 'Verified', color: Colors.success };}
		if (user?.kyc_status === 'pending') {return { text: 'Under Review', color: Colors.warning };}
		if (user?.kyc_status === 'rejected') {return { text: 'Rejected', color: Colors.error };}
		return { text: 'Not Verified', color: Colors.grey500 };
	};

	const kycStatus = getKYCStatus();

	return (
		<View style={styles.kycContainer}>
			<View style={styles.kycHeader}>
				<View style={styles.kycTitleContainer}>
					<MaterialIcons name="verified-user" size={24} color={Colors.primary} />
					<Text style={styles.sectionTitle}>KYC Verification</Text>
				</View>
				<View style={[styles.kycStatusBadge, { backgroundColor: kycStatus.color + '20' }]}>
					<Text style={[styles.kycStatusText, { color: kycStatus.color }]}>
						{kycStatus.text}
					</Text>
				</View>
			</View>

			<Text style={styles.kycDescription}>
				Complete your KYC verification to unlock premium features and increase trust
			</Text>

			{user?.kyc_status !== 'approved' && (
				<TouchableOpacity
					style={styles.kycButton}
					onPress={() => navigation.navigate('KYCVerification')}
				>
					<LinearGradient
						colors={[Colors.primary, Colors.blue400]}
						style={styles.kycButtonGradient}
					>
						<MaterialIcons name="upload" size={20} color="#fff" />
						<Text style={styles.kycButtonText}>
							{user?.kyc_status === 'pending' ? 'View KYC Status' : 'Start KYC Verification'}
						</Text>
					</LinearGradient>
				</TouchableOpacity>
			)}

			{user?.kyc_status === 'approved' && (
				<View style={styles.kycSuccessContainer}>
					<MaterialIcons name="check-circle" size={24} color={Colors.success} />
					<Text style={styles.kycSuccessText}>
						Your account is fully verified
					</Text>
				</View>
			)}
		</View>
	);
};

const MenuSection = ({
	user,
	navigation,
	actions,
}: {
	user: any;
	navigation: any;
	actions: any;
}) => (
	<View style={styles.menuContainer}>
		<Text style={styles.sectionTitle}>Account Settings</Text>

		<MenuItem
			icon="user"
			label="Edit Profile"
			onPress={() => navigation.navigate('EditProfile')}
		/>

		<MenuItem
			icon="lock"
			label="Change Password"
			onPress={() => navigation.navigate('ChangePassword')}
		/>

		<MenuItem
			icon="bell"
			label="Notifications"
			onPress={() => navigation.navigate('NotificationSettings')}
		/>

		<MenuItem
			icon="shield"
			label="Privacy & Security"
			onPress={() => navigation.navigate('PrivacySettings')}
		/>

		<MenuItem
			icon="question-circle"
			label="Help & Support"
			onPress={() => navigation.navigate('Support')}
		/>

		<View style={styles.dangerZone}>
			<Text style={styles.dangerZoneTitle}>Danger Zone</Text>

			<MenuItem
				icon="trash"
				label="Delete Account"
				color={Colors.error}
				onPress={actions.handleDeleteAccount}
				loading={actions.actionLoading}
			/>

			<MenuItem
				icon="sign-out"
				label="Logout"
				color={Colors.error}
				onPress={actions.handleLogout}
				loading={actions.actionLoading}
			/>
		</View>
	</View>
);

const OTPModal = ({
	visible,
	otpType,
	otpValue,
	setOtpValue,
	onVerify,
	onClose,
	onResend,
	loading,
}: {
	visible: boolean;
	otpType: string | null;
	otpValue: string;
	setOtpValue: (value: string) => void;
	onVerify: () => void;
	onClose: () => void;
	onResend: () => void;
	loading: boolean;
}) => {
	const handleOtpChange = (text: string, index: number) => {
		const updated = otpValue.split('');
		updated[index] = text;
		const newOtp = updated.join('');
		setOtpValue(newOtp);
	};

	return (
		<Modal visible={visible} animationType="fade" transparent>
			<View style={styles.modalOverlay}>
				<View style={styles.modalCard}>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<MaterialIcons name="close" size={24} color="#333" />
					</TouchableOpacity>

					<View style={styles.modalIconContainer}>
						<MaterialIcons
							name={otpType === 'email' ? 'email' : 'phone'}
							size={40}
							color={Colors.primary}
						/>
					</View>

					<Text style={styles.modalTitle}>
						{otpType === 'email' ? 'Email' : 'Phone'} Verification
					</Text>

					<Text style={styles.modalSubtitle}>
						Enter the 6-digit verification code sent to your {otpType}
					</Text>

					<View style={styles.otpInputContainer}>
						{[...Array(6)].map((_, index) => (
							<TextInput
								key={index}
								style={[
									styles.otpBox,
									otpValue[index] && styles.otpBoxFilled,
								]}
								keyboardType="number-pad"
								maxLength={1}
								value={otpValue[index] || ''}
								onChangeText={(text) => handleOtpChange(text, index)}
							/>
						))}
					</View>

					<TouchableOpacity
						style={[styles.verifyButton, (!otpValue || otpValue.length !== 6) && styles.verifyButtonDisabled]}
						onPress={onVerify}
						disabled={!otpValue || otpValue.length !== 6 || loading}
					>
						{loading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<LinearGradient
								colors={[Colors.primary, Colors.blue400]}
								style={styles.verifyButtonGradient}
							>
								<Text style={styles.verifyButtonText}>Verify Account</Text>
							</LinearGradient>
						)}
					</TouchableOpacity>

					<Text style={styles.resendText}>
						Didn't receive the code?{' '}
						<Text style={styles.resendLink} onPress={onResend}>
							Resend
						</Text>
					</Text>
				</View>
			</View>
		</Modal>
	);
};

// Reusable Components
const VerifiedBadge = () => (
	<View style={styles.verifiedBadge}>
		<MaterialIcons name="verified" size={16} color={Colors.success} />
		<Text style={styles.verifiedText}>Verified</Text>
	</View>
);

const VerificationRow = ({
	icon,
	label,
	isVerified,
	type,
	onVerify,
}: {
	icon: string;
	label: string;
	isVerified?: boolean;
	type: 'email' | 'phone';
	onVerify: () => void;
}) => (
	<View style={styles.verificationRow}>
		<View style={styles.verificationInfo}>
			<MaterialIcons name={icon} size={20} color={Colors.primary} />
			<Text style={styles.verificationLabel} numberOfLines={1}>
				{label}
			</Text>
		</View>

		{isVerified ? (
			<VerifiedBadge />
		) : (
			<TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
				<Text style={styles.verifyText}>Verify</Text>
			</TouchableOpacity>
		)}
	</View>
);

const MenuItem = ({
	icon,
	label,
	color = Colors.black,
	onPress,
	loading = false,
}: {
	icon: string;
	label: string;
	color?: string;
	onPress: () => void;
	loading?: boolean;
}) => (
	<TouchableOpacity
		style={styles.menuItem}
		onPress={onPress}
		disabled={loading}
	>
		<View style={styles.menuItemLeft}>
			{loading ? (
				<ActivityIndicator size="small" color={color} />
			) : (
				<FontAwesome name={icon} size={20} color={color} />
			)}
			<Text style={[styles.menuText, { color }]}>{label}</Text>
		</View>
		<MaterialIcons name="chevron-right" size={24} color={Colors.grey400} />
	</TouchableOpacity>
);

// Main Component
const ProfileScreen = ({ navigation }: { navigation: any }) => {
	const { isLoggedIn, user } = useAuth();
	const [loading, setLoading] = useState(true);
	const otp = useOTPVerification();
	const actions = useProfileActions(navigation, user);
	const { navigateToLogin, resetToAuth } = useNavigationHelper();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 400);

		return () => clearTimeout(timer);
	}, []);

	const handleVerify = async (type: 'email' | 'phone') => {
		try {
			otp.setLoading(true);
			const endpoint = type === 'email'
				? `/auth/forgot-password/${user?.id}`
				: `/auth/verify-phone/${user?.id}`;

			const res = await api.post(endpoint);

			if (res.data.success) {
				otp.setOtpType(type);
				otp.setOtpModalVisible(true);
				Alert.alert('OTP Sent', `A verification code has been sent to your ${type}`);
			} else {
				Alert.alert('Failed', res.data.message || 'Verification failed');
			}
		} catch (err) {
			console.error(err);
			Alert.alert('Error', 'Verification request failed');
		} finally {
			otp.setLoading(false);
		}
	};

	const handleValidateOtp = async () => {
		if (!otp.otpValue || otp.otpValue.length !== 6) {
			return Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');
		}

		try {
			otp.setLoading(true);
			const endpoint = otp.otpType === 'email' ? '/auth/verify-email' : '/auth/verify-phone';
			const res = await api.post(endpoint, {
				email: user?.email,
				otp: otp.otpValue,
			});

			if (res.data.success) {
				Alert.alert('Success', `${otp.otpType} verified successfully`);
				otp.resetOTP();
				// Refresh user data here if needed
			} else {
				Alert.alert('Invalid OTP', res.data.message);
			}
		} catch (error) {
			console.error(error);
			Alert.alert('Error', 'OTP validation failed');
		} finally {
			otp.setLoading(false);
		}
	};

	if (loading) {
		return <LoadingScreen />;
	}

	if (!isLoggedIn || !user) {
		return <UnauthenticatedScreen onPress={ () => navigateToLogin() } />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<ProfileHeader user={user} navigation={navigation} />
				<VerificationSection user={user} onVerify={handleVerify} />
				<KYCSection user={user} navigation={navigation} />
				<MenuSection user={user} navigation={navigation} actions={actions} />
			</ScrollView>

			<OTPModal
				visible={otp.otpModalVisible}
				otpType={otp.otpType}
				otpValue={otp.otpValue}
				setOtpValue={otp.setOtpValue}
				onVerify={handleValidateOtp}
				onClose={otp.resetOTP}
				onResend={() => handleVerify(otp.otpType || 'email')}
				loading={otp.loading}
			/>
		</SafeAreaView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white || '#f8f9fa',
	},
	scrollContent: {
		paddingBottom: 30,
	},

	// Loading & Unauth States
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white || '#f8f9fa',
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: Colors.grey700 || '#666',
		fontWeight: '500',
	},
	unauthContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		backgroundColor: Colors.white || '#f8f9fa',
	},
	unauthTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: Colors.black || '#1a1a1a',
		marginTop: 20,
		marginBottom: 8,
	},
	unauthSubtitle: {
		fontSize: 16,
		color: Colors.grey700 || '#666',
		textAlign: 'center',
		marginBottom: 32,
		lineHeight: 22,
	},
	loginButton: {
		borderRadius: 12,
		overflow: 'hidden',
		width: '100%',
	},
	loginButtonGradient: {
		paddingVertical: 16,
		paddingHorizontal: 32,
		alignItems: 'center',
	},
	loginButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},

	// Profile Header
	profileHeader: {
		marginBottom: 20,
	},
	headerGradient: {
		paddingTop: 30,
		paddingBottom: 40,
		paddingHorizontal: 20,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	avatarContainer: {
		alignItems: 'center',
		position: 'relative',
		marginBottom: 20,
	},
	avatar: {
		width: width * 0.25,
		height: width * 0.25,
		borderRadius: width * 0.125,
		borderWidth: 4,
		borderColor: 'rgba(255,255,255,0.3)',
	},
	editIcon: {
		position: 'absolute',
		right: width * 0.32,
		bottom: 0,
		backgroundColor: 'rgba(255,255,255,0.9)',
		padding: 8,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	userInfo: {
		alignItems: 'center',
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	name: {
		fontSize: 24,
		fontWeight: '700',
		color: '#fff',
		marginRight: 12,
	},
	roleContainer: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 20,
		marginBottom: 20,
	},
	role: {
		fontSize: 14,
		color: '#fff',
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	statsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.15)',
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	statItem: {
		alignItems: 'center',
	},
	statNumber: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)',
		textTransform: 'uppercase',
		fontWeight: '500',
	},
	statDivider: {
		width: 1,
		height: 30,
		backgroundColor: 'rgba(255,255,255,0.3)',
		marginHorizontal: 24,
	},

	// Verification Section
	verificationContainer: {
		backgroundColor: '#fff',
		marginHorizontal: 16,
		borderRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: Colors.black || '#1a1a1a',
		marginBottom: 16,
	},
	verificationRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey200 || '#f0f0f0',
	},
	verificationInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	verificationLabel: {
		fontSize: 15,
		color: Colors.black || '#1a1a1a',
		marginLeft: 12,
		flex: 1,
		fontWeight: '500',
	},
	verifiedBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.success || '#d1fae5',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	verifiedText: {
		fontSize: 12,
		color: Colors.success || '#10b981',
		marginLeft: 4,
		fontWeight: '600',
	},
	verifyButton: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
	},
	verifyText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 12,
	},

	// KYC Section
	kycContainer: {
		backgroundColor: '#fff',
		marginHorizontal: 16,
		borderRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		marginBottom: 16,
	},
	kycHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	kycTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	kycStatusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	kycStatusText: {
		fontSize: 12,
		fontWeight: '600',
		textTransform: 'uppercase',
	},
	kycDescription: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		lineHeight: 20,
		marginBottom: 16,
	},
	kycButton: {
		borderRadius: 12,
		overflow: 'hidden',
	},
	kycButtonGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		paddingHorizontal: 20,
	},
	kycButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
		marginLeft: 8,
	},
	kycSuccessContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.success || '#d1fae5',
		padding: 16,
		borderRadius: 12,
	},
	kycSuccessText: {
		fontSize: 14,
		color: Colors.success || '#10b981',
		marginLeft: 8,
		fontWeight: '600',
	},

	// Menu Section
	menuContainer: {
		backgroundColor: '#fff',
		marginHorizontal: 16,
		borderRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey200 || '#f0f0f0',
	},
	menuItemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	menuText: {
		fontSize: 16,
		marginLeft: 15,
		fontWeight: '500',
	},
	dangerZone: {
		marginTop: 20,
		paddingTop: 20,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: Colors.grey200 || '#f0f0f0',
	},
	dangerZoneTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.error,
		marginBottom: 12,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},

	// Modal Styles
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalCard: {
		width: width * 0.9,
		backgroundColor: '#fff',
		borderRadius: 20,
		paddingVertical: 32,
		paddingHorizontal: 24,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.25,
		shadowRadius: 20,
		elevation: 15,
	},
	closeButton: {
		position: 'absolute',
		top: 16,
		right: 16,
		zIndex: 1,
		padding: 8,
	},
	modalIconContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.blue100 || '#e3f2fd',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: '700',
		color: Colors.black || '#1a1a1a',
		marginBottom: 8,
		textAlign: 'center',
	},
	modalSubtitle: {
		fontSize: 15,
		color: Colors.grey700 || '#666',
		textAlign: 'center',
		marginBottom: 32,
		lineHeight: 22,
		paddingHorizontal: 8,
	},
	otpInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '85%',
		marginBottom: 32,
	},
	otpBox: {
		width: 48,
		height: 56,
		borderWidth: 2,
		borderColor: Colors.grey300 || '#d1d5db',
		borderRadius: 12,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600',
		color: Colors.black || '#1a1a1a',
		backgroundColor: Colors.grey50 || '#f9fafb',
	},
	otpBoxFilled: {
		borderColor: Colors.primary,
		backgroundColor: Colors.blue100 || '#e3f2fd',
	},
	// verifyButton: {
	// 	width: '100%',
	// 	borderRadius: 12,
	// 	overflow: 'hidden',
	// 	marginBottom: 20,
	// },
	verifyButtonDisabled: {
		opacity: 0.5,
	},
	verifyButtonGradient: {
		paddingVertical: 16,
		alignItems: 'center',
	},
	verifyButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	resendText: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		textAlign: 'center',
	},
	resendLink: {
		color: Colors.primary,
		fontWeight: '600',
		textDecorationLine: 'underline',
	},
});


// import React, { useEffect, useState, useCallback } from 'react';

// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	Image,
// 	TouchableOpacity,
// 	ActivityIndicator,
// 	Alert,
// 	Modal,
// 	TextInput,
// 	Dimensions,
// 	SafeAreaView,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useAuth } from '../../contexts/AuthContext';

// import api from '../../api/apiClient';
// import { getMyProfile } from '../../services/UserServices';
// import images from '../../assets/images';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const { width } = Dimensions.get('window');

// import { Colors } from '../../constants';

// const ProfileScreen = ({ navigation }: { navigation: any }) => {
// 	const { user, logout } = useAuth();
// 	// const [loading, setLoading] = useState(true);
// 	const [otpModalVisible, setOtpModalVisible] = useState(false);
// 	const [otpType, setOtpType] = useState<'email' | 'phone' | null>(null);
// 	const [otpValue, setOtpValue] = useState('');

// 	const handleVerify = async (type: 'email' | 'phone') => {
// 		try {
// 			const endpoint =
// 				type === 'email'
// 					? `/auth/forgot-password/${user._id}`
// 					: `/auth/verify-phone/${user._id}`;
// 			const res = await api.post(endpoint);

// 			if (res.data.success) {
// 				setOtpType(type);
// 				setOtpModalVisible(true);
// 				Alert.alert('OTP Sent', `An OTP has been sent to your ${type}`);
// 			} else {
// 				Alert.alert(
// 					'Failed',
// 					res.data.message || 'Verification failed'
// 				);
// 			}
// 		} catch (err) {
// 			console.error(err);
// 			Alert.alert('Error', 'Verification request failed');
// 		}
// 	};

// 	const handleValidateOtp = async () => {
// 		if (!otpValue) {
// 			return Alert.alert('Missing OTP', 'Please enter the OTP');
// 		}

// 		try {
// 			const endpoint =
// 				otpType === 'email'
// 					? '/auth/verify-email'
// 					: '/auth/verify-phone';
// 			const res = await api.post(endpoint, {
// 				email: user.email,
// 				otp: otpValue,
// 			});

// 			if (res.data.success) {
// 				Alert.alert('Success', `${otpType} verified successfully`);
// 				setOtpModalVisible(false);
// 				setOtpValue('');
// 				fetchUserData();
// 			} else {
// 				Alert.alert('Invalid OTP', res.data.message);
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			Alert.alert('Error', 'OTP validation failed');
// 		}
// 	};

// 	const handleLogout = async () => {
// 		logout();
// 		navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
// 	};

// 	const handleDeleteAccount = async () => {
// 		Alert.alert(
// 			'Delete Account',
// 			'Are you sure you want to delete your account? This action is irreversible.',
// 			[
// 				{ text: 'Cancel', style: 'cancel' },
// 				{
// 					text: 'Delete',
// 					style: 'destructive',
// 					onPress: async () => {
// 						try {
// 							const res = await api.delete(`/users/${user._id}`);
// 							if (res.data.success) {
// 								await AsyncStorage.removeItem('authToken');
// 								navigation.reset({
// 									index: 0,
// 									routes: [{ name: 'Login' }],
// 								});
// 							} else {
// 								Alert.alert('Failed', res.data.message);
// 							}
// 						} catch (err) {
// 							console.error(err);
// 							Alert.alert('Error', 'Failed to delete account');
// 						}
// 					},
// 				},
// 			],
// 			{ cancelable: true }
// 		);
// 	};

// 	// if (loading) {
// 	// 	return (
// 	// 		<ActivityIndicator
// 	// 			style={{ flex: 1 }}
// 	// 			size="large"
// 	// 			color={Colors.primary}
// 	// 		/>
// 	// 	);
// 	// }

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.profileHeader}>
// 				<Image
// 					source={images.defaultProfileImg}
// 					style={styles.avatar}
// 				/>
// 				<TouchableOpacity
// 					style={styles.editIcon}
// 					onPress={() => navigation.navigate('EditProfile')}
// 				>
// 					<FontAwesome name="pencil" size={16} color="#fff" />
// 				</TouchableOpacity>
// 				<View style={styles.nameContainer}>
// 					<Text style={styles.name}>
// 						{user?.full_name || 'User Name'}
// 					</Text>
// 					{user?.verified && <VerifiedBadge />}
// 				</View>
// 				<View style={styles.roleContainer}>
// 					<Text style={styles.role}>{user?.role || 'User'}</Text>
// 					{/* {user?.verified && <VerifiedBadge />} */}
// 				</View>
// 			</View>

// 			<View style={styles.verificationContainer}>
// 				<VerifyRow
// 					label={user?.email}
// 					type="email"
// 					isVerified={user?.is_email_verified}
// 					onVerify={() => handleVerify('email')}
// 				/>

// 				<VerifyRow
// 					label={user?.phone_no}
// 					type="phone"
// 					isVerified={user?.is_phone_verified}
// 					onVerify={() => handleVerify('phone')}
// 					onAdd={() => navigation.navigate('EditProfile')}
// 				/>
// 			</View>

// 			<View style={styles.menu}>
// 				<MenuItem
// 					icon="user"
// 					label="Edit Profile"
// 					onPress={() => navigation.navigate('EditProfile')}
// 				/>
// 				<MenuItem
// 					icon="lock"
// 					label="Change Password"
// 					onPress={() => navigation.navigate('ChangePassword')}
// 				/>
// 				<MenuItem
// 					icon="trash"
// 					label="Delete Account"
// 					color="red"
// 					onPress={handleDeleteAccount}
// 				/>
// 				<MenuItem
// 					icon="sign-out"
// 					label="Logout"
// 					color="#e11d48"
// 					onPress={handleLogout}
// 				/>
// 			</View>

// 			{/* <Modal visible={otpModalVisible} animationType="slide" transparent>
//             <View style={styles.modalOverlay}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Enter OTP</Text>
//                     <TextInput
//                         style={styles.otpInput}
//                         keyboardType="number-pad"
//                         maxLength={6}
//                         value={otpValue}
//                         onChangeText={setOtpValue}
//                         placeholder="Enter 6-digit OTP"
//                     />
//                     <TouchableOpacity style={styles.modalButton} onPress={handleValidateOtp}>
//                         <Text style={styles.modalButtonText}>Validate</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => setOtpModalVisible(false)}>
//                         <Text style={styles.cancelText}>Cancel</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal> */}

// 			{otpModalVisible && (
// 				<Modal
// 					visible={otpModalVisible}
// 					animationType="fade"
// 					transparent
// 				>
// 					<View style={styles.modalOverlay}>
// 						<View style={styles.modalCard}>
// 							<TouchableOpacity
// 								style={styles.closeButton}
// 								onPress={() => setOtpModalVisible(false)}
// 							>
// 								<FontAwesome
// 									name="close"
// 									size={24}
// 									color="#333"
// 									style={{ alignSelf: 'flex-end' }}
// 								/>
// 							</TouchableOpacity>

// 							<Text style={styles.modalTitle}>
// 								Gmail Verification
// 							</Text>
// 							<Text style={styles.modalSubtitle}>
// 								Enter the 6-digit verification code that was
// 								sent to your email.
// 							</Text>

// 							<TextInput
// 								style={styles.otpInput}
// 								keyboardType="number-pad"
// 								maxLength={6}
// 								value={otpValue}
// 								onChangeText={setOtpValue}
// 								placeholder="Enter 6-digit OTP"
// 							/>

// 							<View style={styles.otpInputContainer}>
//                         {[...Array(6)].map((_, index) => (
//                         <TextInput
//                             key={index}
//                             style={styles.otpBox}
//                             keyboardType="number-pad"
//                             maxLength={1}
//                             value={otpValue[index] || ''}
//                             onChangeText={(text) => {
//                             const updated = otpValue.split('');
//                             updated[index] = text;
//                             setOtpValue(updated.join(''));
//                             }}
//                         />
//                         ))}
//                     </View>

// 							<TouchableOpacity
// 								style={styles.verifyModelButton}
// 								onPress={handleValidateOtp}
// 							>
// 								<Text style={styles.verifyButtonText}>
// 									Verify Account
// 								</Text>
// 							</TouchableOpacity>

// 							<Text style={styles.resendText}>
// 								Didn't receive code?{' '}
// 								<Text
// 									style={styles.resendLink}
// 									onPress={() =>
// 										handleVerify(otpType || 'email')
// 									}
// 								>
// 									Resend
// 								</Text>
// 							</Text>
// 						</View>
// 					</View>
// 				</Modal>
// 			)}
// 		</SafeAreaView>
// 	);
// };

// const VerifiedBadge = () => (
// 	<View style={styles.verifiedBadge}>
// 		<FontAwesome name="check-circle" size={14} color="#10b981" />
// 		<Text style={styles.verifiedText}>Verified</Text>
// 	</View>
// );

// const VerifyRow = ({
// 	label,
// 	isVerified,
// 	type,
// 	onVerify,
// 	onAdd,
// }: {
// 	label: string;
// 	isVerified?: boolean;
// 	type: 'email' | 'phone';
// 	onVerify: () => void;
// 	onAdd?: () => void;
// }) => (
// 	<View style={styles.verifyRow}>
// 		<Text style={styles.email}>{label || `No ${type}`}</Text>
// 		{isVerified ? (
// 			<VerifiedBadge />
// 		) : label ? (
// 			<TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
// 				<Text style={styles.verifyText}>Verify</Text>
// 			</TouchableOpacity>
// 		) : (
// 			<TouchableOpacity style={styles.verifyButton} onPress={onAdd}>
// 				<Text style={styles.verifyText}>Add</Text>
// 			</TouchableOpacity>
// 		)}
// 	</View>
// );

// const MenuItem = ({
// 	icon,
// 	label,
// 	color = '#333',
// 	onPress,
// }: {
// 	icon: string;
// 	label: string;
// 	color?: string;
// 	onPress: () => void;
// }) => (
// 	<TouchableOpacity style={styles.menuItem} onPress={onPress}>
// 		<FontAwesome
// 			name={icon}
// 			size={20}
// 			color={color}
// 			style={{ width: 25 }}
// 		/>
// 		<Text style={[styles.menuText, { color }]}>{label}</Text>
// 		<FontAwesome
// 			name="angle-right"
// 			size={20}
// 			color="#aaa"
// 			style={{ marginLeft: 'auto' }}
// 		/>
// 	</TouchableOpacity>
// );

// export default ProfileScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#f1f5f9',
// 	},
// 	profileHeader: {
// 		alignItems: 'center',
// 		paddingVertical: 30,
// 		backgroundColor: '#fff',
// 		borderBottomLeftRadius: 24,
// 		borderBottomRightRadius: 24,
// 		marginBottom: 20,
// 	},
// 	avatar: {
// 		width: width * 0.24,
// 		height: width * 0.24,
// 		borderRadius: width * 0.12,
// 	},
// 	editIcon: {
// 		position: 'absolute',
// 		right: width * 0.34,
// 		top: width * 0.2,
// 		backgroundColor: '#2563eb',
// 		padding: 6,
// 		borderRadius: 20,
// 		elevation: 2,
// 	},
// 	nameContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginTop: 12,
// 	},
// 	name: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginRight: 8,
// 		color: '#1e293b',
// 	},
// 	verifiedBadge: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: '#d1fae5',
// 		borderRadius: 6,
// 		paddingHorizontal: 6,
// 		paddingVertical: 2,
// 	},
// 	verifiedText: {
// 		fontSize: 12,
// 		color: '#059669',
// 		marginLeft: 4,
// 	},
// 	verificationContainer: {
// 		marginHorizontal: 20,
// 		backgroundColor: '#fff',
// 		borderRadius: 12,
// 		padding: 14,
// 		elevation: 2,
// 	},
// 	verifyRow: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		paddingVertical: 10,
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#e2e8f0',
// 	},
// 	email: {
// 		fontSize: 15,
// 		color: '#334155',
// 		maxWidth: '70%',
// 	},
// 	verifyButton: {
// 		backgroundColor: '#2563eb',
// 		paddingHorizontal: 12,
// 		paddingVertical: 6,
// 		borderRadius: 8,
// 	},
// 	verifyText: {
// 		color: '#fff',
// 		fontWeight: 'bold',
// 		fontSize: 14,
// 	},
// 	menu: {
// 		marginHorizontal: 20,
// 		backgroundColor: '#fff',
// 		borderRadius: 12,
// 		paddingVertical: 10,
// 		elevation: 2,
// 		marginTop: 24,
// 	},
// 	menuItem: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		paddingVertical: 14,
// 		paddingHorizontal: 20,
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#e2e8f0',
// 	},
// 	menuText: {
// 		fontSize: 16,
// 		marginLeft: 15,
// 	},

// 	// MODAL STYLES
// 	// modalOverlay: {
// 	//     flex: 1,
// 	//     backgroundColor: 'rgba(0,0,0,0.5)',
// 	//     justifyContent: 'center',
// 	//     alignItems: 'center',
// 	// },
// 	// modalContent: {
// 	//     width: '80%',
// 	//     backgroundColor: '#fff',
// 	//     borderRadius: 12,
// 	//     padding: 20,
// 	//     alignItems: 'center',
// 	//     elevation: 5,
// 	// },
// 	// modalTitle: {
// 	//     fontSize: 18,
// 	//     fontWeight: 'bold',
// 	//     marginBottom: 12,
// 	// },
// 	otpInput: {
// 		width: '100%',
// 		borderWidth: 1,
// 		borderColor: '#cbd5e1',
// 		borderRadius: 8,
// 		padding: 10,
// 		textAlign: 'center',
// 		marginBottom: 12,
// 		fontSize: 16,
// 		letterSpacing: 4,
// 	},
// 	// modalButton: {
// 	//     backgroundColor: '#2563eb',
// 	//     paddingVertical: 10,
// 	//     paddingHorizontal: 20,
// 	//     borderRadius: 8,
// 	// },
// 	// modalButtonText: {
// 	//     color: '#fff',
// 	//     fontWeight: 'bold',
// 	// },
// 	modalOverlay: {
// 		flex: 1,
// 		backgroundColor: 'rgba(0, 0, 0, 0.5)',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	modalCard: {
// 		width: '85%',
// 		backgroundColor: '#fff',
// 		borderRadius: 16,
// 		paddingVertical: 30,
// 		paddingHorizontal: 20,
// 		alignItems: 'center',
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 4 },
// 		shadowOpacity: 0.2,
// 		shadowRadius: 6,
// 		elevation: 8,
// 	},
// 	closeButton: {
// 		position: 'absolute',
// 		top: 5,
// 		right: 10,
// 		zIndex: 1,
// 	},
// 	modalTitle: {
// 		fontSize: 20,
// 		fontWeight: '700',
// 		marginBottom: 8,
// 		textAlign: 'center',
// 	},
// 	modalSubtitle: {
// 		fontSize: 14,
// 		color: '#6b7280',
// 		textAlign: 'center',
// 		marginBottom: 24,
// 		lineHeight: 20,
// 	},
// 	otpInputContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		width: '80%',
// 		marginBottom: 24,
// 	},
// 	otpBox: {
// 		width: 50,
// 		height: 50,
// 		borderWidth: 1,
// 		borderColor: '#cbd5e1',
// 		borderRadius: 8,
// 		textAlign: 'center',
// 		fontSize: 20,
// 		color: '#111827',
// 		backgroundColor: '#f9fafb',
// 	},
// 	verifyModelButton: {
// 		backgroundColor: '#6366f1',
// 		paddingVertical: 14,
// 		borderRadius: 10,
// 		width: '100%',
// 		alignItems: 'center',
// 		marginBottom: 16,
// 	},
// 	verifyButtonText: {
// 		color: '#fff',
// 		fontSize: 16,
// 		fontWeight: '600',
// 	},
// 	resendText: {
// 		fontSize: 13,
// 		color: '#6b7280',
// 		textAlign: 'center',
// 	},
// 	resendLink: {
// 		color: '#6366f1',
// 		fontWeight: '600',
// 		textDecorationLine: 'underline',
// 	},
// });

