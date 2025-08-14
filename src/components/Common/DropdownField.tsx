import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownFieldProps {
	label: string;
	options: string[];
	selectedValue: string;
	onValueChange: (value: string) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
	label,
	options,
	selectedValue,
	onValueChange,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.pickerWrapper}>
				<Picker
					selectedValue={selectedValue}
					onValueChange={onValueChange}
				>
					<Picker.Item label={`Select ${label}`} value="" />
					{options.map((option) => (
						<Picker.Item
							key={option}
							label={option}
							value={option}
						/>
					))}
				</Picker>
			</View>
		</View>
	);
};

export default DropdownField;

const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
	},
	label: {
		marginBottom: 4,
		fontWeight: "600",
	},
	pickerWrapper: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 6,
		backgroundColor: "#f9f9f9",
	},
});
