import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/appUtils/dimensions';

import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

const baseLabelText = {
	color: Colors.white,
	fontSize: TextSizes.xs,
	fontFamily: Fonts.Medium,
	textTransform: 'uppercase',
	textAlign: 'center',
} as const;

const styles = StyleSheet.create({
	card: {
		width: SCREEN_WIDTH * 0.725,
		backgroundColor: Colors.white,
		borderRadius: 16,
		// marginVertical: Spacing.md,
		marginHorizontal: Spacing.base,
		marginRight: Spacing.md,
		elevation: 5,
		shadowColor: Colors.black,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		alignSelf: 'center',
		overflow: 'hidden',
	},

	newArrivalTag: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: Colors.warning,
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderRadius: 12,
		zIndex: 10,
	},
	featuredTag: {
		width: 140,
		position: 'absolute',
		top: 12,
		left: -40,
		backgroundColor: Colors.success,
		paddingVertical: 4,
		paddingHorizontal: 12,
		alignItems: 'center',
		transform: [{ rotate: '-45deg' }],
		zIndex: 10,
	},
	popularTag: {
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: Colors.primary,
		paddingVertical: 4,
		paddingHorizontal: 12,
		// borderTopRightRadius: 8,
		borderBottomRightRadius: 16,
		// flex: 0,
		zIndex: 10,
	},

	newArrivalText: {
		...baseLabelText,
		letterSpacing: 1,
	},
	popularText: {
		...baseLabelText,
		letterSpacing: 1,
	},
	featuredText: {
		...baseLabelText,
		letterSpacing: 1,
	},

	imageContainer: {
		position: 'relative',
		height: 160,
		backgroundColor: Colors.grey100,
		borderRadius: 16,
		overflow: 'hidden',
	},
	propertyImage: {
		// width: SCREEN_WIDTH * 0.6,
		width: '100%',
		height: '100%',
		// borderRadius: 16,
		// marginRight: 12,
	},

	heartIcon: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: '#00000080',
		borderRadius: 20,
		padding: 6,
	},

	scrollContent: {
		paddingVertical: 4,
		paddingHorizontal: 4,
	},
	detailsContainer: {
		padding: Spacing.md,
	},

	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 8,
	},
	titleLocation: {
		flex: 1,
		paddingRight: 8,
	},
	title: {
		fontFamily: Fonts.Medium,
		fontSize: 12,
		color: Colors.black,
		marginBottom: 2,
	},
	location: {
		fontFamily: Fonts.Regular,
		fontSize: 12,
		color: Colors.grey600,
	},

	priceContainer: {
		alignItems: 'flex-end',
	},
	price: {
		fontFamily: Fonts.Medium,
		fontSize: 14,
		color: Colors.primary,
	},
	deposit: {
		fontFamily: Fonts.Regular,
		fontSize: 10,
		color: Colors.grey600,
	},

	// divider: {
	//   height: 1,
	//   backgroundColor: Colors.grey200,
	//   marginVertical: 10,
	// },

	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	infoBox: {
		alignItems: 'center',
		backgroundColor: Colors.blue50,
		paddingVertical: 8,
		borderRadius: 10,
		width: '31%',
	},
	infoText: {
		fontFamily: Fonts.Regular,
		fontSize: 10,
		color: Colors.black,
	},
});

export default styles;
