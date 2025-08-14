import { StyleSheet } from 'react-native';

// import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/appUtils/dimensions';

import { Colors, TextSizes, Spacing, Fonts } from '../../constants';

// console.log('Stylesheet for Properties loaded');

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.white150,
	},

	scrollContainer: {
		flex: 1,
		paddingBottom: 80,
		marginBottom: 160,
		paddingHorizontal: 16,
	},

	activityIndicator: {
		marginTop: 20,
	},

	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		paddingHorizontal: 16,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		paddingHorizontal: 16,
		marginVertical: 16,
		height: 50,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		borderWidth: 1,
		borderColor: Colors.primary,
		// marginHorizontal: 16,
	},

	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		height: '100%',
		fontSize: 16,
		color: '#101010',
	},

	// Property Type
	pickerWrapper: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		overflow: 'hidden',
		marginBottom: 16,
	},

	sectionTitle: {
		fontSize: TextSizes.md,
		fontWeight: '600',
		color: Colors.grey900,
		marginVertical: 12,
		marginLeft: 4,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.grey200,
		marginVertical: 8,
	},
	priceContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 16,
		marginBottom: 8,
	},
	priceText: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.grey900,
		textAlign: 'center',
		marginBottom: 16,
	},
	sliderContainer: {
		marginHorizontal: 4,
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
	buttonContainer: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 8,
		paddingVertical: 8,
		marginTop: 16,
		// backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: Colors.grey200,
	},
	resetButton: {
		flex: 1,
		// marginRight: 8,
		backgroundColor: Colors.white100,
		borderColor: Colors.grey200,
		borderWidth: 1,
		padding: 14,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	applyButton: {
		flex: 2,
		// marginLeft: 8,
		backgroundColor: Colors.primary,
		padding: 8,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	resetText: {
		color: Colors.black100,
		fontWeight: '600',
		fontSize: TextSizes.md,
	},
	applyText: {
		color: 'white',
		fontWeight: '600',
		fontSize: TextSizes.md,
		marginRight: 8,
	},
	applyIcon: {
		marginLeft: 4,
	},
});

export default styles;
