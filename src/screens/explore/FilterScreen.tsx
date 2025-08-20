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

import AppText from '../../components/AppTheme/AppText';

import styles from './styles';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';

import { propertyTypes, amenitiesList } from '../../constants/Filters';

const bedroomOptions = [
  { label: 'Any', value: null },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4+', value: 4 },
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

// SectionHeader component moved outside FilterScreen
interface SectionHeaderProps {
	title: string;
	subtitle?: string | null;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle = null }) => (
	<View style={styles.sectionHeaderContainer}>
		<AppText weight="SemiBold" style={styles.sectionTitle}>
			{title}
		</AppText>
		{subtitle && (
			<AppText style={styles.sectionSubtitle}>
				{subtitle}
			</AppText>
		)}
	</View>
);

const FilterScreen: React.FC = ({ navigation }: any) => {
	const { filters, setFilters, resetFilters } = useFilters();

	const applyFilters = useCallback(async () => {
		if (filters.min_price > filters.max_price) {
			Alert.alert('Invalid Range', 'Min price cannot exceed max price.');
			return;
		}
		navigation.navigate('Properties');
	}, [filters, navigation]);

	const handleReset = () => {
		resetFilters();
	};

	// FilterSection component moved outside FilterScreen
	interface FilterSectionProps {
		children: React.ReactNode;
		style?: object;
	}

	// FilterSection component moved outside FilterScreen
	interface FilterSectionProps {
		children: React.ReactNode;
		style?: object;
	}

	const FilterSection: React.FC<FilterSectionProps> = ({ children, style = {} }) => (
		<View style={[styles.filterSection, style]}>
			{children}
		</View>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* Header */}
			<View style={styles.headerContainer}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Icons.MI name="arrow-back" size={24} color={Colors.grey900} />
				</TouchableOpacity>
				<AppText weight="SemiBold" style={styles.headerTitle}>
					Filter Properties
				</AppText>
				{/* <TouchableOpacity onPress={handleReset} style={styles.headerResetButton}>
					<AppText style={styles.headerResetText}>Reset</AppText>
				</TouchableOpacity> */}
			</View>

			<ScrollView
				style={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContentContainer}
			>
				{/* Search Location */}
				{/* <FilterSection>
					<SectionHeader
						title="Location"
						subtitle="Search by area or property name"
					/> */}
					<View style={styles.searchContainer}>
						<Icons.MI name="search" size={20} color={Colors.primary} style={styles.searchIcon} />
						<TextInput
							style={styles.searchInput}
							placeholder="Enter city, location..."
							placeholderTextColor={Colors.grey500}
							value={filters.location}
							onChangeText={(text) => setFilters({ location: text })}
						/>
						{filters.location && (
							<TouchableOpacity
								onPress={() => setFilters({ location: '' })}
								style={styles.clearButton}
							>
								<Icons.MI name="close" size={18} color={Colors.grey400} />
							</TouchableOpacity>
						)}
					</View>
				{/* </FilterSection> */}

				{/* Property Type */}
				<FilterSection>
					<SectionHeader title="Property Type" />
					<View style={styles.pickerContainer}>
						<View style={styles.pickerWrapper}>
							<Picker
								selectedValue={filters.property_type || ''}
								onValueChange={(value) => setFilters({ property_type: value || null })}
								style={styles.picker}
							>
								<Picker.Item
									label="All Property Types"
									value=""
									color={Colors.grey500}
								/>
								{propertyTypes.map((type) => (
									<Picker.Item
										key={type}
										label={type}
										value={type}
										color={Colors.grey900}
									/>
								))}
							</Picker>
						</View>
					</View>
				</FilterSection>

				{/* Price Range */}
				<FilterSection>
					<SectionHeader
						title="Price Range"
						subtitle="Monthly rent in USD"
					/>
					<View style={styles.priceContainer}>
						<View style={styles.priceDisplayContainer}>
							<View style={styles.priceValueContainer}>
								<AppText style={styles.priceLabel}>From</AppText>
								<AppText weight="SemiBold" style={styles.priceValue}>
									₹{filters.min_price.toLocaleString()}
								</AppText>
							</View>
							<View style={styles.priceSeparator} />
							<View style={styles.priceValueContainer}>
								<AppText style={styles.priceLabel}>To</AppText>
								<AppText weight="SemiBold" style={styles.priceValue}>
									₹{filters.max_price.toLocaleString()}
								</AppText>
							</View>
						</View>

						<View style={styles.sliderWrapper}>
							<Slider
								minimumValue={0}
								maximumValue={100000}
								step={100}
								value={[filters.min_price, filters.max_price]}
								onValueChange={([min, max]) => setFilters({ min_price: min, max_price: max })}
								minimumTrackTintColor={Colors.primary}
								maximumTrackTintColor={Colors.grey300}
								thumbTintColor={Colors.primary}
								trackStyle={styles.sliderTrack}
								thumbStyle={styles.sliderThumb}
								containerStyle={styles.sliderContainer}
							/>
							<View style={styles.sliderLabels}>
								<AppText style={styles.sliderLabel}>₹0</AppText>
								<AppText style={styles.sliderLabel}>₹100k+</AppText>
							</View>
						</View>
					</View>
				</FilterSection>

				{/* Bedrooms */}
				<FilterSection>
					<SectionHeader title="Bedrooms" />
					<View style={styles.multiSelectContainer}>
						<MultiSelectButton<number | null>
							options={bedroomOptions}
							selected={filters.bedrooms ?? [null]}
							onSelect={(selected) =>
								setFilters({ bedrooms: selected.includes(null) ? null : selected as number[] })
							}
						/>
					</View>
				</FilterSection>

				{/* Bathrooms */}
				<FilterSection>
					<SectionHeader title="Bathrooms" />
					<View style={styles.multiSelectContainer}>
						<MultiSelectButton<number | null>
							options={bathroomOptions}
							selected={filters.bathrooms ?? [null]}
							onSelect={(selected) =>
								setFilters({ bathrooms: selected.includes(null) ? null : selected as number[] })
							}
						/>
					</View>
				</FilterSection>

				{/* Amenities */}
				<FilterSection>
					<SectionHeader
						title="Amenities"
						subtitle="Select desired features"
					/>
					<View style={styles.multiSelectContainer}>
						<MultiSelectButton<string | null>
							options={amenitiesOptions}
							selected={filters.amenities ?? [null]}
							onSelect={(newSelected) =>
								setFilters({ amenities: newSelected.includes(null) ? null : newSelected as string[] })
							}
						/>
					</View>
				</FilterSection>

				{/* Furnishing */}
				<FilterSection style={styles.lastSection}>
					<SectionHeader title="Furnishing Status" />
					<View style={styles.multiSelectContainer}>
						<MultiSelectButton<string | null>
							options={furnishingOptions}
							selected={filters.furnishing === null ? [null] : [filters.furnishing]}
							onSelect={(newSelected) =>
								setFilters({
									furnishing: newSelected.includes(null) ? null : (newSelected[0] ?? null),
								})
							}
						/>
					</View>
				</FilterSection>

				{/* Bottom spacing for button */}
				<View style={styles.bottomSpacing} />
			</ScrollView>

			{/* Action Buttons */}
			<View style={styles.actionContainer}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={handleReset}
						style={styles.resetButton}
						activeOpacity={0.8}
					>
						<Icons.MI name="refresh" size={20} color={Colors.grey600} />
						<AppText weight="Medium" style={styles.resetText}>
							Reset All
						</AppText>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={applyFilters}
						style={styles.applyButton}
						activeOpacity={0.8}
					>
						<AppText weight="SemiBold" style={styles.applyText}>
							Show Results
						</AppText>
						<Icons.MI name="arrow-forward" size={20} color={Colors.white} />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default FilterScreen;
