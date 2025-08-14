import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Dimensions,
} from "react-native";

import Icons from "../../constants/Icons";
import { Colors, Fonts, Spacing, TextSizes } from "../../constants";
import images from "../../assets/images";
import AppText from "../../components/AppTheme/AppText";
import PropertyImageSlider from "../../components/PropertyUtils/PropertyImageSlider";
import { SCREEN_WIDTH } from "../../utils/appUtils/dimensions";
import { formatLocation } from "../../utils/propertyUtils/formatLocation";

import { Location } from "../../types/Property";

interface Tag {
	label: string;
	color: string;
	icon: string;
}

interface PropertyCardProps {
	property: {
		id: string;
		title: string;
		location: Location;
		priceType?: string;
		price: string;
		deposit: string;
		property_type: string;
		bedrooms: number;
		bathrooms: number;
		area: number;
		furnishing?: string;
		amenities?: Tag[];
		status?: "available" | "sold" | "rented";
		is_verified?: boolean;
		description?: string;
		onPrimaryAction: () => void;
		onSecondaryAction: () => void;
		primaryLabel: string;
		secondaryLabel: string;
		isForRent?: boolean;
		images: string[];
	};
}

const PropertyOverviewCard: React.FC<PropertyCardProps> = ({ property }) => {
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
		is_verified = false,
		amenities = [],
		description = "",
		onPrimaryAction,
		onSecondaryAction,
		primaryLabel,
		secondaryLabel,
		isForRent = true,
		images: property_images,
	} = property;

	const hasImages =
		property_images &&
		Array.isArray(property_images) &&
		property_images.length > 0;
	const imageList = hasImages ? property_images : [images.defaultHome];

	const locationText =
		typeof location === "string" ? location : formatLocation(location);

	return (
		<View style={styles.card}>
			<View style={styles.imagesContainer}>
				<PropertyImageSlider imageList={imageList} />

				<View
					style={[
						styles.tag,
						{
							backgroundColor: isForRent
								? Colors.success
								: Colors.primary,
						},
					]}
				>
					<AppText style={styles.tagText}>{property_type}</AppText>
				</View>

				{is_verified && (
					<View style={styles.verifiedBadge}>
						<Icons.FA
							name="check-circle"
							size={16}
							color={Colors.success}
						/>
						<AppText style={styles.verifiedText}>VERIFIED</AppText>
					</View>
				)}

				<TouchableOpacity style={styles.heart}>
					<Icons.FA name="heart-o" size={20} color="#fff" />
				</TouchableOpacity>

				{/* Price Badge */}
				<View style={styles.priceBadge}>
					<AppText style={styles.priceText}>
						<Icons.FA name="rupee" size={12} /> {price}
					</AppText>
					{isForRent && (
						<AppText style={styles.depositText}>
							<Icons.FA name="lock" size={10} /> Dep: {priceType}
							{deposit}
						</AppText>
					)}
				</View>
			</View>

			{/* Content */}
			<View style={styles.content}>
				<AppText
					weight="SemiBold"
					style={styles.title}
					numberOfLines={1}
				>
					<Icons.FA name="home" size={16} color="#6b7280" /> {title}
				</AppText>

				<View style={styles.location}>
					<Icons.FA name="map-marker" size={14} color="#ef4444" />
					<AppText style={styles.locationText} numberOfLines={1}>
						{locationText}
					</AppText>
				</View>

				<View style={styles.featuresContainer}>
					<View style={styles.featureItem}>
						<Icons.FA name="bed" size={14} color="#6b7280" />
						<AppText style={styles.featureText}>
							{bedrooms} Beds
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.FA name="bath" size={14} color="#6b7280" />
						<AppText style={styles.featureText}>
							{bathrooms} Baths
						</AppText>
					</View>
					<View style={styles.featureItem}>
						<Icons.FA name="expand" size={14} color="#6b7280" />
						<AppText style={styles.featureText}>
							{area} sqft
						</AppText>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={onSecondaryAction}
						activeOpacity={0.8}
					>
						<Icons.MI
							name="short-text"
							size={14}
							color={Colors.primary}
						/>
						<AppText style={styles.secondaryButtonText}>
							Details
						</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={onPrimaryAction}
						activeOpacity={0.8}
					>
						<Icons.FA name="phone" size={14} color="#fff" />
						<AppText style={styles.primaryButtonText}>
							Contact
						</AppText>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default PropertyOverviewCard;

const styles = StyleSheet.create({
	card: {
		width: SCREEN_WIDTH * 0.875,
		backgroundColor: "#fff",
		borderRadius: 16,
		// marginHorizontal: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 12,
		elevation: 5,
		overflow: "hidden",
	},
	imagesContainer: {
		position: "relative",
		width: "100%",
		// height: 180,
	},
	tag: {
		// width: 16,
		// height: 16,
		position: "absolute",
		left: 0,
		bottom: 0,
		flexDirection: "row",
		// alignItems: 'center',
		// justifyContent: 'center',
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		paddingHorizontal: Spacing.md,
		paddingTop: Spacing.xs,
	},
	tagText: {
		color: Colors.white,
		fontSize: TextSizes.xs,
		textTransform: "capitalize",
		// letterSpacing: 0.5,
	},
	// banner: {
	//   height: 160,
	//   justifyContent: 'space-between',
	//   flexDirection: 'row',
	//   padding: 12,
	// },
	// bannerImage: {
	//   opacity: 0.9,
	// },
	// tagIcon: {
	//   marginRight: 4,
	// },
	verifiedBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		// flexDirection: 'row',
		// alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		// shadowColor: '#000',
		// shadowOpacity: 0.1,
		// shadowOffset: { width: 0, height: 1 },
		// shadowRadius: 2,
		// elevation: 1,
		zIndex: 10,
	},
	verifiedText: {
		marginLeft: 4,
		fontSize: 10,
		color: "#10b981",
		fontWeight: "700",
	},
	heart: {
		position: "absolute",
		right: 8,
		top: 8,
		width: 32,
		height: 32,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
	},
	priceBadge: {
		position: "absolute",
		right: 8,
		bottom: -24,
		backgroundColor: "#fff",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 3,
		alignItems: "center",
	},
	priceText: {
		color: "#10b981",
		fontWeight: "700",
		fontSize: 14,
	},
	depositText: {
		color: "#6b7280",
		fontSize: 10,
		marginTop: 2,
	},
	content: {
		padding: 16,
		paddingTop: 24,
	},
	title: {
		fontSize: TextSizes.md,
		color: "#111827",
		marginBottom: 6,
		textTransform: "capitalize",
	},
	location: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	locationText: {
		fontSize: 13,
		color: "#6b7280",
		marginLeft: 6,
		flex: 1,
	},
	tagsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 12,
	},
	labelTag: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	labelTagText: {
		fontSize: 11,
		fontWeight: "600",
		color: "#fff",
	},
	featuresContainer: {
		flexDirection: "row",
		// flexWrap: 'wrap',
		justifyContent: "space-between",
		marginBottom: 12,
		gap: 8,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.blue50,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
		// minWidth: '48%',
	},
	featureText: {
		fontSize: 12,
		color: "#4b5563",
		marginLeft: 6,
	},
	description: {
		fontSize: 12,
		color: "#6b7280",
		lineHeight: 18,
		marginBottom: 16,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	primaryButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary,
		padding: 12,
		borderRadius: 10,
		marginLeft: 8,
		shadowColor: Colors.primary,
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	primaryButtonText: {
		color: Colors.white,
		fontWeight: "600",
		fontSize: 14,
		marginLeft: 6,
	},
	secondaryButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderColor: Colors.primary,
		borderWidth: 1.5,
		padding: 12,
		borderRadius: 10,
		marginRight: 8,
	},
	secondaryButtonText: {
		color: Colors.primary,
		fontWeight: "600",
		fontSize: 14,
		marginLeft: 6,
	},
});
