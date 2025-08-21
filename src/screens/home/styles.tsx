import { StyleSheet, Dimensions } from 'react-native';
import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Main container styles
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  mainContainer: {
    flexGrow: 1,
    paddingBottom: Spacing.xl || 24,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl || 24,
  },

  loadingText: {
    fontSize: TextSizes.md || 16,
    color: Colors.grey600 || '#6b7280',
    marginTop: Spacing.md || 16,
    textAlign: 'center',
  },

  // Banner section
  bannerContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg || 20,
    paddingTop: Spacing.md || 16,
    paddingBottom: Spacing.xl || 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  sloganWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
	marginTop: Spacing.md || 14,
    marginBottom: Spacing.base || 20,
    paddingHorizontal: Spacing.xs || 8,
  },

  sloganText: {
    fontSize: TextSizes.md || 18,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: Spacing.sm || 8,
    fontFamily: Fonts.SemiBold,
    letterSpacing: 0.5,
  },

  // Property sections
  propertySection: {
    marginTop: Spacing.xl || 24,
    paddingHorizontal: Spacing.base || 16,
  },

  sectionTitle: {
    fontSize: TextSizes.xl || 24,
    fontFamily: Fonts.SemiBold,
    color: Colors.grey900 || '#111827',
    marginBottom: Spacing.md || 16,
    marginLeft: 4,
  },

  // FlatList containers
  flatListContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  // Empty state
  emptySection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['2xl'] || 32,
    backgroundColor: Colors.grey50 || '#f9fafb',
    borderRadius: 12,
    marginHorizontal: 4,
  },

  emptyText: {
    fontSize: TextSizes.sm || 14,
    color: Colors.grey500 || '#6b7280',
    textAlign: 'center',
  },

  // Legacy styles for backward compatibility
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: Spacing.xl || 24,
  },

  main: {
    flex: 1,
    paddingHorizontal: Spacing.lg || 20,
  },

  // Additional performance optimizations
  listItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Section headers with better spacing
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md || 16,
    paddingHorizontal: 4,
  },

  sectionHeaderTitle: {
    fontSize: TextSizes.xl || 24,
    fontFamily: Fonts.Bold,
    color: Colors.grey900 || '#111827',
  },

  sectionHeaderAction: {
    paddingHorizontal: Spacing.md || 16,
    paddingVertical: Spacing.sm || 8,
    backgroundColor: `${Colors.primary}15`,
    borderRadius: 20,
  },

  sectionHeaderActionText: {
    fontSize: TextSizes.sm || 14,
    color: Colors.primary,
    fontFamily: Fonts.Medium,
  },

  // Card containers with consistent spacing
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 6,
    padding: Spacing.md || 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Optimized image containers
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.grey200 || '#e5e7eb',
  },

  propertyImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },

  // Button styles for better interaction
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: Spacing.md || 16,
    paddingHorizontal: Spacing.lg || 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  actionButtonText: {
    color: Colors.white,
    fontSize: TextSizes.md || 16,
    fontFamily: Fonts.SemiBold,
  },

  secondaryButton: {
    backgroundColor: Colors.grey100 || '#f3f4f6',
    borderRadius: 12,
    paddingVertical: Spacing.sm || 12,
    paddingHorizontal: Spacing.md || 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey300 || '#d1d5db',
  },

  secondaryButtonText: {
    color: Colors.grey700 || '#374151',
    fontSize: TextSizes.sm || 14,
    fontFamily: Fonts.Medium,
  },

  // Spacing utilities
  spacing: {
    xs: Spacing.xs || 4,
    sm: Spacing.sm || 8,
    md: Spacing.md || 16,
    lg: Spacing.lg || 20,
    xl: Spacing.xl || 24,
    xxl: Spacing['2xl'] || 32,
  },

  // Text utilities
  textPrimary: {
    color: Colors.grey900 || '#111827',
  },

  textSecondary: {
    color: Colors.grey600 || '#6b7280',
  },

  textAccent: {
    color: Colors.primary,
  },

  // Layout utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  // Performance optimization classes
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
  },

  // Responsive design utilities
  responsiveContainer: {
    width: SCREEN_WIDTH - (Spacing.lg * 2 || 40),
    maxWidth: 400,
    alignSelf: 'center',
  },

  fullWidth: {
    width: '100%',
  },

  // Animation and transition support
  fadeIn: {
    opacity: 1,
  },

  fadeOut: {
    opacity: 0.5,
  },

  // Error and success states
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md || 16,
    margin: Spacing.md || 16,
  },

  errorText: {
    color: '#dc2626',
    fontSize: TextSizes.sm || 14,
    textAlign: 'center',
  },

  successContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md || 16,
    margin: Spacing.md || 16,
  },

  successText: {
    color: '#16a34a',
    fontSize: TextSizes.sm || 14,
    textAlign: 'center',
  },
});

export default styles;

// import { StyleSheet } from 'react-native';

// // import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/appUtils/dimensions';

// import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

// // console.log('Stylesheet for HomeScreen loaded');

// const styles = StyleSheet.create({
// 	safeArea: {
// 		flex: 1,
// 		backgroundColor: Colors.white150,
// 	},

// 	scrollContainer: {
// 		paddingBottom: 80,
// 	},

// 	// Banner
// 	bannerContainer: {
// 		alignItems: 'center',
// 		// justifyContent: 'center',
// 		gap: 0,
// 	},
// 	sloganWrapper: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		// alignItems: 'center',
// 		gap: 8,
// 		marginTop: Spacing.base,
// 		// marginBottom: Spacing.base,
// 		paddingHorizontal: Spacing.sm,
// 		paddingVertical: Spacing.sm,
// 		borderRadius: 12,
// 		// backgroundColor: 'rgba(0,0,0,0.6)',
// 	},
// 	sloganText: {
// 		fontSize: TextSizes.base,
// 		color: Colors.primary,
// 		textAlign: 'center',
// 	},

// 	// Section Styles
// 	main: {
// 		marginVertical: 16,
// 	},
// 	propertySection: {
// 		// paddingHorizontal: 16,
// 		// marginBottom: 16,
// 	},
// 	sectionTitle: {
// 		marginLeft: Spacing.base,
// 		marginBottom: Spacing.md,
// 		fontFamily: Fonts.SemiBold,
// 		fontSize: TextSizes.base,
// 		// marginTop: 8,
// 		color: Colors.black100,
// 	},

// 	// FlatList Styles
// 	flatListContainer: {
// 		// paddingLeft: 16,
// 		// paddingRight: 8,
// 		marginBottom: Spacing.base,
// 	},
// });

// export default styles;

// // content: {
// //   paddingTop: 80, // adjust based on Header height
// //   paddingBottom: Spacing.xl * 2,
// // },

// //   loaderContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   filterContainer: {
// //     padding: 16,
// //     backgroundColor: Colors.blue50,
// //     borderRadius: 8,
// //     margin: 16,
// //     shadowColor: Colors.black,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 4,
// //     justifyContent: 'center',
// //   },
// //   filterHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   filterTitle: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: Colors.primary,
// //     flex: 1,
// //     paddingRight: 12,
// //     fontFamily: 'Poppins-Medium',
// //   },
// //   filterButton: {
// //     backgroundColor: Colors.primary,
// //     padding: 10,
// //     borderRadius: 12,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 2,
// //     elevation: 3,
// //   },

// //   headerLeft: {
// //     marginLeft: 16,
// //   },
// //   greetingText: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#333',
// //     marginHorizontal: 16,
// //     marginTop: 12,
// //     marginBottom: 8,
// //   },
// //   // sectionTitle: {
// //   //   fontSize: 20,
// //   //   fontWeight: '700',
// //   //   color: '#333',
// //   //   marginHorizontal: 16,
// //   //   marginVertical: 10,
// //   // },
// //   // propertySection: {
// //   //   marginBottom: 20,
// //   // },
