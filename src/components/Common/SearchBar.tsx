import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors, TextSizes, Spacing, Fonts } from '../../constants';
import Icons from '../../constants/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppText from '../AppTheme/AppText';

const placeholderTexts = [
  'Location',
  'Price Range',
  'Features',
  'Amenities',
];

const SearchBar = () => {
  const navigation = useNavigation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value for opacity

  // Animation effect for text fade-in/fade-out
  useEffect(() => {
    const animateText = () => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Update text after fade-out
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    };

    // Start animation and set interval for text change
    const interval = setInterval(animateText, 3000); // Change text every 3 seconds

    // Initial fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ExploreStack' as any, { screen: 'Filters' } as any)}
    >
      <View style={styles.searchBar}>
        <LinearGradient
          colors={[Colors.blue100, Colors.blue300]}
          style={styles.searchButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icons.FA name="search" size={20} color={Colors.white100} />
        </LinearGradient>

		<Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
			<View style={styles.placeholderRow}>
				<Icons.FA
					name={
						currentTextIndex === 0 ? 'map-marker' :
						currentTextIndex === 1 ? 'rupee' :
						currentTextIndex === 2 ? 'star' :
						'th-list'
					}
					size={14}
					color={Colors.primary}
					style={styles.placeholderIcon}
				/>
				<AppText style={styles.searchText}>
					Search by {placeholderTexts[currentTextIndex]}
				</AppText>
			</View>
		</Animated.View>


        <LinearGradient
          colors={[Colors.blue100, Colors.blue300]}
          style={styles.filterButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icons.FA name="sliders" size={20} color="#fff" />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
	searchBar: {
		width: '90%',
		height: 56,
		backgroundColor: Colors.white150,
		margin: Spacing.sm,
		borderTopLeftRadius: 28,
		borderTopRightRadius: 8,
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 8,
		borderWidth: 1.5,
		borderColor: Colors.primary,
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchText: {
		flex: 1,
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.md,
		color: Colors.textGrey,
		marginLeft: 4,
	},
	searchButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterButton: {
		width: 40,
		height: 40,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
	animatedView: {
		flex: 1,
		// alignSelf: 'center',
		// alignItems: 'center',
		justifyContent: 'center',
	},
	placeholderRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 8,
	},
	placeholderIcon: {
		top: -1,
	},
});
