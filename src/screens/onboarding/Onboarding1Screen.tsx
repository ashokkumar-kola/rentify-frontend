import React from 'react';

import {
	View,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';

import AppText from '../../components/AppTheme/AppText';
import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';
import images from '../../assets/images';

const OnBoarding1Screen = ({ navigation }: { navigation: any }) => {
	return (
		<SafeAreaView style={styles.container}>
			{/* Skip button top-right */}
			<TouchableOpacity
				style={styles.skipButton}
				onPress={() => navigation.replace('AuthStack')}
				accessibilityLabel="Skip to Home"
			>
				<AppText style={styles.skipText}>Skip</AppText>
			</TouchableOpacity>

			{/* Main Content */}
			<View style={styles.content}>
				<Image
					source={images.logo}
					style={styles.logo}
					resizeMode="contain"
					accessibilityLabel="Rentify Logo"
				/>

				{/* <Text style={styles.mainHeading}>Welcome to Rentify</Text> */}
				<AppText style={styles.mainHeading}>
					{' '}
					Welcome to Rentify{' '}
				</AppText>

				<Image
					source={images.onboarding1}
					style={styles.illustration}
					resizeMode="contain"
					accessibilityLabel="Home illustration"
				/>

				<AppText style={styles.subHeading}>
					Find your new way to home
				</AppText>

				<AppText style={styles.paragraph}>
					Rentify helps you find your dream home with ease. Browse
					listings, schedule tours, and sign leases—all in one place.
				</AppText>
			</View>

			{/* Next Button */}
			<LinearGradient
				colors={[Colors.blue100, Colors.blue300]}
				style={styles.nextButton}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<TouchableOpacity
					// style={styles.nextButton}
					onPress={() => navigation.navigate('Onboarding2')}
					accessibilityLabel="Go to next onboarding screen"
				>
					<AppText style={styles.nextText}>Next</AppText>
				</TouchableOpacity>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default OnBoarding1Screen;
