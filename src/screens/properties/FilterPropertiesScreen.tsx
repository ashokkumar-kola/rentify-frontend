import React, { useEffect, useLayoutEffect, useState } from "react";

import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	ActivityIndicator,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Slider } from "@miblanchard/react-native-slider";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";

import SearchBar from "../../components/Common/SearchBar";
import MultiSelectButton from "../../components/Common/MultiSelectButton";
import CheckboxGrid from "../../components/Common/CheckboxGrid";

import { api } from "../../api/apiClient";
import { Colors } from "../../constants";
import { propertyTypes, amenitiesList } from "../../constants/Filters";

const FiltersScreen = () => {
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<
		string[]
	>([]);
	const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
	const [selectedBathrooms, setSelectedBathrooms] = useState("Any");
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState([0, 100000]);
	const [selectedFurnishing, setSelectedFurnishing] = useState("Any");
	const [selectedSortBy, setSelectedSortBy] = useState("Relevance");
	const [selectedPetPolicy, setSelectedPetPolicy] = useState("Any");

	const toggleSelection = (
		list: string[],
		item: string,
		setter: (items: string[]) => void
	) => {
		setter(
			list.includes(item)
				? list.filter((i) => i !== item)
				: [...list, item]
		);
	};

	const resetFilters = () => {
		setSearchQuery("");
		setSelectedPropertyTypes([]);
		setSelectedBedrooms("Any");
		setSelectedBathrooms("Any");
		setSelectedAmenities([]);
		setPriceRange([0, 100000]);
		setSelectedFurnishing("Any");
		setSelectedSortBy("Relevance");
		setSelectedPetPolicy("Any");
	};

	const applyFilters = async () => {
		setLoading(true);
		try {
			// Prepare filter parameters
			const params = {
				location: searchQuery || undefined,
				property_type:
					selectedPropertyTypes.length > 0
						? selectedPropertyTypes.join(",")
						: undefined,
				bedrooms:
					selectedBedrooms !== "Any" ? selectedBedrooms : undefined,
				bathrooms:
					selectedBathrooms !== "Any" ? selectedBathrooms : undefined,
				amenities:
					selectedAmenities.length > 0
						? selectedAmenities.join(",")
						: undefined,
				min_price: priceRange[0],
				max_price: priceRange[1],
				furnishing:
					selectedFurnishing !== "Any"
						? selectedFurnishing
						: undefined,
				sortBy:
					selectedSortBy !== "Relevance" ? selectedSortBy : undefined,
				// petPolicy: selectedPetPolicy !== 'Any' ? selectedPetPolicy : undefined,
			};

			// Remove undefined parameters
			// Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
			(Object.keys(params) as (keyof typeof params)[]).forEach((key) => {
				if (params[key] === undefined) {
					delete params[key];
				}
			});
			console.log("Filter Parameters : ", params);

			// Make API call
			const response = await api.get("/properties", { params });
			// console.log('Filter API response:', response.data);

			// Navigate to results screen with the filtered data
			// navigation.navigate('FilteredProperties', { properties: response.data.data });
			navigation.navigate("ExploreProperties", {
				properties: response.data.data,
			});
		} catch (error) {
			Alert.alert(
				"Error",
				"Failed to fetch properties. Please try again.",
				[{ text: "OK" }]
			);
			console.error("Filter API error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<Ionicons
					name="search"
					size={20}
					color={Colors.grey700}
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search by location or property name"
					placeholderTextColor={Colors.grey400}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<ScrollView style={styles.scrollContainer}>
				<Text style={styles.sectionTitle}>Property Type</Text>
				<CheckboxGrid
					options={propertyTypes}
					selected={selectedPropertyTypes}
					onToggle={(item) =>
						toggleSelection(
							selectedPropertyTypes,
							item,
							setSelectedPropertyTypes
						)
					}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Price Range (per month)</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.priceText}>
						${priceRange[0]} - ${priceRange[1]}
					</Text>
					<Slider
						minimumValue={0}
						maximumValue={100000}
						step={100}
						value={priceRange}
						onValueChange={(value) =>
							setPriceRange(value as number[])
						}
						minimumTrackTintColor={Colors.primary}
						maximumTrackTintColor={Colors.grey100}
						thumbTintColor={Colors.primary}
						containerStyle={styles.sliderContainer}
					/>
				</View>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Bedrooms</Text>
				<MultiSelectButton
					options={["Any", "1", "2", "3", "4+"]}
					selected={selectedBedrooms}
					onSelect={setSelectedBedrooms}
					buttonStyle={styles.filterButton}
					selectedButtonStyle={styles.selectedFilterButton}
					textStyle={styles.filterButtonText}
					selectedTextStyle={styles.selectedFilterButtonText}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Bathrooms</Text>
				<MultiSelectButton
					options={["Any", "1", "2", "3", "4+"]}
					selected={selectedBathrooms}
					onSelect={setSelectedBathrooms}
					buttonStyle={styles.filterButton}
					selectedButtonStyle={styles.selectedFilterButton}
					textStyle={styles.filterButtonText}
					selectedTextStyle={styles.selectedFilterButtonText}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Furnishing</Text>
				<MultiSelectButton
					options={["Any", "Furnished", "Unfurnished", "Partially"]}
					selected={selectedFurnishing}
					onSelect={setSelectedFurnishing}
					buttonStyle={styles.filterButton}
					selectedButtonStyle={styles.selectedFilterButton}
					textStyle={styles.filterButtonText}
					selectedTextStyle={styles.selectedFilterButtonText}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Pet Policy</Text>
				<MultiSelectButton
					options={[
						"Any",
						"Allowed",
						"Not Allowed",
						"Cats Only",
						"Dogs Only",
					]}
					selected={selectedPetPolicy}
					onSelect={setSelectedPetPolicy}
					buttonStyle={styles.filterButton}
					selectedButtonStyle={styles.selectedFilterButton}
					textStyle={styles.filterButtonText}
					selectedTextStyle={styles.selectedFilterButtonText}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Sort By</Text>
				<MultiSelectButton
					options={[
						"Relevance",
						"Price: Low to High",
						"Price: High to Low",
						"Newest",
						"Most Popular",
					]}
					selected={selectedSortBy}
					onSelect={setSelectedSortBy}
					buttonStyle={styles.filterButton}
					selectedButtonStyle={styles.selectedFilterButton}
					textStyle={styles.filterButtonText}
					selectedTextStyle={styles.selectedFilterButtonText}
				/>

				<View style={styles.divider} />

				<Text style={styles.sectionTitle}>Amenities</Text>
				<CheckboxGrid
					options={amenitiesList}
					selected={selectedAmenities}
					onToggle={(item) =>
						toggleSelection(
							selectedAmenities,
							item,
							setSelectedAmenities
						)
					}
					checkboxStyle={styles.checkbox}
					selectedCheckboxStyle={styles.selectedCheckbox}
					textStyle={styles.amenityText}
				/>
			</ScrollView>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={resetFilters}
					style={styles.resetButton}
					disabled={loading}
				>
					<Text style={styles.resetText}>Reset All</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={applyFilters}
					style={styles.applyButton}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<>
							<Text style={styles.applyText}>Show Results</Text>
							<Ionicons
								name="arrow-forward"
								size={18}
								color="white"
								style={styles.applyIcon}
							/>
						</>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white100,
		paddingHorizontal: 16,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		paddingHorizontal: 16,
		marginVertical: 16,
		height: 50,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		height: "100%",
		fontSize: 16,
		color: "#101010",
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
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
		backgroundColor: "white",
		borderRadius: 10,
		padding: 16,
		marginBottom: 8,
	},
	priceText: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.grey900,
		textAlign: "center",
		marginBottom: 16,
	},
	sliderContainer: {
		marginHorizontal: 4,
	},
	filterButton: {
		backgroundColor: "white",
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
		color: "white",
	},
	checkbox: {
		width: 22,
		height: 22,
		borderWidth: 1,
		borderColor: Colors.grey200,
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
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
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: Colors.grey200,
	},
	resetButton: {
		flex: 1,
		marginRight: 8,
		backgroundColor: Colors.white100,
		borderColor: Colors.grey200,
		borderWidth: 1,
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	applyButton: {
		flex: 2,
		marginLeft: 8,
		backgroundColor: Colors.primary,
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	resetText: {
		color: Colors.black100,
		fontWeight: "600",
		fontSize: 16,
	},
	applyText: {
		color: "white",
		fontWeight: "600",
		fontSize: 16,
		marginRight: 8,
	},
	applyIcon: {
		marginLeft: 4,
	},
});

export default FiltersScreen;

// useLayoutEffect(() => {
//   navigation.getParent()?.setOptions({
//     tabBarStyle: { display: 'none' },
//   });

//   return () => {
//     navigation.getParent()?.setOptions({
//       tabBarStyle: undefined,  // Reset to default
//     });
//   };
// }, [navigation]);

// useEffect(() => {
//   const parent = navigation.getParent(); // This gets the Tab navigator
//   parent?.setOptions({
//     tabBarStyle: { display: 'none' },
//   });

//   return () => {
//     parent?.setOptions({
//       tabBarStyle: { display: 'flex' }, // or restore your default style here
//     });
//   };
// }, [navigation]);
