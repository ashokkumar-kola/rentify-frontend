import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Image,
	Animated,
} from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '../../contexts/AuthContext';
import { Colors, TextSizes } from '../../constants';
import Icons from '../../constants/Icons';
import images from '../../assets/images';
import AppText from '../AppTheme/AppText';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AppDrawerParamList } from '../../navigation/types';

type CustomDrawerNavigationProp = CompositeNavigationProp<
	DrawerNavigationProp<AppDrawerParamList>,
	NativeStackNavigationProp<RootStackParamList>
>;

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const { user, logout } = useAuth();
	const navigation = useNavigation<CustomDrawerNavigationProp>();
	const [notificationCount] = useState(0);
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to log out?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Logout',
				style: 'destructive',
				onPress: async () => {
					try {
						logout();
						navigation.reset({
							index: 0,
							routes: [{ name: 'AuthStack' }],
						});
					} catch (error) {
						console.error('Logout error:', error);
					}
				},
			},
		]);
	};

	const navigateToScreen = (screenName: keyof DrawerParamList | keyof RootStackParamList) => {
		try {
			// props.navigation.closeDrawer();

			if (screenName === 'AuthStack') {
				navigation.reset({
					index: 0,
					routes: [{ name: screenName }],
				});
			} else {
				navigation.navigate(screenName as any);
			}
		} catch (error) {
			console.error(`Navigation error to ${screenName}:`, error);
		}
	};

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.profileContainer}
						onPress={() => navigation.navigate('MainTabs', {
								screen: 'ProfileStack',
								params: {
									screen: 'Profile',
								},
						})}
					>
						<Image
							style={styles.profileImage}
							source={user?.profile_image ? { uri: user.profile_image } : images.defaultProfileImg}
						/>
						<AppText style={styles.profileName}>{user?.email || 'Guest'}</AppText>
					</TouchableOpacity>
					<Image source={images.logo} style={styles.logo} resizeMode="contain" />
					<TouchableOpacity
						style={styles.notificationContainer}
						onPress={() => navigateToScreen('Notifications')}
					>
						<Icons.FA name="bell" size={20} color={Colors.primary} />
						{notificationCount > 0 && (
							<View style={styles.notificationBadge}>
								<Text style={styles.notificationText}>{notificationCount}</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.navLinks}>
					<TouchableOpacity
						style={styles.navItem}
						onPress={() => navigateToScreen('MyProperties')}
					>
						<Icons.FA name="home" size={18} color={Colors.primary} />
						<AppText style={styles.navText}>My Properties</AppText>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.navItem}
						onPress={() => navigateToScreen('MyRentals')}
					>
						<Icons.FA name="building" size={18} color={Colors.primary} />
						<AppText style={styles.navText}>My Rentals</AppText>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.navItem}
						onPress={() => navigateToScreen('MyApplications')}
					>
						<Icons.FA name="file-text" size={18} color={Colors.primary} />
						<AppText style={styles.navText}>My Applications</AppText>
					</TouchableOpacity>
				</View>
			</DrawerContentScrollView>

			<View style={styles.bottomSection}>
				<TouchableOpacity
					style={styles.bottomItem}
					onPress={() => navigateToScreen('Settings')}
				>
					<Icons.FA name="cog" size={18} color="#555" />
					<AppText style={styles.bottomText}>Settings</AppText>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.bottomItem}
					onPress={() => navigateToScreen('SupportStack')}
				>
					<Icons.FA name="support" size={18} color="#555" />
					<AppText style={styles.bottomText}>Support</AppText>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.bottomItem}
					onPress={() => Alert.alert('Privacy Policy', 'Privacy Policy content goes here')}
				>
					<Icons.FA name="shield" size={18} color="#555" />
					<AppText style={styles.bottomText}>Privacy Policy</AppText>
				</TouchableOpacity>

				<TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
					<AppText style={styles.logoutText}>Log out</AppText>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default CustomDrawer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9fafb',
	},
	drawerContent: {
		paddingTop: 0,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		backgroundColor: '#fff',
		// borderBottomWidth: 1,
		// borderBottomColor: '#e5e7eb',
	},
	profileContainer: {
		alignItems: 'center',
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 25,
		backgroundColor: '#ddd',
		marginBottom: 6,
	},
	profileName: {
		fontSize: 10,
		color: '#1f2937',
	},
	logo: {
		width: 120,
		height: 32,
	},
	notificationContainer: {
		position: 'relative',
	},
	notificationBadge: {
		position: 'absolute',
		top: -4,
		right: -4,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		width: 16,
		height: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	notificationText: {
		color: '#fff',
		fontSize: 10,
		fontWeight: 'bold',
	},
	navLinks: {
		paddingVertical: 16,
	},
	navItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 10,
	},
	navText: {
		marginLeft: 16,
		fontSize: TextSizes.md,
		color: '#1f2937',
	},
	bottomSection: {
		borderTopWidth: 1,
		borderTopColor: '#e5e7eb',
		padding: 16,
		backgroundColor: '#fff',
	},
	bottomItem: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: 12,
		paddingHorizontal: 16,
	},
	bottomText: {
		marginLeft: 16,
		fontSize: TextSizes.md,
		color: '#555',
	},
	logoutBtn: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 16,
	},
	logoutText: {
		color: '#fff',
		fontSize: 16,
	},
});

// import React, { useEffect, useState } from 'react';
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	TouchableOpacity,
// 	Alert,
// 	Image,
// 	Animated,
// } from 'react-native';
// import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
// import { useAuth } from '../../contexts/AuthContext';
// import { Colors, TextSizes } from '../../constants';
// import Icons from '../../constants/Icons';
// import images from '../../assets/images';
// import AppText from '../AppTheme/AppText';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigation/types';

// type CustomDrawerProps = NativeStackNavigationProp<RootStackParamList>;

// const CustomDrawer = (props: DrawerContentComponentProps) => {
// 	const { user, logout } = useAuth();
// 	const navigation = useNavigation<CustomDrawerProps>();
// 	const [notificationCount] = useState(0);
// 	const [fadeAnim] = useState(new Animated.Value(0));

// 	useEffect(() => {
// 		Animated.timing(fadeAnim, {
// 			toValue: 1,
// 			duration: 300,
// 			useNativeDriver: true,
// 		}).start();
// 	}, [fadeAnim]);

// 	const handleLogout = () => {
// 		Alert.alert('Logout', 'Are you sure you want to log out?', [
// 			{ text: 'Cancel', style: 'cancel' },
// 			{
// 				text: 'Logout',
// 				style: 'destructive',
// 				onPress: async () => {
// 					try {
// 						logout();
// 						navigation.navigate('AuthStack');
// 					} catch (error) {
// 						console.error('Logout error:', error);
// 					}
// 				},
// 			},
// 		]);
// 	};

// 	return (
// 		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
// 			<DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
// 				<View style={styles.header}>
// 					<TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('ProfileStack')}>
// 						<Image
// 							style={styles.profileImage}
// 							source={user?.profile_image ? { uri: user.profile_image } : images.defaultProfileImg}
// 						/>
// 						<AppText style={styles.profileName}>{user?.email || 'Guest'}</AppText>
// 					</TouchableOpacity>
// 					<Image source={images.logo} style={styles.logo} resizeMode="contain" />
// 					<TouchableOpacity style={styles.notificationContainer} onPress={() => navigation.navigate('Notifications')}>
// 						<Icons.FA name="bell" size={20} color={Colors.primary} />
// 						{notificationCount > 0 && (
// 							<View style={styles.notificationBadge}>
// 								<Text style={styles.notificationText}>{notificationCount}</Text>
// 							</View>
// 						)}
// 					</TouchableOpacity>
// 				</View>

// 				<View style={styles.navLinks}>
// 					{/* <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileStack')}>
// 						<Icons.FA name="user-circle" size={18} color={Colors.primary} />
// 						<AppText style={styles.navText}>Profile</AppText>
// 					</TouchableOpacity> */}

// 					<TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyProperties')}>
// 						<Icons.FA name="home" size={18} color={Colors.primary} />
// 						<AppText style={styles.navText}>My Properties</AppText>
// 					</TouchableOpacity>

// 					<TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyRentals')}>
// 						<Icons.FA name="building" size={18} color={Colors.primary} />
// 						<AppText style={styles.navText}>My Rentals</AppText>
// 					</TouchableOpacity>

// 					<TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyApplications')}>
// 						<Icons.FA name="file-text" size={18} color={Colors.primary} />
// 						<AppText style={styles.navText}>My Applications</AppText>
// 					</TouchableOpacity>
// 				</View>
// 			</DrawerContentScrollView>

// 			<View style={styles.bottomSection}>
// 				<TouchableOpacity style={styles.bottomItem} onPress={() => navigation.navigate('Settings')}>
// 					<Icons.FA name="cog" size={18} color="#555" />
// 					<AppText style={styles.bottomText}>Settings</AppText>
// 				</TouchableOpacity>

// 				<TouchableOpacity style={styles.bottomItem} onPress={() => navigation.navigate('SupportStack')}>
// 					<Icons.FA name="support" size={18} color="#555" />
// 					<AppText style={styles.bottomText}>Support</AppText>
// 				</TouchableOpacity>

// 				<TouchableOpacity style={styles.bottomItem} onPress={() => Alert.alert('Privacy Policy')}>
// 					<Icons.FA name="shield" size={18} color="#555" />
// 					<AppText style={styles.bottomText}>Privacy Policy</AppText>
// 				</TouchableOpacity>

// 				<TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
// 					<AppText style={styles.logoutText}>Log out</AppText>
// 				</TouchableOpacity>
// 			</View>
// 		</Animated.View>
// 	);
// };

// export default CustomDrawer;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#f9fafb',
// 	},
// 	drawerContent: {
// 		paddingTop: 0,
// 	},
// 	header: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'space-between',
// 		padding: 16,
// 		backgroundColor: '#fff',
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#e5e7eb',
// 	},
// 	profileContainer: {
// 		alignItems: 'center',
// 	},
// 	profileImage: {
// 		width: 40,
// 		height: 40,
// 		borderRadius: 25,
// 		backgroundColor: '#ddd',
// 		marginBottom: 6,
// 	},
// 	profileName: {
// 		fontSize: 10,
// 		color: '#1f2937',
// 	},
// 	logo: {
// 		width: 120,
// 		height: 32,
// 	},
// 	notificationContainer: {
// 		position: 'relative',
// 	},
// 	notificationBadge: {
// 		position: 'absolute',
// 		top: -4,
// 		right: -4,
// 		backgroundColor: Colors.primary,
// 		borderRadius: 10,
// 		width: 16,
// 		height: 16,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	notificationText: {
// 		color: '#fff',
// 		fontSize: 10,
// 		fontWeight: 'bold',
// 	},
// 	navLinks: {
// 		paddingVertical: 16,
// 	},
// 	navItem: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		paddingBottom: 12,
// 		paddingHorizontal: 16,
// 		borderRadius: 12,
// 		marginBottom: 10,
// 		// backgroundColor: '#fff',
// 		// shadowColor: '#000',
// 		// shadowOpacity: 0.05,
// 		// shadowOffset: { width: 0, height: 1 },
// 		// shadowRadius: 2,
// 		// elevation: 1,
// 	},
// 	navText: {
// 		marginLeft: 16,
// 		fontSize: TextSizes.md,
// 		color: '#1f2937',
// 	},
// 	bottomSection: {
// 		borderTopWidth: 1,
// 		borderTopColor: '#e5e7eb',
// 		padding: 16,
// 		backgroundColor: '#fff',
// 	},
// 	bottomItem: {
// 		flexDirection: 'row',
// 		justifyContent: 'flex-start',
// 		alignItems: 'center',
// 		paddingBottom: 12,
// 		paddingHorizontal: 16,
// 	},
// 	bottomText: {
// 		marginLeft: 16,
// 		fontSize: TextSizes.md,
// 		color: '#555',
// 	},
// 	logoutBtn: {
// 		backgroundColor: Colors.primary,
// 		paddingVertical: 12,
// 		borderRadius: 8,
// 		alignItems: 'center',
// 		marginTop: 16,
// 	},
// 	logoutText: {
// 		color: '#fff',
// 		fontSize: 16,
// 	},
// });
