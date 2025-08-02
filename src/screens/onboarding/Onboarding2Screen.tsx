import React from 'react';
import {
  View,
  Text,
//   StyleSheet,
  Image,
  TouchableOpacity,
//   Dimensions,
  SafeAreaView,
} from 'react-native';

import AppText from '../../components/AppTheme/AppText';
import styles from './styles';

import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/Colors';

const OnBoardingScreen2 = ({ navigation }: { navigation: any }) => {
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
                accessibilityLabel="Rentify logo"
            />

            {/* Optional Main Heading */}
            {/* <Text style={styles.mainHeading}>Live in your Dream Home</Text> */}

            <Image
                source={images.onboarding2}
                style={styles.illustration}
                resizeMode="contain"
                accessibilityLabel="Property earning illustration"
            />

            <AppText style={styles.subHeading}>List. Rent. Earn.</AppText>

            <AppText style={styles.paragraph}>
                Turn your property into profit with Rentify—hassle-free listings, faster tenants—all from one convenient platform.
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
                onPress={() => navigation.navigate('Onboarding3')}
                accessibilityLabel="Go to next onboarding screen"
            >
                <AppText style={styles.nextText}>Next</AppText>
            </TouchableOpacity>
        </LinearGradient>
        </SafeAreaView>
    );
};

export default OnBoardingScreen2;
