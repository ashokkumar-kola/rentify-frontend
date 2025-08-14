import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	TextInput,
} from "react-native";

import Icons from "../../constants/Icons";
import { Colors, Fonts, TextSizes } from "../../constants";
import images from "../../assets/images";
import AppText from "../../components/AppTheme/AppText";
import PropertyImageSlider from "../../components/PropertyUtils/PropertyImageSlider";
import { SCREEN_WIDTH } from "../../utils/appUtils/dimensions";

interface Tag {
	label: string;
	color: string;
	icon: string;
}

const formatAddress = (location: any): string => {
	if (!location || typeof location !== "object") {
		return "";
	}
	const { street, locality, nearby, city, district, state, zip } = location;
	return [street, locality, nearby, city, district, state, zip]
		.filter(Boolean)
		.join(", ");
};

interface PropertyCardProps {
	property: {
		id: string;
		title: string;
		location: string | object;
		priceType?: string;
		price: number;
		deposit: number;
		property_type: string;
		bedrooms: number;
		bathrooms: number;
		area: number;
		furnishing?: string;
		amenities?: string[];
		status?: "available" | "sold" | "rented";
		is_verified?: boolean;
		description?: string;
		onPrimaryAction: () => void;
		onSecondaryAction: () => void;
		primaryLabel: string;
		secondaryLabel: string;
		isForRent?: boolean;
		images: string[];
		built_year?: number | null;
		floor_no?: number;
		total_floors?: number;
		facing?: string;
	};
	onSearch?: (query: string) => void;
}

const MyPropertyCard: React.FC<PropertyCardProps> = ({
	property,
	onSearch,
}) => {
	const {
		title,
		location,
		priceType = "₹",
		price,
		deposit,
		property_type,
		bedrooms,
		bathrooms,
		area,
		furnishing = "Unfurnished",
		amenities = [],
		status = "available",
		is_verified = false,
		description = "",
		onPrimaryAction,
		onSecondaryAction,
		primaryLabel,
		secondaryLabel,
		isForRent = true,
		images: property_images,
		built_year,
		floor_no,
		total_floors,
		facing,
	} = property;

	const hasImages =
		property_images &&
		Array.isArray(property_images) &&
		property_images.length > 0;
	const imageList = hasImages ? property_images : [images.defaultHome];

	const locationText =
		typeof location === "string" ? location : formatAddress(location);

	const formatPrice = (value: number) => {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<View style={styles.card}>
			{onSearch && (
				<View style={styles.searchContainer}>
					<Icons.FA name="search" size={16} color="#6b7280" />
					<TextInput
						style={styles.searchInput}
						placeholder="Search by location..."
						placeholderTextColor="#9ca3af"
						onChangeText={onSearch}
					/>
				</View>
			)}

			<View>
				<View style={styles.coverImage}>
					<PropertyImageSlider imageList={imageList} />

					{is_verified && (
						<View style={styles.verifiedBadge}>
							<Icons.FA
								name="check-circle"
								size={16}
								color={Colors.primary}
							/>
							<AppText style={styles.verifiedText}>
								Verified
							</AppText>
						</View>
					)}
					{/* <TouchableOpacity style={styles.heart}>
            <Icons.FA name={status === 'available' ? 'heart-o' : 'heart'} size={20} color="#fff" />
          </TouchableOpacity> */}
				</View>

				{/* <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            {priceType} {formatPrice(price)}/mo
          </Text>
          {isForRent && (
            <Text style={styles.depositText}>
              Deposit: {priceType}{formatPrice(deposit)}
            </Text>
          )}
        </View> */}
			</View>

			<View style={styles.row}>
				<View style={[styles.section, styles.row]}>
					<View style={styles.titleLocation}>
						<AppText
							weight="SemiBold"
							style={styles.title}
							numberOfLines={1}
						>
							{title}
						</AppText>
						<View style={styles.location}>
							<Icons.FA
								name="map-marker"
								size={16}
								color={Colors.primary}
							/>
							<AppText
								style={styles.locationText}
								numberOfLines={2}
							>
								{locationText}
							</AppText>
						</View>
					</View>
					<View style={styles.priceBadge}>
						<AppText weight="SemiBold" style={styles.priceText}>
							{priceType} {formatPrice(price)}/mo
						</AppText>
						{isForRent && (
							<AppText style={styles.depositText}>
								Dep: {priceType}
								{formatPrice(deposit)}
							</AppText>
						)}
					</View>
				</View>
			</View>

			{/* <View style={styles.section}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.location}>
          <Icons.FA name="map-marker" size={16} color={Colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>{locationText}</Text>
        </View>
      </View> */}

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Icons.MI name="widgets" size={16} color={Colors.primary} />
					<AppText weight="SemiBold" style={styles.sectionTitle}>
						Features
					</AppText>
				</View>
				<View style={styles.featuresContainer}>
					<View style={[styles.featureItem, styles.highlightFeature]}>
						<Icons.FA
							name="building"
							size={16}
							color={Colors.primary}
						/>
						<AppText
							style={[
								{ color: Colors.primary },
								styles.featureText,
							]}
						>
							{property_type}
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.FA name="bed" size={16} color="#6b7280" />
						<AppText style={styles.featureText}>
							{bedrooms} Beds
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.FA name="bath" size={16} color="#6b7280" />
						<AppText style={styles.featureText}>
							{bathrooms} Baths
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.FA name="expand" size={16} color="#6b7280" />
						<AppText style={styles.featureText}>
							{area} sqft
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.MI name="chair" size={16} color="#6b7280" />
						<AppText style={styles.featureText}>
							{furnishing}
						</AppText>
					</View>
					{floor_no !== undefined && total_floors !== undefined && (
						<View style={styles.featureItem}>
							<Icons.FA
								name="building-o"
								size={16}
								color="#6b7280"
							/>
							<AppText style={styles.featureText}>
								Floor {floor_no}/{total_floors}
							</AppText>
						</View>
					)}
					{facing && (
						<View style={styles.featureItem}>
							<Icons.FA
								name="compass"
								size={16}
								color="#6b7280"
							/>
							<AppText style={styles.featureText}>
								{facing} Facing
							</AppText>
						</View>
					)}
					{built_year && (
						<View style={styles.featureItem}>
							<Icons.FA
								name="calendar"
								size={16}
								color="#6b7280"
							/>
							<AppText style={styles.featureText}>
								Built {built_year}
							</AppText>
						</View>
					)}
				</View>
			</View>

			{amenities.length > 0 && (
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Icons.MI
							name="stars"
							size={16}
							color={Colors.primary}
						/>
						<AppText weight="SemiBold" style={styles.sectionTitle}>
							Amenities
						</AppText>
					</View>
					<View style={styles.amenitiesContainer}>
						{amenities.slice(0, 4).map((amenity, index) => (
							<View key={index} style={styles.amenityItem}>
								<AppText style={styles.amenityText}>
									{amenity}
								</AppText>
							</View>
						))}
						{amenities.length > 4 && (
							<View style={styles.amenityItem}>
								<AppText style={styles.amenityText}>
									+{amenities.length - 4}
								</AppText>
							</View>
						)}
					</View>
				</View>
			)}

			{/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description} numberOfLines={3}>{description}</Text>
      </View> */}

			<View style={styles.section}>
				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={onSecondaryAction}
						activeOpacity={0.7}
					>
						<Icons.MI
							name="short-text"
							size={16}
							color={Colors.primary}
						/>
						<AppText style={styles.secondaryButtonText}>
							{secondaryLabel}
						</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={onPrimaryAction}
						activeOpacity={0.7}
					>
						<Icons.FA name="edit" size={16} color={Colors.white} />
						<AppText style={styles.primaryButtonText}>
							{primaryLabel}
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default MyPropertyCard;

const styles = StyleSheet.create({
	card: {
		width: SCREEN_WIDTH * 0.9,
		backgroundColor: "#fff", // Colors.white100
		borderRadius: 20,
		// marginHorizontal: 8,
		marginVertical: 12,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 6 },
		shadowRadius: 12,
		elevation: 4,
		overflow: "hidden",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
		alignItems: "flex-start",
		// marginBottom: 10,
	},
	section: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#f3f4f6",
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: TextSizes.md,
		color: Colors.black100,
		marginLeft: 8,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f3f4f6",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		margin: 16,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: "#1f2937",
		marginLeft: 8,
	},
	coverImage: {
		height: 180,
		position: "relative",
	},
	verifiedBadge: {
		position: "absolute",
		top: 12,
		left: 12,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	verifiedText: {
		marginLeft: 4,
		fontSize: 12,
		fontWeight: "600",
		color: Colors.primary,
	},
	heart: {
		position: "absolute",
		top: 12,
		right: 12,
		width: 36,
		height: 36,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 18,
	},
	titleLocation: {
		width: "63%",
		fontSize: TextSizes.md,
	},
	priceBadge: {
		// width: '40%',
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingVertical: 8,
		paddingHorizontal: 8,
		alignItems: "flex-start",
		borderWidth: 1,
		borderColor: Colors.primary,
	},
	priceText: {
		color: Colors.primary,
		// fontWeight: '700',
		// fontFamily: Fonts.SemiBold,
		fontSize: TextSizes.sm,
	},
	depositText: {
		color: "#6b7280",
		fontSize: 12,
		marginTop: 4,
	},
	title: {
		fontSize: TextSizes.sm,
		// fontWeight: '700',
		color: "#1f2937",
		marginBottom: 8,
	},
	location: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	locationText: {
		fontSize: TextSizes.sm,
		color: "#6b7280",
		marginLeft: 8,
		flex: 1,
	},
	featuresContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		gap: 8,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f3f4f6",
		paddingHorizontal: 8,
		paddingVertical: 8,
		borderRadius: 8,
	},
	highlightFeature: {
		backgroundColor: Colors.primary + "20",
	},
	featureText: {
		fontSize: TextSizes.xs,
		color: "#4b5563",
		marginLeft: 6,
	},

	// Amenities styles
	amenitiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	amenityItem: {
		backgroundColor: Colors.white150,
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	amenityText: {
		fontSize: 10,
		color: "#4b5563",
		textTransform: "capitalize",
	},
	description: {
		fontSize: 14,
		color: "#6b7280",
		lineHeight: 20,
	},

	// Button styles
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
	},
	primaryButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		borderRadius: 12,
	},
	primaryButtonText: {
		color: Colors.white,
		fontSize: TextSizes.md,
		marginLeft: 8,
	},
	secondaryButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderColor: Colors.primary,
		borderWidth: 1.5,
		paddingVertical: 12,
		borderRadius: 12,
	},
	secondaryButtonText: {
		color: Colors.primary,
		fontSize: TextSizes.md,
		marginLeft: 8,
	},
});
