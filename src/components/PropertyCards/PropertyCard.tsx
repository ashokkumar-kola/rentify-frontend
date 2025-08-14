import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";

import images from "../../assets/images";

// import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants";

const PropertyCard = ({
	title,
	location,
	price,
	deposit,
	property_type,
	bedrooms,
	bathrooms,
	area,
	image,
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Image
					source={images.defaultHome}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>

			{/* <ImageBackground
                source={require('../assets/images/simple-home.png')}
                style={styles.image}
                resizeMode="contain"
                // imageStyle={{ borderRadius: 16 }}
            >
                <View style={ styles.propertyImgOverlay }> */}
			{/* <Text style={ styles.propertyImgText }>
                        ! {property_type} available
                    </Text> */}
			{/*
                        <TouchableOpacity
                                // onPress={() => setIsFavorite(!isFavorite)}
                                // style={styles.heartIcon}
                        >
                                <Ionicons
                                    name= "heart" // {isFavorite ? 'heart' : 'heart-outline'}
                                    size={28}
                                    color= "red" //{isFavorite ? 'red' : 'white'}
                                />
                        </TouchableOpacity>
                        <Ionicons name="heart" size={28} color="red" />
                    */}
			{/* </View>
            </ImageBackground> */}

			<View style={styles.content}>
				<View style={[styles.row, styles.propertyInfo1]}>
					<View style={[styles.column, styles.propertyTitleLoc]}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.location}>{location}</Text>
					</View>
					<View style={[styles.column, styles.priceTag]}>
						<Text style={styles.price}>${price}</Text>
						{/* <Text style={styles.deposit}>${deposit}</Text> */}
					</View>
				</View>

				<View style={styles.divider} />

				<View style={[styles.row, styles.propertyInfoContainer]}>
					<View style={styles.infoBox}>
						<MaterialIcons
							name="king-bed"
							size={24}
							color={Colors.primary}
						/>
						<Text style={styles.infoLabel}>{bedrooms} BHK</Text>
					</View>

					<View style={styles.infoBox}>
						<MaterialIcons
							name="square-foot"
							size={24}
							color={Colors.primary}
						/>
						<Text style={styles.infoLabel}>{area} sqft</Text>
					</View>

					<View style={styles.infoBox}>
						<MaterialIcons
							name="bathtub"
							size={24}
							color={Colors.primary}
						/>
						<Text style={styles.infoLabel}>{bathrooms} Baths</Text>
					</View>
				</View>

				{/* <View style={styles.divider} />

                <View>
                    <Text style={{textAlign: 'center',}}>!Available for bought</Text>
                </View>

                <View style={styles.divider} /> */}
			</View>

			{/* <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={() => console.log('Property details')}>
                    <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Owner Details')}>
                    <Text style={styles.buttonText, styles.ContactButton}>Contact Owner</Text>
                </TouchableOpacity>
            </View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 250, // '75%',
		backgroundColor: "#fafafa",
		padding: 4,
		paddingBottom: 10,
		marginVertical: 8,
		marginHorizontal: 8,
		borderRadius: 16,
		alignSelf: "center",
		elevation: 4,
		zIndex: 10,
	},

	image: {
		width: "100%",
		height: 130,
		borderRadius: 8,
		marginBottom: 8,
	},

	divider: {
		flex: 1,
		height: 1,
		marginVertical: 8,
		marginHorizontal: 8,
		backgroundColor: Colors.grey100,
	},

	propertyImgOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.1 )",
		// justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 8,
	},

	propertyImgText: {
		padding: 8,
	},

	content: {
		flex: 1,
		paddingHorizontal: 8,
	},

	row: {
		flexDirection: "row",
		// margin: 1,
		// marginBottom: 4,
	},

	column: {
		flexDirection: "column",
		// flex: 1,
		// maxWidth: '80%',
	},

	propertyInfo1: {
		justifyContent: "space-between",
		// marginBottom: 8,
	},

	propertyTitleLoc: {
		width: "70%",
	},

	title: {
		fontSize: 12,
		fontWeight: "700",
		marginBottom: 2,
	},

	location: {
		fontSize: 12,
		color: "#555",
		// marginBottom: 2,
	},

	priceTag: {
		width: "32%",
		borderStyle: "dashed",
		borderWidth: 1,
		borderColor: "#2ecc71",
		paddingHorizontal: 8,
		borderRadius: 8,
		// backgroundColor: '#eafaf1',
		// marginTop: 8,
		// marginBottom: 8,
		// maxWidth: 220,
		// flexShrink: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},

	price: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#27ae60",
		marginBottom: 2,
	},

	deposit: {
		fontSize: 12,
		color: "#555",
	},

	label: {
		fontWeight: "600",
		width: 90,
	},
	infoLabel: {
		fontSize: 12,
	},
	propertyinfo2: {
		justifyContent: "space-evenly",
	},

	propertyInfoContainer: {
		justifyContent: "space-evenly",
		gap: 8,
	},

	value: {
		width: 80,
		height: 40,
		backgroundColor: "skyblue",
		color: "#333",
		padding: 8,
		borderRadius: 8,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},

	infoBox: {
		backgroundColor: "#dff6ff",
		paddingVertical: 8,
		// paddingHorizontal: 8,
		borderRadius: 12,
		alignItems: "center",
		width: "30%",
		// elevation: 3,
		// shadowColor: '#000',
		// shadowOpacity: 0.1,
		// shadowOffset: { width: 0, height: 2 },
		// shadowRadius: 4,
	},

	buttonRow: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		// marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 4,
	},

	button: {
		backgroundColor: Colors.primary, // '#2b5fc0', // Blue primary
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 16,
		// elevation: 3,
		flex: 1,
		marginHorizontal: 5,
		alignItems: "center",
	},
	buttonText: {
		color: Colors.primary,
		fontWeight: "600",
		fontSize: 16,
	},
	ContactButton: {
		color: "#fff",
	},
	detailsButton: {
		backgroundColor: "transparent", // Slightly darker blue for variation 'rgba(120, 120, 220, 0.7)'
		borderWidth: 1,
		borderColor: Colors.primary,
		color: Colors.primary,
	},
});

export default PropertyCard;
