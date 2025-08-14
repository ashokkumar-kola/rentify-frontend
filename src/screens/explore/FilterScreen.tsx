import React, { useCallback } from 'react';
import {
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useFilters } from '../../contexts/FilterContext';

import { Slider } from '@miblanchard/react-native-slider';
import { Picker } from '@react-native-picker/picker';
import MultiSelectButton from '../../components/Common/MultiSelectButton';
// import CheckboxGrid from '../../components/Common/CheckboxGrid';

import AppText from '../../components/AppTheme/AppText';

import styles from './styles';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';

import { propertyTypes, amenitiesList } from '../../constants/Filters';

// import { useNavigation } from '@react-navigation/native';
// import SearchBar from '../../components/Common/SearchBar';
// import useFilterProperties from '../../hooks/propertyHooks/useFilterProperties';

const bedroomOptions = [
  { label: 'Any', value: null },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 }, // 4 means 4 or more
] as const;

const bathroomOptions = [
  { label: 'Any', value: null },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 },
] as const;

const amenitiesOptions = [
  { label: 'Any', value: null },
  ...amenitiesList.map((item) => ({ label: item, value: item })),
];

const furnishingOptions = [
  { label: 'Any', value: null },
  { label: 'Furnished', value: 'furnished' },
  { label: 'Unfurnished', value: 'unfurnished' },
  { label: 'Partially', value: 'partially' },
];


const FilterScreen: React.FC = ({ navigation }: any) => {
	const { filters, setFilters, resetFilters } = useFilters();

	const applyFilters = useCallback(async () => {
		if (filters.min_price > filters.max_price) {
			Alert.alert('Invalid Range', 'Min price cannot exceed max price.');
			return;
		}
		navigation.navigate('Properties');
	}, [filters, navigation]);


	// Reset all filters
	const handleReset = () => {
		resetFilters();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollContainer}>
				{/* Search By Location */}
				<View style={styles.searchContainer}>
					<Icons.MI name="search" size={20} color={Colors.primary} style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search by location or property name"
						placeholderTextColor={Colors.grey600}
						value={filters.location}
						onChangeText={(text) => setFilters({ location: text })}
					/>
				</View>

				{/* Property Type */}
				<AppText weight="Medium" style={styles.sectionTitle}>Property Type</AppText>
				{/* <CheckboxGrid
					options={propertyTypes}
					selected={selectedPropertyTypes}
					onToggle={(item) =>
						toggleSelection(
							selectedPropertyTypes,
							item,
							setSelectedPropertyTypes
						)
					}
				/> */}
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={filters.property_type}
						onValueChange={(value) => setFilters({ property_type: value })}
					>
						<Picker.Item label="Select Property type" value={filters.property_type} color={Colors.black} />
							{propertyTypes.map((type) => (
							<Picker.Item key={type} label={type} value={type} />
						))}
					</Picker>
				</View>

				<View style={styles.divider} />

				{/* Price Range */}
				<AppText weight="Medium" style={styles.sectionTitle}>Price Range (per month)</AppText>
				<View style={styles.priceContainer}>
					<AppText style={styles.priceText}>
						${filters.min_price} - ${filters.max_price}
					</AppText>
					<Slider
						minimumValue={0}
						maximumValue={100000}
						step={100}
						value={[filters.min_price, filters.max_price]}
						onValueChange={([min, max]) => setFilters({ min_price: min, max_price: max })}
						minimumTrackTintColor={Colors.primary}
						maximumTrackTintColor={Colors.grey400}
						thumbTintColor={Colors.primary}
						containerStyle={styles.sliderContainer}
					/>
				</View>

				<View style={styles.divider} />

				{/* Bedrooms */}
				<AppText weight="Medium" style={styles.sectionTitle}>Bedrooms</AppText>
				<MultiSelectButton<number | null>
					options={bedroomOptions}
					selected={filters.bedrooms ?? [null]}
					onSelect={(selected) =>
					setFilters({ bedrooms: selected.includes(null) ? null : selected as number[] })
					}
				/>

				<View style={styles.divider} />

				{/* Bathrooms */}
				<AppText weight="Medium" style={styles.sectionTitle}>Bathrooms</AppText>
				<MultiSelectButton<number | null>
					options={bathroomOptions}
					selected={filters.bathrooms ?? [null]}
					onSelect={(selected) =>
					setFilters({ bathrooms: selected.includes(null) ? null : selected as number[] })
					}
				/>

				<View style={styles.divider} />

				{/* Amenities */}
				<AppText weight="Medium" style={styles.sectionTitle}>Amenities</AppText>
				<MultiSelectButton<string | null>
					options={amenitiesOptions}
					selected={filters.amenities ?? [null]}
					onSelect={(newSelected) =>
					setFilters({ amenities: newSelected.includes(null) ? null : newSelected as string[] })
					}
				/>

				{/* Furnishing */}
				<AppText style={styles.sectionTitle}>Furnishing</AppText>
					<MultiSelectButton<string | null>
					options={furnishingOptions}
					selected={filters.furnishing === null ? [null] : [filters.furnishing]}
					onSelect={(newSelected) =>
						setFilters({
						furnishing: newSelected.includes(null) ? null : (newSelected[0] ?? null),
						})
					}
				/>


			{/* </ScrollView> */}
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleReset}
					style={styles.resetButton}
				>
					<AppText style={styles.resetText}>Reset All</AppText>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={applyFilters}
					style={styles.applyButton}
				>
					<AppText style={styles.applyText}>Show Results</AppText>
					<Icons.MI name="arrow-forward" size={18} color={Colors.white} style={styles.applyIcon} />
				</TouchableOpacity>
			</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default FilterScreen;
