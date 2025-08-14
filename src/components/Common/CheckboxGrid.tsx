import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Colors, TextSizes } from '../../constants';
import AppText from '../AppTheme/AppText';

type CheckboxGridProps = {
	options: string[];
	selected: string[];
	onToggle: (item: string) => void;
};

const CheckboxGrid: React.FC<CheckboxGridProps> = ({
	options,
	selected,
	onToggle,
}) => {
	return (
		<View style={styles.grid}>
			{options.map((item) => (
				<TouchableOpacity
					key={item}
					onPress={() => onToggle(item)}
					style={[
						styles.box,
						selected.includes(item) && styles.selectedBox,
					]}
				>
					<AppText
						style={[
							styles.label,
							selected.includes(item) && styles.selectedText,
						]}
					>
						{item}
					</AppText>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default CheckboxGrid;

const styles = StyleSheet.create({
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	box: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		marginVertical: 5,
	},
	selectedBox: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	label: {
		color: '#333',
		fontSize: TextSizes.sm,
	},
	selectedText: { color: '#fff' },
});
