import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  useNavigation,
  DrawerActions,
  NavigationProp,
} from '@react-navigation/native';

import { Colors, Spacing } from '../../constants';
import images from '../../assets/images';
import { FontAwesome, MaterialIcons } from '../../utils/imports';

import { RootStackParamList } from '../../navigation/AppNavigator';


const TopNavBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Left: Menu Icon to open Drawer */}
      <TouchableOpacity
        style={styles.iconTouchable}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        accessible
        accessibilityLabel="Open Menu"
      >
        <FontAwesome name="bars" size={24} color={Colors.primary} />
      </TouchableOpacity>

      {/* Center: App Logo */}
      <TouchableOpacity
        style={styles.logoWrapper}
        onPress={() => navigation.navigate('Home' as never)} // safer fallback
        accessible
        accessibilityLabel="Go to Home"
      >
        <Image
          source={images.logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right: User Icon (Login) */}
      <TouchableOpacity
        style={styles.userIconWrapper}
        onPress={() => navigation.navigate('Login' as never)}
        accessible
        accessibilityLabel="Login"
      >
        <FontAwesome name="user" size={16} color={Colors.white200} />
      </TouchableOpacity>
      {/* <MaterialIcons name="chevron-right" size={24} color={Colors.primary} /> */}
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: 360,
    height: 56,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.whiteOverlay, // Use rgba for transparency
    zIndex: 999,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 48,
  },
  iconTouchable: {
    padding: 8,
  },
  userIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
