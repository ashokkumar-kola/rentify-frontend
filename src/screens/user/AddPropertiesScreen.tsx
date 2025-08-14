import React, { useState, useEffect } from "react";
import {
	View,
	Alert,
	StyleSheet,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { api } from "../../api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "../../utils/imports";
import AppText from "../../components/AppTheme/AppText";

const PROPERTY_TYPES = [
	{ label: "Apartment", value: "apartment" },
	{ label: "Flat", value: "flat" },
	{ label: "Plot", value: "plot" },
	{ label: "House", value: "house" },
	{ label: "Land", value: "land" },
];

const BHK_TYPES = [
	{ label: "1 BHK", value: "1" },
	{ label: "2 BHK", value: "2" },
	{ label: "3 BHK", value: "3" },
	{ label: "4 BHK", value: "4" },
];

const FURNISHING_OPTIONS = [
	{ label: "Unfurnished", value: "unfurnished" },
	{ label: "Semi-Furnished", value: "partially" },
	{ label: "Fully Furnished", value: "furnished" },
];

const FACING_OPTIONS = [
	{ label: "East", value: "east" },
	{ label: "West", value: "west" },
	{ label: "North", value: "north" },
	{ label: "South", value: "south" },
	{ label: "NorthEast", value: "north-east" },
	{ label: "NorthWest", value: "north-west" },
	{ label: "SouthEast", value: "south-east" },
	{ label: "SouthWest", value: "south-west" },
];

const PROPERTY_AMENITIES = [
	{ label: "Parking", value: "parking" },
	{ label: "Balcony", value: "balcony" },
	{ label: "Elevator", value: "elevator" },
	{ label: "Security", value: "security" },
	{ label: "WiFi", value: "wifi" },
];

const AddPropertyScreen = () => {
	const [userId, setUserId] = useState("");
	const [propertyType, setPropertyType] = useState(null);
	const [bhkType, setBhkType] = useState(null);
	const [bathrooms, setBathrooms] = useState("");
	const [price, setPrice] = useState("");
	const [deposit, setDeposit] = useState("");
	const [locality, setLocality] = useState("");
	const [city, setCity] = useState("");
	const [floor, setFloor] = useState("");
	const [totalFloors, setTotalFloors] = useState("");
	const [area, setArea] = useState("");
	const [carpetArea, setCarpetArea] = useState("");
	const [facing, setFacing] = useState(null);
	const [builtYear, setBuiltYear] = useState("");
	const [furnishing, setFurnishing] = useState(null);
	const [amenities, setAmenities] = useState<string[]>([]);
	const [description, setDescription] = useState("");

	useEffect(() => {
		fetchUserId();
	}, []);

	const fetchUserId = async () => {
		try {
			// const id = await AsyncStorage.getItem('userId');
			const id = "6846aefa55037cbb6d385d7b";
			if (id) {
				setUserId(id);
				console.log("Loaded userId:", id);
			}
		} catch (err) {
			console.error("Failed to load userId", err);
		}
	};

	const handleSubmit = async () => {
		if (!propertyType) {
			Alert.alert("Error", "Please select a Property Type");
			return;
		}

		if (propertyType !== "plot" && propertyType !== "land" && !bhkType) {
			Alert.alert("Error", "Please select BHK Type");
			return;
		}

		if (!price) {
			Alert.alert("Error", "Please enter Price");
			return;
		}

		if (!locality) {
			Alert.alert("Error", "Please enter Locality");
			return;
		}

		if (!city) {
			Alert.alert("Error", "Please enter City");
			return;
		}

		const location: Record<string, any> = {};
		if (locality) {
			location.locality = locality;
		}
		if (city) {
			location.city = city;
		}
		// if (nearby) {location.nearby = nearby;}
		// if (street) {location.street = street;}
		// if (district) {location.district = district;}
		// if (stateName) {location.state = stateName;}
		// if (zip) {location.zip = zip;}

		// const geo = {};
		// if (lat) {geo.lat = parseFloat(lat);}
		// if (lng) {geo.lng = parseFloat(lng);}
		// if (Object.keys(geo).length > 0) {location.geo = geo;}

		const title = `${propertyType} ${
			bhkType ? `${bhkType} BHK` : ""
		} in ${locality}`;

		const propertyData: any = {
			landlord_id: userId,
			title,
			property_type: propertyType,
			bedrooms: bhkType ? parseInt(bhkType, 10) : undefined,
			price: parseFloat(price),
			location,
		};

		if (bathrooms) {
			propertyData.bathrooms = parseInt(bathrooms, 10);
		}
		if (deposit) {
			propertyData.deposit = parseFloat(deposit);
		}
		if (floor) {
			propertyData.floor_no = parseInt(floor, 10);
		}
		if (totalFloors) {
			propertyData.total_floors = parseInt(totalFloors, 10);
		}
		if (area) {
			propertyData.area = parseFloat(area);
		}
		if (carpetArea) {
			propertyData.carpet_area = parseFloat(carpetArea);
		}
		if (facing) {
			propertyData.facing = facing;
		}
		if (builtYear) {
			propertyData.built_year = parseInt(builtYear, 10);
		}
		if (furnishing) {
			propertyData.furnishing = furnishing;
		}
		if (amenities && amenities.length > 0) {
			propertyData.amenities = amenities;
		}
		if (description) {
			propertyData.description = description;
		}

		try {
			const response = await api.post("/properties", propertyData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log("Response:", response.data.message);
			Alert.alert("Success", "Property added successfully!");
		} catch (error) {
			console.error("Error adding property:", error);
			Alert.alert(
				"Error",
				"Something went wrong while adding the property."
			);
		}
	};

	const toggleAmenity = (value: string) => {
		if (amenities.includes(value)) {
			setAmenities(amenities.filter((item) => item !== value));
		} else {
			setAmenities([...amenities, value]);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.safeArea}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={20} // adjust if you have a header
			>
				<ScrollView contentContainerStyle={styles.container}>
					{/* Property Type */}
					<View style={styles.sectionHeader}>
						<MaterialIcons
							name="maps-home-work"
							size={16}
							color="#4F46E5"
							style={styles.icon}
						/>
						<AppText style={styles.label}>
							Property Type{" "}
							<AppText style={styles.required}>*</AppText>
						</AppText>
					</View>
					<Dropdown
						style={styles.dropdown}
						data={PROPERTY_TYPES}
						labelField="label"
						valueField="value"
						placeholder="Select Property Type"
						placeholderStyle={styles.placeholder}
						value={propertyType}
						onChange={(item) => setPropertyType(item.value)}
					/>

					{/* BHK Type + Bathrooms */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="king-bed"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>BHK Type</AppText>
							</View>
							<Dropdown
								style={styles.dropdown}
								data={BHK_TYPES}
								labelField="label"
								valueField="value"
								placeholder="Select BHK Type"
								placeholderStyle={styles.placeholder}
								value={bhkType}
								onChange={(item) => setBhkType(item.value)}
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="bathtub"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Bathrooms
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={bathrooms}
								onChangeText={setBathrooms}
								placeholder="No. of Bathrooms"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Price & Deposit */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="currency-rupee"
									size={20}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Price{" "}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={price}
								onChangeText={setPrice}
								placeholder="Enter Price"
								placeholderTextColor="#888"
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="check-circle-outline"
									size={20}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Deposit{" "}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={deposit}
								onChangeText={setDeposit}
								placeholder="Enter Deposit"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Location */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="my-location"
									size={20}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Locality{" "}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								value={locality}
								onChangeText={setLocality}
								placeholder="Locality"
								placeholderTextColor="#888"
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="location-city"
									size={20}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									City{" "}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								value={city}
								onChangeText={setCity}
								placeholder="City"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Floor + Total Floors */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="stairs"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>Floor</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={floor}
								onChangeText={setFloor}
								placeholder="Floor"
								placeholderTextColor="#888"
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="layers"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Total Floors
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={totalFloors}
								onChangeText={setTotalFloors}
								placeholder="Total Floors"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Area + Carpet Area */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="square-foot"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Area (sq.ft)
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={area}
								onChangeText={setArea}
								placeholder="Area"
								placeholderTextColor="#888"
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="crop-square"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Carpet Area (sq.ft)
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={carpetArea}
								onChangeText={setCarpetArea}
								placeholder="Carpet Area"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Facing + Built Year */}
					<View style={styles.row}>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="explore"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>Facing</AppText>
							</View>
							<Dropdown
								style={styles.dropdown}
								data={FACING_OPTIONS}
								labelField="label"
								valueField="value"
								placeholder="Select Facing"
								placeholderStyle={styles.placeholder}
								value={facing}
								onChange={(item) => setFacing(item.value)}
							/>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.sectionHeader}>
								<MaterialIcons
									name="calendar-today"
									size={16}
									color="#4F46E5"
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Built Year
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								value={builtYear}
								onChangeText={setBuiltYear}
								placeholder="Built Year"
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					{/* Furnishing */}
					<View style={styles.sectionHeader}>
						<MaterialIcons
							name="weekend"
							size={16}
							color="#4F46E5"
							style={styles.icon}
						/>
						<AppText style={styles.label}>Furnishing</AppText>
					</View>
					<Dropdown
						style={styles.dropdown}
						data={FURNISHING_OPTIONS}
						labelField="label"
						valueField="value"
						placeholder="Select Furnishing"
						placeholderStyle={styles.placeholder}
						value={furnishing}
						onChange={(item) => setFurnishing(item.value)}
					/>

					{/* Amenities */}
					<View style={styles.sectionHeader}>
						<MaterialIcons
							name="checklist"
							size={16}
							color="#4F46E5"
							style={styles.icon}
						/>
						<AppText style={styles.label}>Amenities</AppText>
					</View>

					<View style={styles.amenitiesContainer}>
						{PROPERTY_AMENITIES.map((item) => {
							const selected = amenities.includes(item.value);
							return (
								<View
									key={item.value}
									style={styles.amenityItem}
								>
									<MaterialIcons
										name={
											selected
												? "check-box"
												: "check-box-outline-blank"
										}
										size={20}
										color={selected ? "#4F46E5" : "#6B7280"}
										onPress={() =>
											toggleAmenity(item.value)
										}
									/>
									<AppText style={styles.amenityLabel}>
										{item.label}
									</AppText>
								</View>
							);
						})}
					</View>

					{/* Description */}
					<View style={styles.sectionHeader}>
						<MaterialIcons
							name="description"
							size={16}
							color="#4F46E5"
							style={styles.icon}
						/>
						<AppText style={styles.label}>Description</AppText>
					</View>
					<TextInput
						style={[styles.input, styles.textArea]}
						multiline
						numberOfLines={4}
						value={description}
						onChangeText={setDescription}
						placeholder="Description"
						placeholderTextColor="#888"
					/>
				</ScrollView>
				{/* Submit */}
				<View style={styles.fixedButtonContainer}>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit}
						activeOpacity={0.8}
					>
						<MaterialIcons
							name="add-home-work"
							size={24}
							color="#FFFFFF"
							style={styles.submitIcon}
						/>
						<AppText style={styles.submitText}>
							Add Property
						</AppText>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default AddPropertyScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		padding: 20,
		paddingBottom: 60,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	icon: {
		marginRight: 6,
	},
	label: {
		fontWeight: "500",
		fontSize: 12,
		marginBottom: 4,
	},
	required: {
		color: "red",
	},
	dropdown: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	placeholder: {
		color: "#888",
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
		color: "#000",
	},
	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	inputContainer: {
		flex: 1,
		marginRight: 10,
	},
	buttonContainer: {
		marginTop: 30,
	},
	amenitiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		marginVertical: 8,
	},
	amenityItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 16,
		marginBottom: 8,
	},
	amenityLabel: {
		marginLeft: 6,
		fontSize: 12,
		color: "#111827",
	},
	fixedButtonContainer: {
		position: "absolute",
		bottom: 8,
		left: 20,
		right: 20,
		backgroundColor: "transparent",
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#4F46E5",
		paddingVertical: 14,
		borderRadius: 8,
		marginTop: 30,
	},
	submitIcon: {
		marginRight: 8,
	},
	submitText: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "600",
	},
});
