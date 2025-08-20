import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	Image,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	Animated,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing, TextSizes } from '../../constants';
import Icons from '../../constants/Icons';
import images from '../../assets/images';
import { saveLastViewedProperty } from '../../utils/propertyUtils/lastViewed';
import { usePropertyDetails } from '../../hooks/propertyHooks/usePropertyDetails';
import { useAppNavigation } from '../../navigation/useAppNavigation';

import { getSimilarByLocation, getSimilarByFeatures  } from '../../services/PropertyServices';

const { width } = Dimensions.get('window');

interface Landlord {
	_id: string;
	full_name: string;
	email: string;
}

interface Property {
	id: string;
	title: string;
	price: number;
	deposit: number;
	location: {
		city: string;
		district: string;
		geo: { lat: number | null; lng: number | null };
		locality: string;
		nearby: string;
		state: string;
		street: string;
		zip: string;
	};
	bedrooms: number;
	bathrooms: number;
	area: number;
	carpet_area: number | null;
	built_year: number | null;
	facing: string;
	floor_no: number;
	total_floors: number;
	furnishing: string;
	property_type: string;
	status: string;
	description: string;
	amenities: string[];
	images: string[];
	video_url: string | null;
	landlord_id: Landlord;
	createdAt: string;
	updatedAt: string;
	is_deleted: boolean;
}

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'PropertyDetails'>;

const PropertyDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
	const { propertyId } = route.params;
	const { navigateTo } = useAppNavigation();
	const { property, loading } = usePropertyDetails(propertyId);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [scaleAnim] = useState(new Animated.Value(0.95));
	const scrollViewRef = useRef<ScrollView>(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: property?.title || 'Property Details',
		});
	}, [navigation, property?.title]);

	// console.log('PropertyDetailsScreen rendered with propertyId:', route);

	useEffect(() => {
		saveLastViewedProperty(propertyId);
	}, [propertyId]);
	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const handleImagePress = (imgUrl: string) => setSelectedImage(imgUrl);
	const closeImageModal = () => setSelectedImage(null);

	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / width);
		setCurrentImageIndex(index);
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (!property) {
		return (
			<View style={styles.centered}>
				<Text style={styles.errorText}>Property not found.</Text>
			</View>
		);
	}

	const typedProperty = property as Property;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<Animated.View
					style={{
						opacity: fadeAnim,
						transform: [{ scale: scaleAnim }],
					}}
				>
					{/* Full-Width Image Gallery */}
					<View style={styles.imageContainer}>
						<ScrollView
							ref={scrollViewRef}
							horizontal
							pagingEnabled
							showsHorizontalScrollIndicator={false}
							onScroll={handleScroll}
							scrollEventThrottle={16}
						>
							{typedProperty.images?.length > 0 ? (
								typedProperty.images.map((imgUrl, index) => (
									<TouchableOpacity
										key={index}
										onPress={() => handleImagePress(imgUrl)}
									>
										<Image
											source={{ uri: imgUrl }}
											style={styles.image}
										/>
									</TouchableOpacity>
								))
							) : (
								<Image
									source={images.defaultHome}
									style={styles.image}
								/>
							)}
						</ScrollView>

						<LinearGradient
							colors={['rgba(0,0,0,0.5)', 'transparent']}
							style={styles.gradientTop}
						/>
						{typedProperty.images?.length > 1 && (
							<View style={styles.dotContainer}>
								{typedProperty.images.map((_, index) => (
									<View
										key={index}
										style={[
											styles.dot,
											{
												backgroundColor:
													index === currentImageIndex
														? Colors.primary
														: Colors.white150,
											},
										]}
									/>
								))}
							</View>
						)}
					</View>

					{/* Info Cards */}
					<View style={styles.card}>
						<View style={styles.locationDetails}>
							<Text style={styles.title}>{typedProperty.title}</Text>
							<View style={styles.locationRow}>
								<Icons.MI
									name="location-on"
									size={18}
									color={Colors.primary}
								/>
								<Text style={styles.locationText}>
									{typedProperty.location.locality},{' '}
									{typedProperty.location.city}
								</Text>
							</View>
							<Text style={styles.subLocationText}>
								{typedProperty.location.street},{' '}
								{typedProperty.location.district},{' '}
								{typedProperty.location.state}{' '}
								{typedProperty.location.zip}
							</Text>
						</View>
						<View style={styles.priceTag}>
							<Text style={styles.priceTagText}>
								Price: ₹{typedProperty.price?.toLocaleString('en-IN')} /month
							</Text>
							<Text style={styles.depositText}>
								Deposit: ₹ {typedProperty.deposit?.toLocaleString('en-IN')} /month
							</Text>
						</View>
					</View>

					<View style={styles.card}>
						<Text style={styles.sectionTitle}>Key Features</Text>
						<View style={styles.featuresContainer}>
							<Feature
								icon="king-bed"
								label={`${typedProperty.bedrooms} Beds`}
							/>
							<Feature
								icon="bathtub"
								label={`${typedProperty.bathrooms} Baths`}
							/>
							<Feature
								icon="square-foot"
								label={`${typedProperty.area} sqft`}
							/>
						</View>
					</View>

					<View style={styles.card}>
						<Text style={styles.sectionTitle}>
							Property Details
						</Text>
						<Detail
							icon="home-work"
							label="Type"
							value={typedProperty.property_type}
						/>
						<Detail
							icon="weekend"
							label="Furnishing"
							value={typedProperty.furnishing}
						/>
						<Detail
							icon="compass-calibration"
							label="Facing"
							value={typedProperty.facing}
						/>
						<Detail
							icon="stairs"
							label="Floor"
							value={`${typedProperty.floor_no} of ${typedProperty.total_floors}`}
						/>
						<Detail
							icon="square-foot"
							label="Carpet Area"
							value={`${typedProperty.carpet_area} sqft`}
						/>
						<Detail
							icon="calendar-month"
							label="Built Year"
							value={`${typedProperty.built_year}`}
						/>
						<Detail
							icon="verified"
							label="Status"
							value={typedProperty.status}
						/>
					</View>

					<View style={styles.card}>
						<Text style={styles.sectionTitle}>Amenities</Text>
						{typedProperty.amenities.length > 0 ? (
							<View style={styles.amenitiesContainer}>
								{typedProperty.amenities.map((a, idx) => (
									<View key={idx} style={styles.amenityItem}>
										<Icons.MI
											name="check-circle-outline"
											size={20}
											color={Colors.primary}
										/>
										<Text style={styles.amenityText}>
											{a}
										</Text>
									</View>
								))}
							</View>
						) : (
							<View style={styles.noAmenitiesContainer}>
								<Icons.MI
									name="info-outline"
									size={20}
									color={Colors.grey600}
								/>
								<Text style={styles.noAmenitiesText}>
									No amenities listed.
								</Text>
							</View>
						)}
					</View>

					<View style={styles.card}>
						<Text style={styles.sectionTitle}>Description</Text>
						<Text style={styles.description}>
							{typedProperty.description}
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.sectionTitle}>Landlord Info</Text>
						<Detail
							icon="person-outline"
							label="Name"
							value={typedProperty.landlord_id?.full_name}
						/>
						<Detail
							icon="email"
							label="Email"
							value={typedProperty.landlord_id?.email}
						/>
					</View>

					{typedProperty.video_url && (
						<View style={styles.card}>
							<Text style={styles.sectionTitle}>Video Tour</Text>
							<TouchableOpacity style={styles.videoButton}>
								<LinearGradient
									colors={[Colors.blue100, Colors.primary]}
									style={styles.videoButtonGradient}
								>
									<Icons.MI
										name="play-circle-filled"
										size={24}
										color={Colors.white}
									/>
									<Text style={styles.videoButtonText}>
										Watch Video Tour
									</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					)}

					{/* <TouchableOpacity
						style={styles.contactButton}
						onPress={() => navigateTo('SupportStack')}
					>
						<LinearGradient
							colors={[Colors.primary, Colors.blue100]}
							style={styles.buttonGradient}
						>
							<Icon name="phone" size={24} color={Colors.white} />
							<Text style={styles.contactButtonText}>
								Contact Owner
							</Text>
						</LinearGradient>
					</TouchableOpacity> */}
				</Animated.View>
			</ScrollView>

			<View style={styles.contactInfoContainer}>
				<TouchableOpacity
					style={styles.visitButton}
					onPress={() => navigateTo('SupportStack')}
				>
					<Icons.MI name="event" size={18} color={Colors.primary} />
					<Text style={styles.visitButtonText}>
						Visit Request
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contactButton}
					onPress={() => navigateTo('SupportStack')}
				>
					<Icons.MI name="phone" size={18} color={Colors.white} />
					<Text style={styles.contactButtonText}>
						Contact Owner
					</Text>
				</TouchableOpacity>
			</View>


			{/* Fullscreen Image Modal */}
			{selectedImage && (
				<View style={styles.modalOverlay}>
					<TouchableOpacity
						style={styles.modalBackdrop}
						onPress={closeImageModal}
					>
						<Icons.MI name="close" size={30} color={Colors.white} />
					</TouchableOpacity>
					<Image
						source={{ uri: selectedImage }}
						style={styles.fullImage}
						resizeMode="contain"
					/>
				</View>
			)}

		</SafeAreaView>
	);
};

export default PropertyDetailsScreen;

// Reusable Feature component
const Feature = ({ icon, label }: { icon: string; label: string }) => (
	<View style={styles.featureItem}>
		<Icons.MI name={icon} size={28} color={Colors.primary} />
		<Text style={styles.featureText}>{label}</Text>
	</View>
);

// Reusable Detail component
const Detail = ({
	icon,
	label,
	value,
}: {
	icon: string;
	label: string;
	value: string | null;
}) => (
	<View style={styles.detailItem}>
		<Icons.MI name={icon} size={20} color={Colors.primary} />
		<Text style={styles.detailLabel}>{label}</Text>
		<Text style={styles.detailValue}>{value || 'N/A'}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f4f6',
	},
	content: {
		paddingBottom: Spacing['2xl'],
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white150,
	},
	imageContainer: {
		height: 220,
		position: 'relative',
		marginBottom: Spacing.xl,
	},
	image: {
		width: width,
		height: 220,
		borderRadius: 0,
	},
	gradientTop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
	},

	dotContainer: {
		position: 'absolute',
		bottom: Spacing.sm,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	card: {
		backgroundColor: Colors.white,
		borderRadius: 16,
		marginHorizontal: Spacing.base,
		marginBottom: Spacing.base,
		padding: Spacing.base,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 5,
		overflow: 'hidden',
	},

	title: {
		fontSize: TextSizes.md,
		fontFamily: Fonts.Bold,
		color: Colors.black,
		// marginBottom: Spacing.sm,
	},
	locationRow: {
		flexDirection: 'row',
		alignItems: 'center',
		// marginBottom: Spacing.sm,
	},
	locationText: {
		fontFamily: Fonts.Medium,
		fontSize: TextSizes.md,
		color: Colors.grey800,
		marginLeft: Spacing.xs,
	},
	subLocationText: {
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.sm,
		color: Colors.grey600,
	},

	priceTag: {
		// position: 'absolute',
		// bottom: Spacing.lg,
		// left: Spacing.lg,
		backgroundColor: 'rgba(0,0,0,0.7)',
		paddingHorizontal: Spacing.base,
		paddingVertical: Spacing.sm,
		borderRadius: 20,
	},
	priceTagText: {
		color: Colors.white,
		fontFamily: Fonts.Bold,
		fontSize: TextSizes.md,
	},
	depositText: {
		color: Colors.white,
		fontFamily: Fonts.Medium,
		fontSize: TextSizes.md,
		marginTop: 2,
	},

	sectionTitle: {
		fontFamily: Fonts.Bold,
		fontSize: TextSizes.base,
		color: Colors.black,
		marginBottom: Spacing.md,
	},
	featuresContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: Spacing.sm,
	},
	featureItem: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f9fafb',
		borderRadius: 16,
		paddingVertical: Spacing.md,
		flex: 1,
		marginHorizontal: 4,
	},
	featureText: {
		fontFamily: Fonts.Medium,
		fontSize: TextSizes.sm,
		color: Colors.grey800,
		marginTop: Spacing.sm,
	},
	detailItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Spacing.sm,
		borderBottomWidth: 0.6,
		borderBottomColor: Colors.grey200,
	},
	detailLabel: {
		fontFamily: Fonts.Medium,
		fontSize: TextSizes.sm,
		color: Colors.grey800,
		marginLeft: Spacing.sm,
		flex: 1,
	},
	detailValue: {
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.sm,
		color: Colors.grey700,
		textAlign: 'right',
		flex: 1,
	},
	description: {
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.sm,
		color: Colors.grey800,
		lineHeight: 26,
	},
	amenitiesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: Spacing.sm,
	},
	amenityItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f9fafb',
		borderRadius: 10,
		padding: Spacing.sm,
		width: '48%',
	},
	amenityText: {
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.sm,
		color: Colors.grey800,
		marginLeft: Spacing.sm,
	},
	noAmenitiesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f3f4f6',
		borderRadius: 10,
		padding: Spacing.md,
	},
	noAmenitiesText: {
		fontFamily: Fonts.Regular,
		fontSize: TextSizes.sm,
		color: Colors.grey600,
		marginLeft: Spacing.sm,
	},
	videoButton: {
		borderRadius: 14,
		overflow: 'hidden',
	},
	videoButtonGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: Spacing.md,
	},
	videoButtonText: {
		fontFamily: Fonts.Bold,
		fontSize: TextSizes.base,
		color: Colors.white,
		marginLeft: Spacing.sm,
	},
	contactInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: Spacing.base,
		paddingVertical: Spacing.sm,
		backgroundColor: Colors.white,
		borderRadius: 16,
		borderTopWidth: 1,
		borderTopColor: Colors.grey200,
	},
	visitButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: Spacing.sm,
		paddingHorizontal: Spacing.base,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.primary,
		overflow: 'hidden',
	},
	contactButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary,
		paddingVertical: Spacing.sm,
		paddingHorizontal: Spacing.base,
		borderRadius: 8,
		overflow: 'hidden',
	},
	buttonGradient: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: Spacing.sm,
		paddingHorizontal: Spacing.base,
		borderRadius: 8,
	},
	visitButtonText: {
		fontFamily: Fonts.SemiBold,
		fontSize: TextSizes.md,
		color: Colors.primary,
		marginLeft: Spacing.sm,
	},
	contactButtonText: {
		fontFamily: Fonts.SemiBold,
		fontSize: TextSizes.md,
		color: Colors.white,
		marginLeft: Spacing.sm,
	},
	errorText: {
		fontFamily: Fonts.Medium,
		fontSize: TextSizes.sm,
		color: Colors.error,
	},
	modalOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.95)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	modalBackdrop: {
		position: 'absolute',
		top: 40,
		right: 20,
		zIndex: 101,
	},
	fullImage: {
		width: width - Spacing.lg * 2,
		height: width - Spacing.lg * 2,
		borderRadius: 20,
	},

});
