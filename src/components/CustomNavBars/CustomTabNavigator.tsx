import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const Icons: Record<string, string> = {
  Home: 'home',
  // ExploreProperties: 'search',
  Filters: 'search',
  AddProperty: 'plus-square',
  Wishlist: 'heart',
  Profile: 'user',
};

const ActiveIcons: Record<string, string> = {
  Home: 'home',
  // ExploreProperties: 'home-search',
  Filters: 'home-search',
  AddProperty: 'home-plus',
  Wishlist: 'home-heart',
  Profile: 'account-circle',
};

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const hiddenRoutes = ['Filters', 'AddProperty', 'Wishlist', 'Profile'];
  const currentRouteName = state.routes[state.index].name;

  if (hiddenRoutes.includes(currentRouteName)) {
    return null;  // Hide tab bar on these screens
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = route.name;
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
          iconName = ActiveIcons[route.name] || 'circle';
        } else {
          iconName = Icons[route.name] || 'circle';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            {isFocused ? (
              <MCI
                name={iconName}
                color="#fff"
                size={28}
              />
            ) : (
              <FA
                name={iconName}
                color="#fff"
                size={24}
              />
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
    backgroundColor: '#4C74FF',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 4,
  },
  focusedLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
