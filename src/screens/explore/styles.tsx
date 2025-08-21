import { StyleSheet } from 'react-native';
import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.white,
	},

	// Header Styles
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: Spacing.lg,
		paddingVertical: Spacing.md,
		backgroundColor: Colors.white,
		borderBottomWidth: 1,
		borderBottomColor: Colors.grey200,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},

	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.grey100,
		alignItems: 'center',
		justifyContent: 'center',
	},

	headerTitle: {
		fontSize: TextSizes.lg,
		color: Colors.grey900,
		flex: 1,
		textAlign: 'center',
		marginHorizontal: Spacing.md,
	},

	headerResetButton: {
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		borderRadius: 20,
		backgroundColor: Colors.grey100,
	},

	headerResetText: {
		fontSize: TextSizes.sm,
		color: Colors.primary,
		fontWeight: '600',
	},

	// Scroll Container
	scrollContainer: {
		flex: 1,
		backgroundColor: Colors.grey50,
	},

	scrollContentContainer: {
		paddingVertical: Spacing.md,
	},

	// Filter Section
	filterSection: {
		backgroundColor: Colors.white,
		marginHorizontal: Spacing.lg,
		marginBottom: Spacing.md,
		borderRadius: 16,
		padding: Spacing.lg,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 8,
	},

	lastSection: {
		marginBottom: 0,
	},

	// Section Headers
	sectionHeaderContainer: {
		marginBottom: Spacing.md,
	},

	sectionTitle: {
		fontSize: TextSizes.md,
		color: Colors.grey900,
		marginBottom: 4,
	},

	sectionSubtitle: {
		fontSize: TextSizes.sm,
		color: Colors.grey600,
		lineHeight: 18,
	},

	// Search Container
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.grey50,
		borderRadius: 12,
		paddingHorizontal: Spacing.md,
		height: 52,
		borderWidth: 1.5,
		borderColor: Colors.primary,
		marginVertical: 8,
		marginHorizontal: 16,
	},

	searchIcon: {
		marginRight: Spacing.sm,
	},

	searchInput: {
		flex: 1,
		fontSize: TextSizes.md,
		color: Colors.grey900,
		fontFamily: Fonts.Regular,
	},

	clearButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: Colors.grey200,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: Spacing.sm,
	},

	// Picker Styles
	pickerContainer: {
		marginTop: 4,
	},

	pickerWrapper: {
		backgroundColor: Colors.grey50,
		borderRadius: 12,
		borderWidth: 1.5,
		borderColor: Colors.grey200,
		overflow: 'hidden',
		height: 52,
		justifyContent: 'center',
	},

	picker: {
		height: 52,
		color: Colors.grey900,
		backgroundColor: Colors.white150,
	},

	pickerItem: {
		backgroundColor: Colors.white150,
		fontFamily: Fonts.Regular,
		borderWidth: 1,
		borderBottomColor: Colors.grey200,
	},

	// Price Container
	priceContainer: {
		marginTop: 4,
	},

	priceDisplayContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.grey50,
		borderRadius: 12,
		padding: Spacing.md,
		marginBottom: Spacing.lg,
	},

	priceValueContainer: {
		flex: 1,
		alignItems: 'center',
	},

	priceLabel: {
		fontSize: TextSizes.xs,
		color: Colors.grey600,
		marginBottom: 4,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},

	priceValue: {
		fontSize: TextSizes.lg,
		color: Colors.grey900,
	},

	priceSeparator: {
		width: 2,
		height: 20,
		backgroundColor: Colors.grey300,
		marginHorizontal: Spacing.md,
	},

	// Slider Styles
	sliderWrapper: {
		paddingHorizontal: 4,
	},

	sliderContainer: {
		height: 40,
		marginBottom: Spacing.sm,
	},

	sliderTrack: {
		height: 4,
		borderRadius: 2,
	},

	sliderThumb: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: Colors.white,
		borderWidth: 3,
		borderColor: Colors.primary,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},

	sliderLabels: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
	},

	sliderLabel: {
		fontSize: TextSizes.xs,
		color: Colors.grey500,
	},

	// Multi Select Container
	multiSelectContainer: {
		marginTop: 4,
	},

	// Action Container
	actionContainer: {
		backgroundColor: Colors.white,
		borderTopWidth: 1,
		borderTopColor: Colors.grey200,
		paddingTop: Spacing.md,
		paddingBottom: Spacing.lg,
		paddingHorizontal: Spacing.lg,
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},

	buttonContainer: {
		flexDirection: 'row',
		gap: Spacing.md,
	},

	resetButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.grey100,
		borderWidth: 1.5,
		borderColor: Colors.grey300,
		paddingVertical: Spacing.md,
		paddingHorizontal: Spacing.base,
		borderRadius: 12,
		gap: Spacing.sm,
	},

	applyButton: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary,
		paddingVertical: Spacing.md,
		borderRadius: 12,
		gap: Spacing.sm,
		elevation: 4,
		shadowColor: Colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},

	resetText: {
		color: Colors.grey600,
		fontSize: TextSizes.md,
	},

	applyText: {
		color: Colors.white,
		fontSize: TextSizes.md,
	},

	bottomSpacing: {
		height: 20,
	},

	divider: {
		height: 1,
		backgroundColor: Colors.grey200,
		marginVertical: Spacing.sm,
	},

	activityIndicator: {
		marginTop: 20,
	},

	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		paddingHorizontal: 16,
	},

	priceText: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.grey900,
		textAlign: 'center',
		marginBottom: 16,
	},

	filterButton: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: Colors.grey200,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginRight: 8,
		marginBottom: 8,
	},

	selectedFilterButton: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},

	filterButtonText: {
		color: Colors.grey900,
		fontSize: 14,
	},

	selectedFilterButtonText: {
		color: 'white',
	},

	checkbox: {
		width: 22,
		height: 22,
		borderWidth: 1,
		borderColor: Colors.grey200,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},

	selectedCheckbox: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},

	amenityText: {
		fontSize: 14,
		color: Colors.grey900,
	},

	applyIcon: {
		marginLeft: 4,
	},
});

export default styles;
