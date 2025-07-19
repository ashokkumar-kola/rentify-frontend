import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';

import AppText from '../../components/AppTheme/AppText';
import styles from './styles';

const OnBoardingScreen3 = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView style={styles.container}>

        {/* Main Content */}
        <View style={styles.content}>
            <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="Rentify logo"
            />

            <Image
                source={images.onboarding3}
                style={styles.illustration}
                resizeMode="contain"
                accessibilityLabel="Rentify onboarding illustration"
            />

            <AppText style={styles.subHeading}>Start Your Rentify Experience</AppText>

            <AppText style={styles.paragraph}>
                Whether you're a tenant searching for your next home or a landlord ready to earn, Rentify empowers you with tools that make renting easy, secure, and transparent.
            </AppText>
        </View>

            {/* Next Button */}
            <LinearGradient
                colors={[Colors.blue100, Colors.blue300]}
                style={styles.nextButton}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity
                    // style={styles.nextButton}
                    onPress={() => navigation.replace('Main')}
                    accessibilityLabel="Explore homes now"
                >
                    <AppText style={styles.nextText}>Explore Homes</AppText>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default OnBoardingScreen3;
