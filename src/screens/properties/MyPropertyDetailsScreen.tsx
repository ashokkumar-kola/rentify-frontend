import React, { useState, useRef, useEffect, useCallback } from 'react';
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
	Alert,
	StatusBar,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts, Spacing, TextSizes } from '../../constants';
import images from '../../assets/images';
import { usePropertyDetails } from '../../hooks/propertyHooks/usePropertyDetails';
// import { useAppNavigation } from '../../navigation/useAppNavigation';
import { deleteProperty } from '../../services/PropertyServices';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyPropertiesStackParamList } from '../../navigation/types';

const { width, height } = Dimensions.get('window');

// Enhanced Interfaces
interface Landlord {
	_id: string;
	full_name: string;
	email: string;
	phone_number: string;
}

interface Location {
	city: string;
	district: string;
	geo: { lat: number | null; lng: number | null };
	locality: string;
	nearby: string;
	state: string;
	street: string;
	zip: string;
}

interface Property {
	id: string;
	title: string;
	price: number;
	deposit: number;
	location: Location;
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

type Props = NativeStackScreenProps<MyPropertiesStackParamList, 'MyPropertyDetails'>;

// Custom Hooks
const useImageGallery = (images: string[]) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const scrollViewRef = useRef<ScrollView>(null);

	const handleImagePress = useCallback((imgUrl: string) => {
		setSelectedImage(imgUrl);
	}, []);

	const closeImageModal = useCallback(() => {
		setSelectedImage(null);
	}, []);

	const handleScroll = useCallback((event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / width);
		setCurrentImageIndex(index);
	}, []);

	return {
		selectedImage,
		currentImageIndex,
		scrollViewRef,
		handleImagePress,
		closeImageModal,
		handleScroll,
	};
};

const useAnimations = () => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [scaleAnim] = useState(new Animated.Value(0.95));
	const [slideAnim] = useState(new Animated.Value(50));

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	return { fadeAnim, scaleAnim, slideAnim };
};

const usePropertyActions = (navigation: any) => {
	const [loading, setLoading] = useState(false);
	// const { navigateTo } = useAppNavigation();

	const handleDeleteProperty = useCallback((propertyId: string) => {
		Alert.alert(
			'Delete Property',
			'Are you sure you want to delete this property? This action cannot be undone.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						try {
							setLoading(true);
							const response = await deleteProperty(propertyId);
							if (response) {
								Alert.alert(
									'Success',
									'Property deleted successfully.',
									[
										{
											text: 'OK',
											onPress: () => navigation.navigate('MyProperties'),
										},
									]
								);
							}
						} catch (error) {
							Alert.alert(
								'Error',
								'Failed to delete the property. Please try again.'
							);
							console.error('Delete error:', error);
						} finally {
							setLoading(false);
						}
					},
				},
			],
			{ cancelable: true }
		);
	}, [navigation]);

	const handleContactOwner = useCallback(() => {
		// navigateTo('SupportStack');
		navigation.navigate('Properties');
	}, [navigation]);

	return { loading, handleDeleteProperty, handleContactOwner };
};

// Component Functions
const LoadingScreen = () => (
	<View style={styles.centered}>
		<ActivityIndicator size="large" color={Colors.primary} />
		<Text style={styles.loadingText}>Loading property details...</Text>
	</View>
);

const ErrorScreen = () => (
	<View style={styles.centered}>
		<Icon name="error-outline" size={64} color={Colors.error} />
		<Text style={styles.errorText}>Property not found</Text>
		<Text style={styles.errorSubText}>
			The property you're looking for might have been removed or doesn't exist.
		</Text>
	</View>
);

const ImageGallery = ({ property, imageGallery }: { property: Property; imageGallery: any }) => (
	<View style={styles.imageContainer}>
		<ScrollView
			ref={imageGallery.scrollViewRef}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			onScroll={imageGallery.handleScroll}
			scrollEventThrottle={16}
		>
			{property.images?.length > 0 ? (
				property.images.map((imgUrl, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => imageGallery.handleImagePress(imgUrl)}
						activeOpacity={0.9}
					>
						<Image source={{ uri: imgUrl }} style={styles.image} />
						<LinearGradient
							colors={['transparent', 'rgba(0,0,0,0.3)']}
							style={styles.imageOverlay}
						/>
					</TouchableOpacity>
				))
			) : (
				<TouchableOpacity activeOpacity={0.9}>
					<Image source={images.defaultHome} style={styles.image} />
				</TouchableOpacity>
			)}
		</ScrollView>

		<LinearGradient
			colors={['rgba(0,0,0,0.6)', 'transparent']}
			style={styles.gradientTop}
		/>

		<View style={styles.priceContainer}>
			<View style={styles.priceTag}>
				<Text style={styles.priceTagText}>
					₹{property.price?.toLocaleString('en-IN')}
				</Text>
				<Text style={styles.priceSubText}>/month</Text>
			</View>
			<Text style={styles.depositText}>
				Deposit: ₹{property.deposit?.toLocaleString('en-IN')}
			</Text>
		</View>

		{property.images?.length > 1 && (
			<View style={styles.dotContainer}>
				{property.images.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							// eslint-disable-next-line react-native/no-inline-styles
							{
								backgroundColor:
									index === imageGallery.currentImageIndex
										? Colors.primary
										: Colors.white,
								opacity: index === imageGallery.currentImageIndex ? 1 : 0.5,
							},
						]}
					/>
				))}
			</View>
		)}
	</View>
);

const PropertyHeader = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.title}>{property.title}</Text>
		<View style={styles.locationRow}>
			<Icon name="location-on" size={22} color={Colors.primary} />
			<Text style={styles.locationText}>
				{property.location.locality}, {property.location.city}
			</Text>
		</View>
		<Text style={styles.subLocationText}>
			{property.location.street}, {property.location.district}, {property.location.state} {property.location.zip}
		</Text>
		<View style={styles.statusContainer}>
			<View style={[styles.statusBadge, { backgroundColor: getStatusColor(property.status) }]}>
				<Text style={styles.statusText}>{property.status}</Text>
			</View>
		</View>
	</View>
);

const KeyFeatures = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.sectionTitle}>Key Features</Text>
		<View style={styles.featuresContainer}>
			<FeatureItem icon="bed" label={`${property.bedrooms} Beds`} />
			<FeatureItem icon="bathtub" label={`${property.bathrooms} Baths`} />
			<FeatureItem icon="square-foot" label={`${property.area} sqft`} />
		</View>
	</View>
);

const PropertyDetails = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.sectionTitle}>Property Details</Text>
		<DetailItem icon="home-work" label="Type" value={property.property_type} />
		<DetailItem icon="weekend" label="Furnishing" value={property.furnishing} />
		<DetailItem icon="explore" label="Facing" value={property.facing} />
		<DetailItem icon="stairs" label="Floor" value={`${property.floor_no} of ${property.total_floors}`} />
		<DetailItem icon="square-foot" label="Carpet Area" value={`${property.carpet_area || 'N/A'} sqft`} />
		<DetailItem icon="calendar-today" label="Built Year" value={`${property.built_year || 'N/A'}`} />
	</View>
);

const Description = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.sectionTitle}>Description</Text>
		<Text style={styles.description}>{property.description}</Text>
	</View>
);

const Amenities = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.sectionTitle}>Amenities</Text>
		{property.amenities.length > 0 ? (
			<View style={styles.amenitiesContainer}>
				{property.amenities.map((amenity, idx) => (
					<View key={idx} style={styles.amenityItem}>
						<Icon name="check-circle" size={20} color={Colors.success} />
						<Text style={styles.amenityText}>{amenity}</Text>
					</View>
				))}
			</View>
		) : (
			<View style={styles.noAmenitiesContainer}>
				<Icon name="info-outline" size={20} color={Colors.grey600} />
				<Text style={styles.noAmenitiesText}>No amenities listed</Text>
			</View>
		)}
	</View>
);

const LandlordInfo = ({ property }: { property: Property }) => (
	<View style={styles.card}>
		<Text style={styles.sectionTitle}>Landlord Information</Text>
		<DetailItem icon="person" label="Name" value={property.landlord_id?.full_name} />
		<DetailItem icon="email" label="Email" value={property.landlord_id?.email} />
		<DetailItem icon="phone" label="Phone" value={property.landlord_id?.phone_number} />
	</View>
);

const VideoSection = ({ property }: { property: Property }) => {
	if (!property.video_url) {return null;}

	return (
		<View style={styles.card}>
			<Text style={styles.sectionTitle}>Video Tour</Text>
			<TouchableOpacity style={styles.videoButton} activeOpacity={0.8}>
				<LinearGradient colors={[Colors.primary, Colors.blue400]} style={styles.videoButtonGradient}>
					<Icon name="play-circle-filled" size={24} color={Colors.white} />
					<Text style={styles.videoButtonText}>Watch Video Tour</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const ActionButtons = ({ property, actions }: { property: Property; actions: any }) => (
	<View style={styles.actionButtonsContainer}>
		<TouchableOpacity
			style={styles.contactButton}
			onPress={actions.handleContactOwner}
			activeOpacity={0.8}
		>
			<LinearGradient colors={[Colors.primary, Colors.blue400]} style={styles.buttonGradient}>
				<Icon name="phone" size={24} color={Colors.white} />
				<Text style={styles.contactButtonText}>Contact Owner</Text>
			</LinearGradient>
		</TouchableOpacity>

		<TouchableOpacity
			style={styles.deleteButton}
			onPress={() => actions.handleDeleteProperty(property.id)}
			activeOpacity={0.8}
			disabled={actions.loading}
		>
			{actions.loading ? (
				<ActivityIndicator size="small" color={Colors.error} />
			) : (
				<>
					<Icon name="delete" size={20} color={Colors.error} />
					<Text style={styles.deleteButtonText}>Delete Property</Text>
				</>
			)}
		</TouchableOpacity>
	</View>
);

const ImageModal = ({ selectedImage, onClose }: { selectedImage: string | null; onClose: () => void }) => {
	if (!selectedImage) {return null;}

	return (
		<View style={styles.modalOverlay}>
			<TouchableOpacity style={styles.modalBackdrop} onPress={onClose}>
				<View style={styles.modalHeader}>
					<Icon name="close" size={30} color={Colors.white} />
				</View>
			</TouchableOpacity>
			<Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
		</View>
	);
};

// Utility Functions
const getStatusColor = (status: string): string => {
	switch (status.toLowerCase()) {
		case 'available':
			return Colors.success;
		case 'rented':
			return Colors.error;
		case 'pending':
			return Colors.warning;
		default:
			return Colors.grey500;
	}
};

// Reusable Components
const FeatureItem = ({ icon, label }: { icon: string; label: string }) => (
	<View style={styles.featureItem}>
		<View style={styles.featureIconContainer}>
			<Icon name={icon} size={28} color={Colors.primary} />
		</View>
		<Text style={styles.featureText}>{label}</Text>
	</View>
);

const DetailItem = ({ icon, label, value }: { icon: string; label: string; value: string | null }) => (
	<View style={styles.detailItem}>
		<Icon name={icon} size={20} color={Colors.primary} />
		<View style={styles.detailContent}>
			<Text style={styles.detailLabel}>{label}</Text>
			<Text style={styles.detailValue}>{value || 'N/A'}</Text>
		</View>
	</View>
);

// Main Component
const MyPropertyDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
	const { propertyId } = route.params;
	const { property, loading: propertyLoading } = usePropertyDetails(propertyId);
	const animations = useAnimations();
	const actions = usePropertyActions(navigation);
	const imageGallery = useImageGallery(property?.images || []);

	if (propertyLoading) {
		return <LoadingScreen />;
	}

	if (!property) {
		return <ErrorScreen />;
	}

	const typedProperty = property as Property;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<Animated.View
					style={{
						opacity: animations.fadeAnim,
						transform: [
							{ scale: animations.scaleAnim },
							{ translateY: animations.slideAnim },
						],
					}}
				>
					<ImageGallery property={typedProperty} imageGallery={imageGallery} />
					<PropertyHeader property={typedProperty} />
					<KeyFeatures property={typedProperty} />
					<PropertyDetails property={typedProperty} />
					<Description property={typedProperty} />
					<Amenities property={typedProperty} />
					<LandlordInfo property={typedProperty} />
					<VideoSection property={typedProperty} />
					<ActionButtons property={typedProperty} actions={actions} />
				</Animated.View>
			</ScrollView>

			<ImageModal selectedImage={imageGallery.selectedImage} onClose={imageGallery.closeImageModal} />
		</SafeAreaView>
	);
};

export default MyPropertyDetailsScreen;

// Enhanced Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white150 || '#f8f9fa',
	},
	content: {
		paddingBottom: 30,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: Colors.grey700 || '#666',
		fontFamily: Fonts.Regular,
	},
	errorText: {
		fontSize: 20,
		fontWeight: '600',
		color: Colors.error,
		marginTop: 16,
		textAlign: 'center',
		fontFamily: Fonts.SemiBold,
	},
	errorSubText: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		marginTop: 8,
		textAlign: 'center',
		paddingHorizontal: 20,
		lineHeight: 20,
	},

	// Image Gallery
	imageContainer: {
		height: height * 0.45,
		position: 'relative',
	},
	image: {
		width: width,
		height: '100%',
		backgroundColor: Colors.grey200 || '#f0f0f0',
	},
	imageOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
	},
	gradientTop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
	},
	priceContainer: {
		position: 'absolute',
		top: 60,
		right: 20,
		alignItems: 'flex-end',
	},
	priceTag: {
		backgroundColor: 'rgba(255,255,255,0.95)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 12,
		flexDirection: 'row',
		alignItems: 'baseline',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	priceTagText: {
		fontSize: 20,
		fontWeight: '700',
		color: Colors.primary,
		fontFamily: Fonts.Bold,
	},
	priceSubText: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		marginLeft: 4,
		fontFamily: Fonts.Regular,
	},
	depositText: {
		fontSize: 12,
		color: Colors.white,
		backgroundColor: 'rgba(0,0,0,0.7)',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 8,
		marginTop: 6,
		fontFamily: Fonts.Regular,
	},
	dotContainer: {
		position: 'absolute',
		bottom: 20,
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

	// Cards
	card: {
		backgroundColor: Colors.white || '#ffffff',
		marginHorizontal: 16,
		marginTop: 16,
		padding: 20,
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},

	// Property Header
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: Colors.black || '#1a1a1a',
		marginBottom: 12,
		fontFamily: Fonts.Bold,
	},
	locationRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	locationText: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.black || '#1a1a1a',
		marginLeft: 8,
		flex: 1,
		fontFamily: Fonts.SemiBold,
	},
	subLocationText: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		lineHeight: 20,
		fontFamily: Fonts.Regular,
	},
	statusContainer: {
		marginTop: 12,
		alignItems: 'flex-start',
	},
	statusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	statusText: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.white,
		textTransform: 'uppercase',
		fontFamily: Fonts.SemiBold,
	},

	// Sections
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.black || '#1a1a1a',
		marginBottom: 16,
		fontFamily: Fonts.SemiBold,
	},

	// Features
	featuresContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	featureItem: {
		alignItems: 'center',
		flex: 1,
	},
	featureIconContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#e3f2fd',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	featureText: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.black || '#1a1a1a',
		textAlign: 'center',
		fontFamily: Fonts.Regular,
	},

	// Details
	detailItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey200 || '#f0f0f0',
	},
	detailContent: {
		flex: 1,
		marginLeft: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	detailLabel: {
		fontSize: 15,
		color: Colors.grey700 || '#666',
		fontFamily: Fonts.Regular,
	},
	detailValue: {
		fontSize: 15,
		fontWeight: '600',
		color: Colors.black || '#1a1a1a',
		fontFamily: Fonts.SemiBold,
	},

	// Description
	description: {
		fontSize: 15,
		lineHeight: 24,
		color: Colors.grey700 || '#666',
		fontFamily: Fonts.Regular,
	},

	// Amenities
	amenitiesContainer: {
		gap: 12,
	},
	amenityItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	amenityText: {
		fontSize: 15,
		color: Colors.black || '#1a1a1a',
		marginLeft: 12,
		fontFamily: Fonts.Regular,
	},
	noAmenitiesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#f8f9fa',
		borderRadius: 8,
	},
	noAmenitiesText: {
		fontSize: 14,
		color: Colors.grey700 || '#666',
		marginLeft: 8,
		fontStyle: 'italic',
		fontFamily: Fonts.Regular,
	},

	// Video Section
	videoButton: {
		borderRadius: 12,
		overflow: 'hidden',
	},
	videoButtonGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		paddingHorizontal: 24,
	},
	videoButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.white,
		marginLeft: 8,
		fontFamily: Fonts.SemiBold,
	},

	// Action Buttons
	actionButtonsContainer: {
		paddingHorizontal: 16,
		marginTop: 16,
		gap: 12,
	},
	contactButton: {
		borderRadius: 12,
		overflow: 'hidden',
	},
	buttonGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		paddingHorizontal: 24,
	},
	contactButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.white,
		marginLeft: 8,
		fontFamily: Fonts.SemiBold,
	},
	deleteButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffebee',
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.error,
	},
	deleteButtonText: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.error,
		marginLeft: 8,
		fontFamily: Fonts.Regular,
	},

	// Modal
	modalOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.9)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalBackdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	modalHeader: {
		position: 'absolute',
		top: 50,
		right: 20,
		zIndex: 1,
	},
	fullImage: {
		width: width * 0.9,
		height: height * 0.8,
		borderRadius: 8,
	},
});


// import React, { useState, useRef, useEffect } from 'react';
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	ScrollView,
// 	ActivityIndicator,
// 	Image,
// 	SafeAreaView,
// 	TouchableOpacity,
// 	Dimensions,
// 	Animated,
// 	Alert,
// } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Colors, Fonts, Spacing, TextSizes } from '../../constants';
// import images from '../../assets/images';
// import { usePropertyDetails } from '../../hooks/propertyHooks/usePropertyDetails';
// import { useAppNavigation } from '../../navigation/useAppNavigation';
// import { deleteProperty } from '../../services/PropertyServices';

// const { width } = Dimensions.get('window');

// // Interfaces (unchanged)
// interface Landlord {
// 	_id: string;
// 	full_name: string;
// 	email: string;
// 	phone_number: string;
// }

// interface Property {
// 	id: string;
// 	title: string;
// 	price: number;
// 	deposit: number;
// 	location: {
// 		city: string;
// 		district: string;
// 		geo: { lat: number | null; lng: number | null };
// 		locality: string;
// 		nearby: string;
// 		state: string;
// 		street: string;
// 		zip: string;
// 	};
// 	bedrooms: number;
// 	bathrooms: number;
// 	area: number;
// 	carpet_area: number | null;
// 	built_year: number | null;
// 	facing: string;
// 	floor_no: number;
// 	total_floors: number;
// 	furnishing: string;
// 	property_type: string;
// 	status: string;
// 	description: string;
// 	amenities: string[];
// 	images: string[];
// 	video_url: string | null;
// 	landlord_id: Landlord;
// 	createdAt: string;
// 	updatedAt: string;
// 	is_deleted: boolean;
// }

// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { MyPropertiesStackParamList } from '../../navigation/types';

// type Props = NativeStackScreenProps<
// 	MyPropertiesStackParamList,
// 	'MyPropertyDetails'
// >;

// const MyPropertyDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
// 	const { propertyId } = route.params;
// 	const { navigateTo } = useAppNavigation();
// 	const { property, loading: propertyLoading } =
// 		usePropertyDetails(propertyId);
// 	const [selectedImage, setSelectedImage] = useState<string | null>(null);
// 	const [currentImageIndex, setCurrentImageIndex] = useState(0);
// 	const [fadeAnim] = useState(new Animated.Value(0));
// 	const [scaleAnim] = useState(new Animated.Value(0.95));
// 	const scrollViewRef = useRef<ScrollView>(null);
// 	const [loading, setLoading] = useState(false);

// 	// console.log('PropertyDetailsScreen rendered with propertyId:', route);

// 	useEffect(() => {
// 		Animated.parallel([
// 			Animated.timing(fadeAnim, {
// 				toValue: 1,
// 				duration: 400,
// 				useNativeDriver: true,
// 			}),
// 			Animated.spring(scaleAnim, {
// 				toValue: 1,
// 				friction: 8,
// 				tension: 40,
// 				useNativeDriver: true,
// 			}),
// 		]).start();
// 	}, []);

// 	const handleImagePress = (imgUrl: string) => setSelectedImage(imgUrl);
// 	const closeImageModal = () => setSelectedImage(null);

// 	const handleScroll = (event: any) => {
// 		const contentOffsetX = event.nativeEvent.contentOffset.x;
// 		const index = Math.round(contentOffsetX / width);
// 		setCurrentImageIndex(index);
// 	};
// 	const handleDeleteProperty = (propertyId: string) => {
// 		Alert.alert(
// 			'Confirm Deletion',
// 			'Are you sure you want to delete this property?',
// 			[
// 				{
// 					text: 'Cancel',
// 					style: 'cancel',
// 				},
// 				{
// 					text: 'Delete',
// 					style: 'destructive',
// 					onPress: async () => {
// 						try {
// 							setLoading(true); // assume you use a loading state
// 							const response = await deleteProperty(propertyId);
// 							if (response) {
// 								Alert.alert(
// 									'Success',
// 									'Property deleted successfully.'
// 								);
// 								navigation.navigate('MyProperties');
// 							}
// 						} catch (error) {
// 							Alert.alert(
// 								'Error',
// 								'Failed to delete the property. Please try again.'
// 							);
// 							console.error('Delete error:', error);
// 						} finally {
// 							setLoading(false);
// 						}
// 					},
// 				},
// 			],
// 			{ cancelable: true }
// 		);
// 	};

// 	if (propertyLoading) {
// 		return (
// 			<View style={styles.centered}>
// 				<ActivityIndicator size="large" color={Colors.primary} />
// 			</View>
// 		);
// 	}

// 	if (!property) {
// 		return (
// 			<View style={styles.centered}>
// 				<Text style={styles.errorText}>Property not found.</Text>
// 			</View>
// 		);
// 	}

// 	const typedProperty = property as Property;

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<ScrollView
// 				contentContainerStyle={styles.content}
// 				showsVerticalScrollIndicator={false}
// 			>
// 				<Animated.View
// 					style={{
// 						opacity: fadeAnim,
// 						transform: [{ scale: scaleAnim }],
// 					}}
// 				>
// 					{/* Full-Width Image Gallery */}
// 					<View style={styles.imageContainer}>
// 						<ScrollView
// 							ref={scrollViewRef}
// 							horizontal
// 							pagingEnabled
// 							showsHorizontalScrollIndicator={false}
// 							onScroll={handleScroll}
// 							scrollEventThrottle={16}
// 						>
// 							{typedProperty.images?.length > 0 ? (
// 								typedProperty.images.map((imgUrl, index) => (
// 									<TouchableOpacity
// 										key={index}
// 										onPress={() => handleImagePress(imgUrl)}
// 									>
// 										<Image
// 											source={{ uri: imgUrl }}
// 											style={styles.image}
// 										/>
// 									</TouchableOpacity>
// 								))
// 							) : (
// 								<Image
// 									source={images.defaultHome}
// 									style={styles.image}
// 								/>
// 							)}
// 						</ScrollView>

// 						<LinearGradient
// 							colors={['rgba(0,0,0,0.5)', 'transparent']}
// 							style={styles.gradientTop}
// 						/>
// 						<View style={styles.priceTag}>
// 							<Text style={styles.priceTagText}>
// 								₹{typedProperty.price?.toLocaleString('en-IN')}
// 								/mo
// 							</Text>
// 							<Text style={styles.depositText}>
// 								Deposit: ₹
// 								{typedProperty.deposit?.toLocaleString('en-IN')}
// 							</Text>
// 						</View>
// 						{typedProperty.images?.length > 1 && (
// 							<View style={styles.dotContainer}>
// 								{typedProperty.images.map((_, index) => (
// 									<View
// 										key={index}
// 										style={[
// 											styles.dot,
// 											{
// 												backgroundColor:
// 													index === currentImageIndex
// 														? Colors.primary
// 														: Colors.grey400,
// 											},
// 										]}
// 									/>
// 								))}
// 							</View>
// 						)}
// 					</View>

// 					{/* Info Cards */}
// 					<View style={styles.card}>
// 						<Text style={styles.title}>{typedProperty.title}</Text>
// 						<View style={styles.locationRow}>
// 							<Icon
// 								name="location-on"
// 								size={22}
// 								color={Colors.primary}
// 							/>
// 							<Text style={styles.locationText}>
// 								{typedProperty.location.locality},{' '}
// 								{typedProperty.location.city}
// 							</Text>
// 						</View>
// 						<Text style={styles.subLocationText}>
// 							{typedProperty.location.street},{' '}
// 							{typedProperty.location.district},{' '}
// 							{typedProperty.location.state}{' '}
// 							{typedProperty.location.zip}
// 						</Text>
// 					</View>

// 					<View style={styles.card}>
// 						<Text style={styles.sectionTitle}>Key Features</Text>
// 						<View style={styles.featuresContainer}>
// 							<Feature
// 								icon="king-bed"
// 								label={`${typedProperty.bedrooms} Beds`}
// 							/>
// 							<Feature
// 								icon="bathtub"
// 								label={`${typedProperty.bathrooms} Baths`}
// 							/>
// 							<Feature
// 								icon="square-foot"
// 								label={`${typedProperty.area} sqft`}
// 							/>
// 						</View>
// 					</View>

// 					<View style={styles.card}>
// 						<Text style={styles.sectionTitle}>
// 							Property Details
// 						</Text>
// 						<Detail
// 							icon="home-work"
// 							label="Type"
// 							value={typedProperty.property_type}
// 						/>
// 						<Detail
// 							icon="weekend"
// 							label="Furnishing"
// 							value={typedProperty.furnishing}
// 						/>
// 						<Detail
// 							icon="compass-calibration"
// 							label="Facing"
// 							value={typedProperty.facing}
// 						/>
// 						<Detail
// 							icon="stairs"
// 							label="Floor"
// 							value={`${typedProperty.floor_no} of ${typedProperty.total_floors}`}
// 						/>
// 						<Detail
// 							icon="square-foot"
// 							label="Carpet Area"
// 							value={`${typedProperty.carpet_area} sqft`}
// 						/>
// 						<Detail
// 							icon="calendar-month"
// 							label="Built Year"
// 							value={`${typedProperty.built_year}`}
// 						/>
// 						<Detail
// 							icon="verified"
// 							label="Status"
// 							value={typedProperty.status}
// 						/>
// 					</View>

// 					<View style={styles.card}>
// 						<Text style={styles.sectionTitle}>Description</Text>
// 						<Text style={styles.description}>
// 							{typedProperty.description}
// 						</Text>
// 					</View>

// 					<View style={styles.card}>
// 						<Text style={styles.sectionTitle}>Amenities</Text>
// 						{typedProperty.amenities.length > 0 ? (
// 							<View style={styles.amenitiesContainer}>
// 								{typedProperty.amenities.map((a, idx) => (
// 									<View key={idx} style={styles.amenityItem}>
// 										<Icon
// 											name="check-circle-outline"
// 											size={20}
// 											color={Colors.primary}
// 										/>
// 										<Text style={styles.amenityText}>
// 											{a}
// 										</Text>
// 									</View>
// 								))}
// 							</View>
// 						) : (
// 							<View style={styles.noAmenitiesContainer}>
// 								<Icon
// 									name="info-outline"
// 									size={20}
// 									color={Colors.grey600}
// 								/>
// 								<Text style={styles.noAmenitiesText}>
// 									No amenities listed.
// 								</Text>
// 							</View>
// 						)}
// 					</View>

// 					<View style={styles.card}>
// 						<Text style={styles.sectionTitle}>Landlord Info</Text>
// 						<Detail
// 							icon="person-outline"
// 							label="Name"
// 							value={typedProperty.landlord_id?.full_name}
// 						/>
// 						<Detail
// 							icon="email"
// 							label="Email"
// 							value={typedProperty.landlord_id?.email}
// 						/>
// 						<Detail
// 							icon="phone"
// 							label="Phone"
// 							value={typedProperty.landlord_id?.phone_number}
// 						/>
// 					</View>

// 					{typedProperty.video_url && (
// 						<View style={styles.card}>
// 							<Text style={styles.sectionTitle}>Video Tour</Text>
// 							<TouchableOpacity style={styles.videoButton}>
// 								<LinearGradient
// 									colors={[Colors.blue100, Colors.primary]}
// 									style={styles.videoButtonGradient}
// 								>
// 									<Icon
// 										name="play-circle-filled"
// 										size={24}
// 										color={Colors.white}
// 									/>
// 									<Text style={styles.videoButtonText}>
// 										Watch Video Tour
// 									</Text>
// 								</LinearGradient>
// 							</TouchableOpacity>
// 						</View>
// 					)}

// 					<TouchableOpacity
// 						style={styles.contactButton}
// 						onPress={() => navigateTo('SupportStack')}
// 					>
// 						<LinearGradient
// 							colors={[Colors.primary, Colors.blue100]}
// 							style={styles.buttonGradient}
// 						>
// 							<Icon name="phone" size={24} color={Colors.white} />
// 							<Text style={styles.contactButtonText}>
// 								Contact Owner
// 							</Text>
// 						</LinearGradient>
// 					</TouchableOpacity>

// 					<TouchableOpacity
// 						style={styles.deleteButton}
// 						onPress={() => handleDeleteProperty(typedProperty.id)}
// 						activeOpacity={0.8}
// 					>
// 						<Icon name="delete" size={20} color={Colors.error} />
// 						<Text style={styles.deleteButtonText}>
// 							Delete Property
// 						</Text>
// 					</TouchableOpacity>
// 				</Animated.View>
// 			</ScrollView>

// 			{/* Fullscreen Image Modal */}
// 			{selectedImage && (
// 				<View style={styles.modalOverlay}>
// 					<TouchableOpacity
// 						style={styles.modalBackdrop}
// 						onPress={closeImageModal}
// 					>
// 						<Icon name="close" size={30} color={Colors.white} />
// 					</TouchableOpacity>
// 					<Image
// 						source={{ uri: selectedImage }}
// 						style={styles.fullImage}
// 						resizeMode="contain"
// 					/>
// 				</View>
// 			)}
// 		</SafeAreaView>
// 	);
// };

// export default MyPropertyDetailsScreen;

// const Feature = ({ icon, label }: { icon: string; label: string }) => (
// 	<View style={styles.featureItem}>
// 		<Icon name={icon} size={28} color={Colors.primary} />
// 		<Text style={styles.featureText}>{label}</Text>
// 	</View>
// );

// const Detail = ({
// 	icon,
// 	label,
// 	value,
// }: {
// 	icon: string;
// 	label: string;
// 	value: string | null;
// }) => (
// 	<View style={styles.detailItem}>
// 		<Icon name={icon} size={20} color={Colors.primary} />
// 		<Text style={styles.detailLabel}>{label}</Text>
// 		<Text style={styles.detailValue}>{value || 'N/A'}</Text>
// 	</View>
// );

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#f3f4f6',
// 	},
// 	content: {
// 		paddingBottom: Spacing.xl * 2,
// 	},
// 	centered: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#f3f4f6',
// 	},
// 	imageContainer: {
// 		height: 360,
// 		position: 'relative',
// 		marginBottom: Spacing.xl,
// 	},
// 	image: {
// 		width: width,
// 		height: 360,
// 		borderRadius: 0,
// 	},
// 	gradientTop: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		height: 100,
// 	},
// 	priceTag: {
// 		position: 'absolute',
// 		bottom: Spacing.lg,
// 		left: Spacing.lg,
// 		backgroundColor: 'rgba(0,0,0,0.7)',
// 		paddingHorizontal: Spacing.lg,
// 		paddingVertical: Spacing.sm,
// 		borderRadius: 20,
// 	},
// 	priceTagText: {
// 		color: Colors.white,
// 		fontFamily: Fonts.Bold,
// 		fontSize: TextSizes.base,
// 	},
// 	depositText: {
// 		color: Colors.white,
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.base,
// 		marginTop: 2,
// 	},
// 	dotContainer: {
// 		position: 'absolute',
// 		bottom: Spacing.sm,
// 		left: 0,
// 		right: 0,
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	dot: {
// 		width: 8,
// 		height: 8,
// 		borderRadius: 4,
// 		marginHorizontal: 4,
// 	},
// 	card: {
// 		backgroundColor: Colors.white,
// 		borderRadius: 28,
// 		marginHorizontal: Spacing.lg,
// 		marginBottom: Spacing.lg,
// 		padding: Spacing.xl,
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 6 },
// 		shadowOpacity: 0.08,
// 		shadowRadius: 10,
// 		elevation: 5,
// 		overflow: 'hidden',
// 	},
// 	title: {
// 		fontSize: TextSizes.base,
// 		fontFamily: Fonts.Bold,
// 		color: Colors.black,
// 		marginBottom: Spacing.sm,
// 	},
// 	locationRow: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginBottom: Spacing.sm,
// 	},
// 	locationText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.base,
// 		color: Colors.grey800,
// 		marginLeft: Spacing.sm,
// 	},
// 	subLocationText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: 14,
// 		color: Colors.grey600,
// 	},
// 	sectionTitle: {
// 		fontFamily: Fonts.Bold,
// 		fontSize: TextSizes.base,
// 		color: Colors.black,
// 		marginBottom: Spacing.md,
// 	},
// 	featuresContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		gap: Spacing.sm,
// 	},
// 	featureItem: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: '#f9fafb',
// 		borderRadius: 16,
// 		paddingVertical: Spacing.md,
// 		flex: 1,
// 		marginHorizontal: 4,
// 	},
// 	featureText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey800,
// 		marginTop: Spacing.sm,
// 	},
// 	detailItem: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		paddingVertical: Spacing.sm,
// 		borderBottomWidth: 0.6,
// 		borderBottomColor: Colors.grey200,
// 	},
// 	detailLabel: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey800,
// 		marginLeft: Spacing.sm,
// 		flex: 1,
// 	},
// 	detailValue: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey700,
// 		textAlign: 'right',
// 		flex: 1,
// 	},
// 	description: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey800,
// 		lineHeight: 26,
// 	},
// 	amenitiesContainer: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 		gap: Spacing.sm,
// 	},
// 	amenityItem: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: '#f9fafb',
// 		borderRadius: 10,
// 		padding: Spacing.sm,
// 		width: '48%',
// 	},
// 	amenityText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey800,
// 		marginLeft: Spacing.sm,
// 	},
// 	noAmenitiesContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: '#f3f4f6',
// 		borderRadius: 10,
// 		padding: Spacing.md,
// 	},
// 	noAmenitiesText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.grey600,
// 		marginLeft: Spacing.sm,
// 	},
// 	videoButton: {
// 		borderRadius: 14,
// 		overflow: 'hidden',
// 	},
// 	videoButtonGradient: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		paddingVertical: Spacing.md,
// 	},
// 	videoButtonText: {
// 		fontFamily: Fonts.Bold,
// 		fontSize: TextSizes.base,
// 		color: Colors.white,
// 		marginLeft: Spacing.sm,
// 	},
// 	contactButton: {
// 		marginHorizontal: Spacing.lg,
// 		marginBottom: Spacing.xl,
// 		borderRadius: 24,
// 		overflow: 'hidden',
// 		elevation: 6,
// 		shadowColor: Colors.primary,
// 		shadowOffset: { width: 0, height: 6 },
// 		shadowOpacity: 0.2,
// 		shadowRadius: 10,
// 	},
// 	buttonGradient: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		paddingVertical: Spacing.lg,
// 	},
// 	contactButtonText: {
// 		fontFamily: Fonts.Bold,
// 		fontSize: TextSizes.base,
// 		color: Colors.white,
// 		marginLeft: Spacing.sm,
// 	},
// 	errorText: {
// 		fontFamily: Fonts.Regular,
// 		fontSize: TextSizes.sm,
// 		color: Colors.error,
// 	},
// 	modalOverlay: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		backgroundColor: 'rgba(0,0,0,0.95)',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		zIndex: 100,
// 	},
// 	modalBackdrop: {
// 		position: 'absolute',
// 		top: 40,
// 		right: 20,
// 		zIndex: 101,
// 	},
// 	fullImage: {
// 		width: width - Spacing.lg * 2,
// 		height: width - Spacing.lg * 2,
// 		borderRadius: 20,
// 	},
// 	deleteButton: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		paddingVertical: 12,
// 		paddingHorizontal: 16,
// 		marginHorizontal: Spacing.lg,
// 		marginBottom: Spacing.xl,
// 		borderRadius: 24,
// 		borderWidth: 1,
// 		borderColor: Colors.error,
// 		backgroundColor: '#ffe6e6', // soft red tint
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 4,
// 		elevation: 3, // for Android
// 	},
// 	deleteButtonText: {
// 		fontFamily: Fonts.SemiBold,
// 		fontSize: TextSizes.md,
// 		color: Colors.error,
// 		marginLeft: Spacing.sm,
// 	},
// });
