import React, { useState, useEffect } from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	ActivityIndicator,
	StyleSheet,
	Alert,
	Keyboard,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import AppText from '../../components/AppTheme/AppText';
import Icons from '../../constants/Icons';
import { Colors, Fonts } from '../../constants';
import usePropertyEnums from '../../hooks/metaHooks/usePropertyEnums';
import useAddProperty from '../../hooks/propertyHooks/useAddProperty';
import { mapEnumToDropdownOptions } from '../../utils/propertyUtils/mapEnumsToDropDownOptions';
// import ( uploadToCloudinary ) from '../../utils/propertyUtils/uploadImagesToCloudinary';

const AddPropertyScreen = ({ navigation }: any) => {
	const { enums, loading: enumsLoading } = usePropertyEnums();
	const {
		data,
		// errors,
		loading,
		// message,
		handleChange,
		handleAddProperty,
	} = useAddProperty();

	const amenities = data.amenities || [];

	// Submit handler
	const handleSubmit = async () => {
		const result = await handleAddProperty();
		// console.log('Result',result);
		if (result.success) {
			Alert.alert('Success', result.message, [
				{
					text: 'OK',
					onPress: () => navigation.replace('MyProperties'),
				},
			]);
		} else {
			Alert.alert(
				'Error',
				result.message || 'Something went wrong. Please try again.'
			);
		}
	};

	// Safely convert string to number
	const safeNumber = (val: string) => {
		const num = parseFloat(val);
		return isNaN(num) ? '' : num;
	};

	const handleNumberInput = (
		val: string,
		setValue: (value: number | '' | null) => void
	) => {
		if (val === '') {
			setValue('');
		} else {
			const parsed = parseInt(val, 10);
			if (!isNaN(parsed)) {
				setValue(parsed);
			}
		}
	};

	// <TextInput
	//     style={styles.input}
	//     keyboardType="numeric"
	//     value={data.bedrooms?.toString() || ''}
	//     onChangeText={(val) =>
	//       handleNumberInput(val, (parsedVal) => handleChange('bedrooms', parsedVal))
	//     }
	//     placeholder="Enter Bedrooms"
	//     placeholderTextColor={Colors.grey400}
	//   />

	// Toggle amenities selection
	const toggleAmenity = (value: string) => {
		const isSelected = amenities.includes(value);
		const updatedAmenities = isSelected
			? amenities.filter((item) => item !== value)
			: [...amenities, value];

		handleChange('amenities', updatedAmenities);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.safeArea}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={10}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView
						contentContainerStyle={styles.container}
						keyboardShouldPersistTaps="handled"
					>
						{/* Title */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="title"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Property Title{' '}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<TextInput
								style={styles.input}
								value={data.title}
								onChangeText={(val) =>
									handleChange('title', val)
								}
								placeholder="Enter Title"
								placeholderTextColor={Colors.grey400}
							/>
							{/* {errors.title && <AppText style={styles.error}>{errors.title}</AppText>} */}
						</View>

						{/* Property Type */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="home-work"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Property Type{' '}
									<AppText style={styles.required}>*</AppText>
								</AppText>
							</View>
							<Dropdown
								style={styles.dropdown}
								data={mapEnumToDropdownOptions(
									enums?.property_types || []
								)}
								labelField="label"
								valueField="value"
								placeholder="Select Property Type"
								placeholderStyle={styles.placeholder}
								selectedTextStyle={styles.selectedTextStyle}
								itemTextStyle={styles.itemTextStyle}
								value={data.property_type}
								onChange={(item) =>
									handleChange('property_type', item.value)
								}
							/>
							{/* {errors.property_type && <AppText style={styles.error}>{errors.property_type}</AppText>} */}
						</View>

						{/* Price and Deposit */}
						<View style={styles.row}>
							{/* Price */}
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="currency-rupee"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Price{' '}
										<AppText style={styles.required}>
											*
										</AppText>
									</AppText>
								</View>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.price?.toString()}
									onChangeText={(val) =>
										handleChange('price', safeNumber(val))
									}
									placeholder="Enter Price"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.price && <AppText style={styles.error}>{errors.price}</AppText>} */}
							</View>

							{/* Deposit */}
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="account-balance-wallet"
										size={20}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Deposit{' '}
										<AppText style={styles.required}>
											*
										</AppText>
									</AppText>
								</View>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.deposit?.toString()}
									onChangeText={(val) =>
										handleChange('deposit', safeNumber(val))
									}
									placeholder="Enter Deposit"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.deposit && <AppText style={styles.error}>{errors.deposit}</AppText>} */}
							</View>
						</View>

						{/* Bedrooms and Bathrooms */}
						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="king-bed"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Bedrooms{' '}
										<AppText style={styles.required}>
											*
										</AppText>
									</AppText>
								</View>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.bedrooms?.toString()}
									// onChangeText={(val) => handleChange('bedrooms', parseInt(val, 10))}
									onChangeText={(val) =>
										handleNumberInput(val, (parsedVal) =>
											handleChange('bedrooms', parsedVal)
										)
									}
									placeholder="Enter Bedrooms"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.bedrooms && <AppText style={styles.error}>{errors.bedrooms}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="bathtub"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Bathrooms{' '}
										<AppText style={styles.required}>
											*
										</AppText>
									</AppText>
								</View>
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.bathrooms?.toString()}
									// onChangeText={(val) => handleChange('bathrooms', parseInt(val, 10))}
									onChangeText={(val) =>
										handleNumberInput(val, (parsedVal) =>
											handleChange('bathrooms', parsedVal)
										)
									}
									placeholder="Enter Bathrooms"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.bathrooms && <AppText style={styles.error}>{errors.bathrooms}</AppText>} */}
							</View>
						</View>

						{/* Location Section  sectionTitle */}
						<View style={styles.sectionHeader}>
							<Icons.MI
								name="location-on"
								size={16}
								color={Colors.primary}
								style={styles.icon}
							/>
							<AppText style={styles.label}>
								Location Details
							</AppText>
						</View>

						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="location-on" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										Nearby
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Nearby</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.nearby || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											nearby: val,
										})
									}
									placeholder="Nearby Landmark"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.location.nearby && <AppText style={styles.error}>{errors.location.nearby}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="pin-drop" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										Street
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Street</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.street || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											street: val,
										})
									}
									placeholder="Street"
									placeholderTextColor={Colors.grey400}
								/>
							</View>
							{/* {errors.location.street && <AppText style={styles.error}>{errors.location.street}</AppText>} */}
						</View>

						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="place" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										Locality
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Locality</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.locality || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											locality: val,
										})
									}
									placeholder="Colony or Apartment"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.location.locality && <AppText style={styles.error}>{errors.location.locality}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="location-city" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>City</AppText>
								</View>
								{/* <AppText style={styles.label}>City</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.city || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											city: val,
										})
									}
									placeholder="City"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.location.city && <AppText style={styles.error}>{errors.location.city}</AppText>} */}
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="map" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										District
									</AppText>
								</View>
								{/* <AppText style={styles.label}>District</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.district || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											district: val,
										})
									}
									placeholder="District"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.location.district && <AppText style={styles.error}>{errors.location.district}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="flag" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										State
									</AppText>
								</View>
								{/* <AppText style={styles.label}>State</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.state || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											state: val,
										})
									}
									placeholder="State"
									placeholderTextColor={Colors.grey400}
								/>
							</View>
							{/* {errors.location.state && <AppText style={styles.error}>{errors.location.state}</AppText>} */}
						</View>

						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="public" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										Country
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Country</AppText> */}
								<TextInput
									style={styles.input}
									value={data.location?.country || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											country: val,
										})
									}
									placeholder="Country"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.location.country && <AppText style={styles.error}>{errors.location.country}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									{/* <Icons.MI name="markunread-mailbox" size={16} color={Colors.primary} style={styles.icon} /> */}
									<AppText style={styles.label}>
										Zip Code
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Zip Code</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.location?.zip || ''}
									onChangeText={(val) =>
										handleChange('location', {
											...data.location,
											zip: val,
										})
									}
									placeholder="Zip Code"
									placeholderTextColor={Colors.grey400}
								/>
							</View>
							{/* {errors.location.zip && <AppText style={styles.error}>{errors.location.zip}</AppText>} */}
						</View>

						{/* Floor and Total Floors */}
						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="stairs"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Floor
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Floor</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.floor_no?.toString()}
									onChangeText={(val) =>
										handleChange('floor_no', val)
									}
									placeholder="Floor"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.floor_no && <AppText style={styles.error}>{errors.floor_no}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="layers"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Total Floors
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Total Floors</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.total_floors?.toString()}
									onChangeText={(val) =>
										handleChange('total_floors', val)
									}
									placeholder="Total Floors"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.total_floors && <AppText style={styles.error}>{errors.total_floors}</AppText>} */}
							</View>
						</View>

						{/* Area and Carpet Area */}
						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="square-foot"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Area (sq.ft)
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Area (sq.ft)</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.area?.toString()}
									onChangeText={(val) =>
										handleChange('area', val)
									}
									placeholder="Area"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.area && <AppText style={styles.error}>{errors.area}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="crop-square"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Carpet Area (sq.ft)
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Carpet Area (sq.ft)</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.carpet_area?.toString()}
									onChangeText={(val) =>
										handleChange('carpet_area', val)
									}
									placeholder="Carpet Area"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.carpet_area && <AppText style={styles.error}>{errors.carpet_area}</AppText>} */}
							</View>
						</View>

						{/* Facing and Built Year */}
						<View style={styles.row}>
							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="explore"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Facing
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Facing</AppText> */}
								<Dropdown
									style={styles.dropdown}
									data={mapEnumToDropdownOptions(
										enums?.facing_types || []
									)}
									labelField="label"
									valueField="value"
									placeholder="Select Facing"
									placeholderStyle={styles.placeholder}
									selectedTextStyle={styles.selectedTextStyle}
									itemTextStyle={styles.itemTextStyle}
									value={data.facing}
									onChange={(item) =>
										handleChange('facing', item.value)
									}
								/>
								{/* {errors.facing && <AppText style={styles.error}>{errors.facing}</AppText>} */}
							</View>

							<View style={styles.inputContainer}>
								<View style={styles.sectionHeader}>
									<Icons.MI
										name="calendar-today"
										size={16}
										color={Colors.primary}
										style={styles.icon}
									/>
									<AppText style={styles.label}>
										Built Year
									</AppText>
								</View>
								{/* <AppText style={styles.label}>Built Year</AppText> */}
								<TextInput
									style={styles.input}
									keyboardType="numeric"
									value={data.built_year?.toString()}
									onChangeText={(val) =>
										handleChange('built_year', val)
									}
									placeholder="Built Year"
									placeholderTextColor={Colors.grey400}
								/>
								{/* {errors.built_year && <AppText style={styles.error}>{errors.built_year}</AppText>} */}
							</View>
						</View>

						{/* Furnishing */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="weekend"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Furnishing
								</AppText>
							</View>
							{/* <AppText style={styles.label}>Furnishing</AppText> */}
							<Dropdown
								style={styles.dropdown}
								data={mapEnumToDropdownOptions(
									enums?.furnishing_types || []
								)}
								labelField="label"
								valueField="value"
								placeholder="Select Furnishing"
								placeholderStyle={styles.placeholder}
								selectedTextStyle={styles.selectedTextStyle}
								itemTextStyle={styles.itemTextStyle}
								value={data.furnishing}
								onChange={(item) =>
									handleChange('furnishing', item.value)
								}
							/>
							{/* {errors.furnishing && <AppText style={styles.error}>{errors.furnishing}</AppText>} */}
						</View>

						{/* Amenities Selection */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="checklist"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Amenities
								</AppText>
							</View>
							{/* <AppText style={styles.label}>Amenities</AppText> */}
							<View style={styles.amenitiesContainer}>
								{mapEnumToDropdownOptions(
									enums?.amenities || []
								).map((item) => {
									const selected = amenities.includes(
										item.value
									);
									return (
										<TouchableOpacity
											key={item.value}
											style={styles.amenityItem}
											onPress={() =>
												toggleAmenity(item.value)
											}
										>
											<Icons.MI
												name={
													selected
														? 'check-box'
														: 'check-box-outline-blank'
												}
												size={20}
												color={
													selected
														? Colors.primary
														: Colors.grey500
												}
											/>
											<AppText
												style={styles.amenityLabel}
											>
												{item.label}
											</AppText>
										</TouchableOpacity>
									);
								})}
							</View>
							{/* {errors.amenities && <AppText style={styles.error}>{errors.floor}</AppText>} */}
						</View>

						{/* Description */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="description"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Description
								</AppText>
							</View>
							{/* <AppText style={styles.label}>Description</AppText> */}
							<TextInput
								style={[styles.input, styles.textArea]}
								multiline
								numberOfLines={4}
								value={data.description}
								onChangeText={(val) =>
									handleChange('description', val)
								}
								placeholder="Write a few lines about the property"
								placeholderTextColor={Colors.grey400}
							/>
							{/* {errors.description && <AppText style={styles.error}>{errors.description}</AppText>} */}
						</View>

						{/* Image Upload */}
						<View style={styles.section}>
							<View style={styles.sectionHeader}>
								<Icons.MI
									name="image"
									size={16}
									color={Colors.primary}
									style={styles.icon}
								/>
								<AppText style={styles.label}>
									Upload Images
								</AppText>
							</View>

							<TouchableOpacity
								style={styles.imageUploadButton}
								onPress={() => {
									launchImageLibrary(
										{
											mediaType: 'photo',
											includeBase64: false,
											selectionLimit: 5,
										},
										(response) => {
											if (response.didCancel) {
												console.log(
													'User cancelled image picker'
												);
											} else if (response.errorMessage) {
												console.error(
													'ImagePicker Error: ',
													response.errorMessage
												);
											} else if (
												response.assets &&
												response.assets.length > 0
											) {
												handleChange(
													'images',
													response.assets
												);
											}
										}
									);
								}}
							>
								<Icons.MI
									name="add-a-photo"
									size={24}
									color={Colors.primary}
								/>
								<AppText style={styles.imageUploadText}>
									Tap to upload images
								</AppText>
							</TouchableOpacity>

							{data.images && data.images.length > 0 && (
								<View style={styles.imagePreviewContainer}>
									{data.images.map(
										(image: any, index: number) => (
											<Image
												key={index}
												source={{ uri: image.uri }}
												style={styles.imagePreview}
											/>
										)
									)}
								</View>
							)}

							{/* {errors.images && <AppText style={styles.error}>{errors.images}</AppText>} */}
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>

				{/* Submit Button */}
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[
							styles.submitButton,
							loading && { opacity: 0.7 },
						]}
						onPress={handleSubmit}
						activeOpacity={0.8}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color={Colors.white100} />
						) : (
							<>
								<Icons.MI
									name="add-business"
									size={24}
									color={Colors.white100}
									style={styles.submitIcon}
								/>
								<AppText style={styles.submitText}>
									Add Property
								</AppText>
							</>
						)}
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
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	icon: {
		// marginTop: 2,
		marginRight: 6,
	},
	label: {
		fontWeight: '500',
		fontSize: 12,
		marginBottom: 4,
		// fontSize: 14,
		lineHeight: 16,
		paddingTop: 2,
	},
	required: {
		color: 'red',
	},
	dropdown: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	placeholder: {
		color: '#888',
	},
	selectedTextStyle: {
		fontSize: 14,
		fontFamily: Fonts.Regular,
	},
	itemTextStyle: {
		fontSize: 14,
		fontFamily: Fonts.Regular,
	},
	input: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
		color: '#000',
		fontFamily: Fonts.Regular,
	},
	textArea: {
		height: 100,
		textAlignVertical: 'top',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	inputContainer: {
		flex: 1,
		marginRight: 10,
	},
	buttonContainer: {
		marginTop: 0,
	},
	amenitiesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginVertical: 8,
	},
	amenityItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 16,
		marginBottom: 8,
	},
	amenityLabel: {
		marginLeft: 6,
		fontSize: 12,
		color: '#111827',
	},
	fixedButtonContainer: {
		position: 'absolute',
		bottom: 8,
		left: 20,
		right: 20,
		backgroundColor: 'transparent',
	},
	submitButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary,
		paddingVertical: 14,
		borderRadius: 8,
		marginTop: 0,
	},
	submitIcon: {
		marginRight: 8,
	},
	submitText: {
		color: Colors.white,
		fontSize: 14,
		// fontWeight: '600',
		fontFamily: Fonts.SemiBold,
	},

	section: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 16,
	},
	error: {
		color: 'red',
		fontSize: 13,
		marginTop: 4,
	},
	imageUploadButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 8,
		backgroundColor: Colors.white,
		marginBottom: 12,
	},
	imageUploadText: {
		marginLeft: 8,
		fontSize: 14,
		color: Colors.primary,
		fontWeight: '500',
	},
	imagePreviewContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	imagePreview: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
	},
});

// {/* Image Upload */}
//             <View style={styles.section}>
//               <View style={styles.sectionHeader}>
//                 <Icons.MI name="image" size={16} color={Colors.primary} style={styles.icon} />
//                 <AppText style={styles.label}>Upload Images</AppText>
//               </View>
//               <TouchableOpacity
//                 style={styles.imageUploadButton}
//                 onPress={() => {
//                   launchImageLibrary({
//                     mediaType: 'photo',
//                     includeBase64: false,
//                     selectionLimit: 5,
//                   }, (response) => {
//                     if (response.didCancel) {
//                       console.log('User cancelled image picker');
//                     } else if (response.errorMessage) {
//                       console.error('ImagePicker Error: ', response.errorMessage);
//                     } else {
//                       const images = response.assets.map(asset => asset.uri);
//                       handleChange('images', images);
//                     }
//                   });
//                 }}
//               >
//                 <Icons.MI name="add-a-photo" size={24} color={Colors.primary} />
//                 <AppText style={styles.imageUploadText}>Tap to upload images</AppText>
//               </TouchableOpacity>
//               {data.images && data.images.length > 0 && (
//                 <View style={styles.imagePreviewContainer}>
//                   {data.images.map((image, index) => (
//                     <Image
//                       key={index}
//                       source={{ uri: image }}
//                       style={styles.imagePreview}
//                     />
//                   ))}
//                 </View>
//               )}
//               {/* {errors.images && <AppText style={styles.error}>{errors.images}</AppText>} */}
//             </View>
