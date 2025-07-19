import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MultiSelectButton = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={[styles.circle, selected === option && styles.selected]}
        >
          <Text style={[styles.label, selected === option && styles.selectedLabel]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiSelectButton;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  circle: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  label: { color: '#333' },
  selectedLabel: { color: '#fff' },
});
