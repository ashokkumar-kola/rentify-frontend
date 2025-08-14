import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, TextSizes } from '../../constants';
import AppText from '../AppTheme/AppText';

type Option<T> = { label: string; value: T };

type MultiSelectButtonProps<T> = {
  options: readonly Option<T>[];
  selected: readonly T[];
  onSelect: (newSelected: T[]) => void;
};

const MultiSelectButton = <T,>({
  options,
  selected,
  onSelect,
}: MultiSelectButtonProps<T>) => {
  const toggleSelection = (prev: T[], value: T): T[] => {
    const hasAny = options.length > 0 && options[0].label.toLowerCase() === 'any';
    if (hasAny && value === options[0].value) {
      return [value];
    }
    const newSelection = prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev.filter((item) => !(hasAny && item === options[0].value)), value];

    return hasAny && newSelection.length === 0 ? [options[0].value] : newSelection;
  };

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <TouchableOpacity
            key={String(option.value)}
            onPress={() => onSelect(toggleSelection(selected, option.value))}
            style={[styles.circle, isSelected && styles.selected]}
          >
            <AppText style={[styles.label, isSelected && styles.selectedLabel]}>
              {option.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MultiSelectButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  circle: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    color: '#333',
    fontSize: TextSizes.sm,
  },
  selectedLabel: {
    color: Colors.white,
    fontSize: TextSizes.sm,
  },
});

// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Colors, TextSizes } from '../../constants';
// import AppText from '../AppTheme/AppText';

// type Option = { label: string; value: any };

// type MultiSelectButtonProps = {
// 	options: Option[];
// 	selected: string[] | null;
// 	onSelect: (newSelected: string[]) => void;
// };

// const toggleSelection = (prev: string[], value: string) => {
//   if (value === 'Any') {return ['Any'];}
//   const newSelection = prev.includes(value)
//     ? prev.filter((item) => item !== value)
//     : [...prev.filter((item) => item !== 'Any'), value];
//   return newSelection.length === 0 ? ['Any'] : newSelection;
// };

// const MultiSelectButton: React.FC<MultiSelectButtonProps> = ({
//   options,
//   selected,
//   onSelect,
// }) => {
//   return (
//     <View style={styles.row}>
//       {options.map((option) => {
//         const isSelected = selected.includes(option.value);
//         return (
//           <TouchableOpacity
//             key={option.value}
//             onPress={() => onSelect(toggleSelection(selected, option.value))}
//             style={[
//               styles.circle,
//               isSelected && styles.selected,
//             ]}
//           >
//             <AppText
//               style={[
//                 styles.label,
//                 isSelected && styles.selectedLabel,
//               ]}
//             >
//               {option.label}
//             </AppText>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// export default MultiSelectButton;

// const styles = StyleSheet.create({
// 	row: {
// 		flexDirection: 'row',
// 		gap: 8,
// 		flexWrap: 'wrap',
// 	},
// 	circle: {
// 		borderWidth: 1,
// 		borderColor: '#ccc',
// 		paddingVertical: 5,
// 		paddingHorizontal: 12,
// 		borderRadius: 20,
// 	},
// 	selected: {
// 		backgroundColor: Colors.primary,
// 		borderColor: Colors.primary,
// 	},
// 	label: {
// 		color: '#333',
// 		fontSize: TextSizes.sm,
// 	},
// 	selectedLabel: {
// 		color: Colors.white,
// 		fontSize: TextSizes.sm,
// 	},
// });
