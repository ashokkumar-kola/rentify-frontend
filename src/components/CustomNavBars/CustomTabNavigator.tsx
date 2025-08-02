import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import { Colors, Fonts } from '../../constants';
import Icons from '../../constants/Icons';

const TAB_LABELS = {
  HomeStack: 'Home',
  ExploreStack: 'Explore',
  MyProperties: 'MyProperties',
  Wishlist: 'Wishlist',
  ProfileStack: 'Profile',
};

const TabIcons: Record<string, string> = {
  HomeStack: 'home',
  ExploreStack: 'search',
  AddProperty: 'plus-square',
  Wishlist: 'heart',
  ProfileStack: 'user',
};

const ActiveTabIcons: Record<string, string> = {
  HomeStack: 'home',
  ExploreStack: 'home-search',
  AddProperty: 'home-plus',
  Wishlist: 'home-heart',
  ProfileStack: 'account-circle',
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const hiddenRoutes: string | any[] = ['ExploreStack', 'MyProperties']; // ['ExploreStack', 'AddProperty', 'Wishlist', 'ProfileStack'];
  const currentRouteName = state.routes[state.index].name;

  if (hiddenRoutes.includes(currentRouteName)) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = TAB_LABELS[route.name];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName: string;
        if (isFocused) {
          iconName = ActiveTabIcons[route.name] || 'circle';
        } else {
          iconName = TabIcons[route.name] || 'circle';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            {isFocused ? (
              <Icons.MI name={iconName} color={Colors.primary} size={18}
              />
            ) : (
              <Icons.FA name={iconName} color={Colors.grey400} size={18} />
            )}

            <Text style={[styles.label, isFocused && styles.focusedLabel]}>
              {label === 'AddProperty' ? 'Add' : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white100,
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth: 2,
    // borderColor: Colors.primary,
    // elevation: 8,
    // shadowColor: Colors.black,
    // shadowOffset: { width: 0, height: -4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.grey400,
    marginTop: 4,
    fontFamily: Fonts.Regular,
  },
  focusedLabel: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
