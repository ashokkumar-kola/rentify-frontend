import { StyleSheet } from 'react-native';

// import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/appUtils/dimensions';

import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

// console.log('Stylesheet for HomeScreen loaded');

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.white150,
	},

	scrollContainer: {
		paddingBottom: 80,
	},

	// Banner
	bannerContainer: {
		alignItems: 'center',
		// justifyContent: 'center',
		gap: 0,
	},
	sloganWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		// alignItems: 'center',
		gap: 8,
		marginTop: Spacing.base,
		// marginBottom: Spacing.base,
		paddingHorizontal: Spacing.sm,
		paddingVertical: Spacing.sm,
		borderRadius: 12,
		// backgroundColor: 'rgba(0,0,0,0.6)',
	},
	sloganText: {
		fontSize: TextSizes.base,
		color: Colors.primary,
		textAlign: 'center',
	},

	// Section Styles
	main: {
		marginVertical: 16,
	},
	propertySection: {
		// paddingHorizontal: 16,
		// marginBottom: 16,
	},
	sectionTitle: {
		marginLeft: Spacing.base,
		marginBottom: Spacing.md,
		fontFamily: Fonts.SemiBold,
		fontSize: TextSizes.base,
		// marginTop: 8,
		color: Colors.black100,
	},

	// FlatList Styles
	flatListContainer: {
		// paddingLeft: 16,
		// paddingRight: 8,
		marginBottom: Spacing.base,
	},
});

export default styles;

// content: {
//   paddingTop: 80, // adjust based on Header height
//   paddingBottom: Spacing.xl * 2,
// },

//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterContainer: {
//     padding: 16,
//     backgroundColor: Colors.blue50,
//     borderRadius: 8,
//     margin: 16,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//     justifyContent: 'center',
//   },
//   filterHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   filterTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Colors.primary,
//     flex: 1,
//     paddingRight: 12,
//     fontFamily: 'Poppins-Medium',
//   },
//   filterButton: {
//     backgroundColor: Colors.primary,
//     padding: 10,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },

//   headerLeft: {
//     marginLeft: 16,
//   },
//   greetingText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginHorizontal: 16,
//     marginTop: 12,
//     marginBottom: 8,
//   },
//   // sectionTitle: {
//   //   fontSize: 20,
//   //   fontWeight: '700',
//   //   color: '#333',
//   //   marginHorizontal: 16,
//   //   marginVertical: 10,
//   // },
//   // propertySection: {
//   //   marginBottom: 20,
//   // },
