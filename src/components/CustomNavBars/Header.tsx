import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Image,
	Platform,
	Animated,
	Text,
} from "react-native";
import {
	useNavigation,
	DrawerActions,
	NavigationProp,
} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, Spacing, TextSizes } from "../../constants";
import images from "../../assets/images";
import AppText from "../../components/AppTheme/AppText";
import SearchBar from "../Common/SearchBar";
import { RootStackParamList } from "../../navigation/types";

const HomeHeader = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notificationCount] = useState(3); // Example notification count
	const [fadeAnim] = useState(new Animated.Value(0));
	const [slideAnim] = useState(new Animated.Value(20));

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem("authToken");
			setIsLoggedIn(!!token);
		};
		checkToken();

		// Fade-in and slide-up animation for header
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}),
		]).start();
	}, [fadeAnim, slideAnim]);

	return (
		<ImageBackground
			source={images.banner}
			style={styles.bannerImage}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)"]}
				style={styles.overlay}
			/>
			<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
				<View style={styles.navBar}>
					{/* Left: Drawer Icon */}
					<TouchableOpacity
						style={styles.iconTouchable}
						onPress={() =>
							navigation.dispatch(DrawerActions.openDrawer())
						}
						accessible
						accessibilityLabel="Open Menu"
					>
						<FontAwesome
							name="bars"
							size={24}
							color={Colors.primary}
						/>
					</TouchableOpacity>

					{/* Center: Rentify Logo */}
					<TouchableOpacity
						style={styles.logoWrapper}
						onPress={() => navigation.navigate("Home" as never)}
						accessible
						accessibilityLabel="Go Home"
					>
						<Image
							source={images.logo}
							style={styles.logo}
							resizeMode="contain"
						/>
					</TouchableOpacity>

					{/* Right: Notification or Login */}
					<TouchableOpacity
						style={styles.notificationWrapper}
						onPress={() =>
							navigation.navigate(
								isLoggedIn
									? "Notifications"
									: ("AuthStack" as never)
							)
						}
						accessible
						accessibilityLabel={
							isLoggedIn ? "View Notifications" : "Login"
						}
					>
						<FontAwesome
							name={isLoggedIn ? "bell" : "user"}
							size={isLoggedIn ? 22 : 18}
							color={Colors.primary}
						/>
						{isLoggedIn && notificationCount > 0 && (
							<View style={styles.notificationBadge}>
								<Text style={styles.notificationText}>
									{notificationCount}
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<Animated.View
					style={[
						styles.contentWrapper,
						{ transform: [{ translateY: slideAnim }] },
					]}
				>
					<View style={styles.sloganWrapper}>
						<FontAwesome
							name="quote-left"
							size={14}
							color={Colors.white200}
						/>
						<AppText style={styles.sloganText}>
							Find Your Space. Live Your Dream.
						</AppText>
						<FontAwesome
							name="quote-right"
							size={14}
							color={Colors.white200}
						/>
					</View>
					<SearchBar />
				</Animated.View>
			</Animated.View>
		</ImageBackground>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	bannerImage: {
		width: "100%",
		height: 300,
		position: "relative",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	container: {
		flex: 1,
	},
	navBar: {
		width: "100%",
		height: 52,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: Spacing.lg,
		backgroundColor: "#fff",
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		zIndex: 10,
		...Platform.select({
			android: {
				elevation: 6,
			},
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.15,
				shadowRadius: 4,
			},
		}),
	},
	iconTouchable: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	logoWrapper: {
		flex: 1,
		alignItems: "center",
	},
	logo: {
		width: 130,
		height: 40,
	},
	notificationWrapper: {
		position: "relative",
		padding: 12,
		borderRadius: 8,
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	notificationBadge: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		width: 18,
		height: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	notificationText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "bold",
	},
	contentWrapper: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: Spacing.xl,
	},
	sloganWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: Spacing.lg,
		backgroundColor: "rgba(0,0,0,0.3)",
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		borderRadius: 12,
	},
	sloganText: {
		fontSize: TextSizes.xxl,
		fontWeight: "600",
		color: Colors.textWhite,
		textAlign: "center",
	},
});

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
//   Platform,
// } from 'react-native';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';

// import SearchBar from '../Common/SearchBar';
// import { Colors, Spacing, TextSizes } from '../../constants';
// import images from '../../assets/images';
// import AppText from '../../components/AppTheme/AppText';
// import { RootStackParamList } from '../../navigation/types';

// const HomeHeader = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem('authToken');
//       setIsLoggedIn(!!token);
//     };
//     checkToken();
//   }, []);

//   return (
//     <ImageBackground
//       source={images.banner}
//       style={styles.bannerImage}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
//         style={styles.overlay}
//       />

//       <View style={styles.navBar}>
//         <TouchableOpacity
//           style={styles.iconTouchable}
//           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           accessible
//           accessibilityLabel="Open Menu"
//         >
//           <FontAwesome name="bars" size={24} color={Colors.primary} />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.logoWrapper}
//           onPress={() => navigation.navigate('Home' as never)}
//           accessible
//           accessibilityLabel="Go Home"
//         >
//           <Image source={images.logo} style={styles.logo} resizeMode="contain" />
//         </TouchableOpacity>

//         {isLoggedIn ? (
//           <TouchableOpacity
//             style={styles.userIconWrapper}
//             onPress={() => navigation.navigate('Notifications' as never)}
//             accessible
//             accessibilityLabel="Notifications"
//           >
//             <MaterialIcons name="notifications" size={20} color={Colors.white} />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.userIconWrapper}
//             onPress={() => navigation.navigate('AuthStack' as never)}
//             accessible
//             accessibilityLabel="Login"
//           >
//             <FontAwesome name="user" size={16} color={Colors.white} />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.contentWrapper}>
//         <View style={styles.sloganWrapper}>
//           <FontAwesome name="quote-left" size={16} color={Colors.white200} />
//           <AppText style={styles.sloganText}>Find Your Space. Live Your Dream.</AppText>
//           <FontAwesome name="quote-right" size={16} color={Colors.white200} />
//         </View>
//         <SearchBar />
//       </View>
//     </ImageBackground>
//   );
// };

// export default HomeHeader;

// const styles = StyleSheet.create({
//   bannerImage: {
//     width: '100%',
//     height: 280,
//     position: 'relative',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   navBar: {
//     width: '100%',
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: Spacing.md,
//     backgroundColor: Colors.white100,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     overflow: 'hidden',
//     zIndex: 10,
//     ...Platform.select({
//       android: {
//         elevation: 5,
//       },
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//       },
//     }),
//   },
//   iconTouchable: {
//     padding: 8,
//   },
//   logoWrapper: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   logo: {
//     width: 120,
//     height: 48,
//   },
//   userIconWrapper: {
//     width: 32,
//     height: 32,
//     backgroundColor: Colors.primary,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentWrapper: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: Spacing.xl,
//   },
//   sloganWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     marginBottom: Spacing.md,
//   },
//   sloganText: {
//     fontSize: TextSizes.xl,
//     fontWeight: 'bold',
//     color: Colors.textWhite,
//     textAlign: 'center',
//     paddingHorizontal: Spacing.sm,
//   },
// });
