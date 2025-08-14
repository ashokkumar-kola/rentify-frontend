import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "../Common/AppText";
import { Colors } from "../../constants";
import images from "../../assets/images";
import Icons from "../../constants/Icons";
import type { PropertyWithLocation } from "../../types/Property";
import PropertyImageSlider from "../../components/PropertyUtils/PropertyImageSlider";

type Props = {
	property: PropertyWithLocation;
	onPress: () => void;
	onToggleWishlist?: (propertyId: string) => void;
	isWishlisted?: boolean;
};

const NewArrivalCard: React.FC<Props> = ({
	property,
	onPress,
	onToggleWishlist,
	isWishlisted = false,
}) => {
	// console.log(property);
	const {
		id,
		title,
		location,
		price,
		deposit,
		bedrooms,
		bathrooms,
		area,
		images: property_images,
	} = property as PropertyWithLocation;

	const [wishlisted, setWishlisted] = useState(isWishlisted);

	const hasImages =
		property_images &&
		Array.isArray(property_images) &&
		property_images.length > 0;
	const imageList = hasImages ? property_images : [images.defaultHome];

	const handleWishlistToggle = () => {
		setWishlisted(!wishlisted);
		if (onToggleWishlist) {
			onToggleWishlist(id);
		}
	};

	return (
		<View style={styles.card}>
			{/* Property Images */}
			<PropertyImageSlider imageList={imageList} />

			{/* New Arrival Tag */}
			<View style={styles.newArrivalTag}>
				<AppText style={styles.newArrivalText}>New</AppText>
			</View>

			{/* Heart Icon */}
			<TouchableOpacity
				style={styles.heartIcon}
				onPress={handleWishlistToggle}
			>
				{wishlisted ? (
					<Icons.FA name="heart" size={16} color={Colors.red} />
				) : (
					<Icons.FA name="heart-o" size={16} color={Colors.white} />
				)}
			</TouchableOpacity>

			{/* Property Info */}
			<View style={styles.detailsContainer}>
				<View style={styles.headerRow}>
					<View style={styles.titleLocation}>
						<TouchableOpacity onPress={onPress}>
							<AppText
								numberOfLines={1}
								ellipsizeMode="tail"
								style={styles.title}
							>
								{title}
							</AppText>
							<AppText
								numberOfLines={1}
								ellipsizeMode="tail"
								style={styles.location}
							>
								<Icons.MI
									name="location-on"
									size={12}
									color={Colors.primary}
								/>{" "}
								{location.locality + ", " + location.city}
							</AppText>
						</TouchableOpacity>
					</View>
					<View style={styles.priceContainer}>
						<AppText style={styles.price}>
							₹{price.toLocaleString()}
						</AppText>
						<AppText style={styles.deposit}>
							₹{deposit.toLocaleString()}
						</AppText>
					</View>
				</View>

				<View style={styles.infoRow}>
					<View style={styles.infoBox}>
						<Icons.MI
							name="king-bed"
							size={16}
							color={Colors.primary}
						/>
						<Text style={styles.infoText}>{bedrooms} BHK</Text>
					</View>
					<View style={styles.infoBox}>
						<Icons.MI
							name="bathtub"
							size={16}
							color={Colors.primary}
						/>
						<Text style={styles.infoText}>{bathrooms} Baths</Text>
					</View>
					<View style={styles.infoBox}>
						<Icons.MI
							name="square-foot"
							size={16}
							color={Colors.primary}
						/>
						<Text style={styles.infoText}>{area} sqft</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default NewArrivalCard;
