import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import TopNavBar from './TopNavBar';
import SearchBar from '../Common/SearchBar';

import { Colors, TextSizes, Spacing } from '../../constants';
import images from '../../assets/images';

import { RootStackParamList } from '../../navigation/AppNavigator';

const Banner = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    // <ImageBackground
    //   source={images.banner}
    //   style={styles.bannerImage}
    //   resizeMode="cover"
    // >
      <View>
      {/* Overlay for readability */}
      {/* <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
        style={styles.overlay}
      /> */}

      {/* Main content */}
      {/* <SafeAreaView style={styles.container}> */}
        {/* Top Navigation */}
        <TopNavBar />

        {/* Slogan */}
        <View style={styles.sloganWrapper}>
          <FontAwesome name="quote-left" size={16} color={Colors.white200} />
          <Text style={styles.sloganText}>Find Your Space. Live Your Dream.</Text>
          <FontAwesome name="quote-right" size={16} color={Colors.white200} />
        </View>

        {/* Search Bar */}
        <SearchBar />
      {/* </SafeAreaView> */}
      </View>
    // </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 260,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.lg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sloganWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  sloganText: {
    fontSize: TextSizes.xl,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
  },
});
