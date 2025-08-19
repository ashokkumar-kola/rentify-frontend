import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
} from 'react-native';

import images from '../../assets/images';
import { Colors } from '../../constants';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OnboardingStack'>;

type Props = { navigation: NavigationProp; };

const SplashScreen: React.FC<Props> = ({ navigation }) => {

	useEffect(() => {
		const timer = setTimeout(() => {
			navigation.navigate({ name: 'OnboardingStack', params: {} });
		}, 2000);

		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />

			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<Image
						source={images.logo}
						style={styles.logo}
						resizeMode="contain"
					/>
					<Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.backgroundLight,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 180,
		height: 60,
	},
	tagline: {
		color: Colors.primary,
		fontSize: 16,
		fontWeight: '500',
		marginTop: 12,
		letterSpacing: 2,
		fontFamily: 'Poppins-SemiBold',
	},
});
