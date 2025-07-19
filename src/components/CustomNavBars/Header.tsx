import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';

import SearchBar from '../Common/SearchBar';

import { Colors, Spacing, TextSizes } from '../../constants';
import images from '../../assets/images';
import AppText from '../../components/AppTheme/AppText';

import { RootStackParamList } from '../../navigation/AppNavigator';
import { MaterialIcons } from '../../utils/imports';

const HomeHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={images.banner}
      style={styles.bannerImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={styles.overlay}
      />

      {/* <SafeAreaView style={styles.safeArea}> */}
        {/* === TOP NAV BAR === */}
        <View style={styles.navBar}>
          {/* Left: Drawer Menu */}
          <TouchableOpacity
            style={styles.iconTouchable}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            accessible
            accessibilityLabel="Open Menu"
          >
            <FontAwesome name="bars" size={24} color={Colors.primary} />
          </TouchableOpacity>

          {/* Center: Logo */}
          <TouchableOpacity
            style={styles.logoWrapper}
            onPress={() => navigation.navigate('Home' as never)}
            accessible
            accessibilityLabel="Go Home"
          >
            <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>

          {/* Right: User Icon */}
          <TouchableOpacity
            style={styles.userIconWrapper}
            onPress={() => navigation.navigate('Login' as never)}
            accessible
            accessibilityLabel="Login"
          >
            <FontAwesome name="user" size={16} color={Colors.white} />
          </TouchableOpacity>

          {/* <MaterialIcons name="notifications" size={24} color={Colors.primary} /> */} 
          {/* person-add-alt-1 */}
        </View>

        {/* === SLOGAN & SEARCH === */}
        <View style={styles.contentWrapper}>
          <View style={styles.sloganWrapper}>
            <FontAwesome name="quote-left" size={16} color={Colors.white200} />
            <AppText style={styles.sloganText}>Find Your Space. Live Your Dream.</AppText>
            <FontAwesome name="quote-right" size={16} color={Colors.white200} />
          </View>

          <SearchBar />
        </View>
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     justifyContent: 'space-between',
//     // alignItems: 'flex-start',
//   },
//   navBar: {
//     width: '100%',
//     minWidth: 360,
//     height: 56,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: Spacing.md,
//     zIndex: 10,
//     // borderColor: '#000',
//     // borderWidth: 1,
//   },
navBar: {
  width: '100%',
  height: 70, // taller for visible curve
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: Spacing.md,
  backgroundColor: Colors.white100, // or your nav background
  borderBottomLeftRadius: 40,  // adjust curve depth
  borderBottomRightRadius: 40, // adjust curve depth
  overflow: 'hidden',
  zIndex: 10,

  // Optional subtle shadow for depth
  ...Platform.select({
    android: {
      elevation: 5,
    },
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
  }),
},

  iconTouchable: {
    padding: 8,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 48,
  },
  userIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  sloganWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.md,
  },
  sloganText: {
    fontSize: TextSizes.xl,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
});
