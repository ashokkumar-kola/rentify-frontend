/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	ActivityIndicator,
	Alert,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useFilterProperties } from '../../hooks/propertyHooks/useFilterProperties';
import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';

import { Colors, Fonts, Spacing, TextSizes } from '../../constants';

import PropertySkeletonCard from '../../components/PropertyCards/PropertySkeletonCard';
import ErrorMessage from '../../components/Common/ErrorMessage';
import ReloadView from '../../components/Common/ReloadView';
import EmptyListView from '../../components/PropertyCards/EmptyListView';
import ContactModal from '../../components/PropertyCards/ContactModal';

import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../constants/Icons';

const { width } = Dimensions.get('window');

import { Property } from '../../types/Property';

// Quick Stats Component
const QuickStatsCard = ({ icon, title, value, color }) => (
	<View style={[styles.statsCard, { borderLeftColor: color }]}>
		<View style={styles.statsIcon}>
			<Icons.FA name={icon} size={20} color={color} />
		</View>
		<View style={styles.statsContent}>
			<Text style={styles.statsValue}>{value}</Text>
			<Text style={styles.statsTitle}>{title}</Text>
		</View>
	</View>
);

// Featured Section Component
const FeaturedSection = ({ onViewAll }) => (
	<View style={styles.sectionContainer}>
		<View style={styles.sectionHeader}>
			<View>
				<Text style={styles.sectionTitle}>Featured Properties</Text>
				<Text style={styles.sectionSubtitle}>Handpicked for you</Text>
			</View>
			<TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
				<Text style={styles.viewAllText}>View All</Text>
				<Icons.FA name="arrow-right" size={12} color={Colors.primary} />
			</TouchableOpacity>
		</View>
		<LinearGradient
			colors={[Colors.primary + '20', Colors.primary + '05']}
			style={styles.featuredBanner}
		>
			<Icons.FA name="star" size={24} color={Colors.primary} />
			<Text style={styles.featuredText}>Premium listings with verified landlords</Text>
		</LinearGradient>
	</View>
);

// Properties Section Header
const PropertiesSectionHeader = ({ count, searchQuery }) => (
	<View style={styles.sectionContainer}>
		<View style={styles.sectionHeader}>
			<View>
				<Text style={styles.sectionTitle}>
					{searchQuery ? 'Search Results' : 'All Properties'}
				</Text>
				<Text style={styles.sectionSubtitle}>
					{count} {count === 1 ? 'property' : 'properties'} found
				</Text>
			</View>
		</View>
	</View>
);

// Mid-section Promotional Banner
const PromotionalBanner = () => (
	<LinearGradient
		colors={[Colors.blue100, Colors.blue300]}
		style={styles.promoBanner}
		start={{ x: 0, y: 0 }}
		end={{ x: 1, y: 1 }}
	>
		<View style={styles.promoContent}>
			<Icons.FA name="bullhorn" size={24} color={Colors.white} />
			<View style={styles.promoText}>
				<Text style={styles.promoTitle}>List Your Property</Text>
				<Text style={styles.promoSubtitle}>Reach thousands of verified tenants</Text>
			</View>
		</View>
		<TouchableOpacity style={styles.promoButton}>
			<Text style={styles.promoButtonText}>Get Started</Text>
		</TouchableOpacity>
	</LinearGradient>
);

const PropertiesScreen: React.FC = ({ navigation, route }: any) => {
	const { properties, loading, error, refetch } = useFilterProperties();
	const [searchQuery, setSearchQuery] = useState('');
	const [displayedProperties, setDisplayedProperties] = useState([]);

	const loadingItems = Array.from({ length: 3 });

	const [tempLoading, setLoading] = React.useState(true);
	const [visible, setVisible] = useState(false);
	const [selectedLandlord, setSelectedLandlord] = useState<any>(null);

	const handleDetails = (id: string) => {
		navigation.navigate('PropertyDetails', { propertyId: id });
	};

	const handleContact = (landlord: any) => {
		setSelectedLandlord(landlord);
		setVisible(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		setDisplayedProperties(properties);
	}, [properties]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setDisplayedProperties(properties);
		} else {
			const filtered = properties.filter(
				(p) =>
				p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
				p.location?.locality?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
				p.location?.city?.toLowerCase().includes(searchQuery.toLowerCase().trim())
			);
			setDisplayedProperties(filtered);
		}
	}, [searchQuery, properties]);

	// Enhanced renderItem with middle sections
	const renderItem = ({ item, index }) => {
		const isMiddle = index === Math.floor(displayedProperties.length / 2);
		const showPromo = index > 0 && index % 6 === 0; // Show promo every 6 items

		return (
			<>
				{showPromo && <PromotionalBanner />}
				<PropertyOverviewCard
					property={{
						...item,
						onPrimaryAction: () => handleContact(item.landlord_id),
						onSecondaryAction: () => handleDetails(item.id),
						primaryLabel: 'Edit',
						secondaryLabel: 'View Details',
					}}
				/>
			</>
		);
	};

	const ListHeaderComponent = () => (
		<>
			{/* Quick Stats */}
			<View style={styles.statsContainer}>
				<QuickStatsCard
					icon="home"
					title="Available"
					value={properties.length}
					color={Colors.success}
				/>
				<QuickStatsCard
					icon="map-marker"
					title="Locations"
					value={new Set(properties.map(p => p.location?.city)).size}
					color={Colors.primary}
				/>
			</View>

			{/* Featured Section */}
			<FeaturedSection onViewAll={() => navigation.navigate('FeaturedProperties')} />

			{/* Properties Section Header */}
			<PropertiesSectionHeader
				count={displayedProperties.length}
				searchQuery={searchQuery}
			/>
		</>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* Enhanced Search Header */}
			<LinearGradient
				colors={[Colors.primary + '10', Colors.white]}
				style={styles.headerGradient}
			>
				<View style={styles.searchContainer}>
					<View style={styles.searchInputContainer}>
						<Icons.FA name="search" size={16} color={Colors.primary} style={styles.searchIcon} />
						<TextInput
							placeholder="Search by name, location..."
							placeholderTextColor={Colors.grey500}
							style={styles.searchInput}
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
						{searchQuery.length > 0 && (
							<TouchableOpacity
								onPress={() => setSearchQuery('')}
								style={styles.clearButton}
							>
								<Icons.FA name="times" size={14} color={Colors.grey500} />
							</TouchableOpacity>
						)}
					</View>
					<LinearGradient
						colors={[Colors.primary, Colors.blue300]}
						style={styles.filterButton}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate('Filters')}
							style={styles.filterButtonInner}
						>
							<Icons.FA name="sliders" size={20} color={Colors.white} />
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</LinearGradient>

			{/* Properties Content */}
			<View style={styles.propertiesContainer}>
				{tempLoading ? (
					<FlatList
						key="loading-grid"
						data={loadingItems}
						keyExtractor={(_, index) => index.toString()}
						renderItem={() => (
							<PropertySkeletonCard
								width={width - 32}
								height={320}
								imageHeight={150}
								shimmer={true}
								textLines={3}
								textWidths={[0.9, 0.8, 0.7]}
								marginRight={8}
							/>
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.listContent}
					/>
				) : error ? (
					<ScrollView contentContainerStyle={styles.errorContainer}>
						<ErrorMessage message="Failed to load properties." />
						<ReloadView message="Failed to load data" onReload={refetch} />
					</ScrollView>
				) : (
					<FlatList
						key="properties-list"
						data={displayedProperties}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						contentContainerStyle={styles.listContent}
						// ListHeaderComponent={ListHeaderComponent}
						ListEmptyComponent={
							<EmptyListView message="No properties found matching your search." />
						}
						showsVerticalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
					/>
				)}
			</View>

			<ContactModal
				visible={visible}
				landlord={selectedLandlord}
				onClose={() => setVisible(false)}
			/>
		</SafeAreaView>
	);
};

export default PropertiesScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	headerGradient: {
		paddingBottom: 16,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		marginTop: 8,
		gap: 12,
	},
	searchInputContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		borderRadius: 12,
		paddingHorizontal: 16,
		// paddingVertical: 8,
		borderWidth: 1.5,
		borderColor: Colors.primary,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	searchIcon: {
		marginRight: 12,
	},
	searchInput: {
		flex: 1,
		color: Colors.black,
		fontSize: TextSizes.md,
		fontFamily: Fonts.Regular,
	},
	clearButton: {
		padding: 4,
	},
	filterButton: {
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
	},
	filterButtonInner: {
		paddingVertical: 12,
		paddingHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	propertiesContainer: {
		flex: 1,
		backgroundColor: Colors.grey50,
	},
	listContent: {
		marginLeft: 16,
		paddingBottom: 100,
	},
	separator: {
		height: 16,
	},

	// Stats Components
	statsContainer: {
		flexDirection: 'row',
		marginHorizontal: 16,
		marginVertical: 16,
		gap: 12,
	},
	statsCard: {
		flex: 1,
		backgroundColor: Colors.white,
		borderRadius: 12,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		borderLeftWidth: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	statsIcon: {
		marginRight: 12,
	},
	statsContent: {
		flex: 1,
	},
	statsValue: {
		fontSize: 20,
		fontFamily: Fonts.Bold,
		color: Colors.black,
	},
	statsTitle: {
		fontSize: 12,
		fontFamily: Fonts.Regular,
		color: Colors.grey600,
		marginTop: 2,
	},

	// Section Components
	sectionContainer: {
		marginHorizontal: 16,
		marginVertical: 8,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: TextSizes.lg,
		fontFamily: Fonts.Bold,
		color: Colors.black,
	},
	sectionSubtitle: {
		fontSize: TextSizes.sm,
		fontFamily: Fonts.Regular,
		color: Colors.grey600,
		marginTop: 2,
	},
	viewAllButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	viewAllText: {
		fontSize: TextSizes.sm,
		fontFamily: Fonts.SemiBold,
		color: Colors.primary,
	},

	// Featured Section
	featuredBanner: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary + '10',
		borderRadius: 12,
		padding: 16,
		gap: 12,
	},
	featuredText: {
		flex: 1,
		fontSize: TextSizes.md,
		fontFamily: Fonts.Medium,
		color: Colors.primary,
	},

	// Promotional Banner
	promoBanner: {
		marginHorizontal: 16,
		marginVertical: 12,
		borderRadius: 16,
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
	},
	promoContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: 16,
	},
	promoText: {
		flex: 1,
	},
	promoTitle: {
		fontSize: TextSizes.lg,
		fontFamily: Fonts.Bold,
		color: Colors.white,
	},
	promoSubtitle: {
		fontSize: TextSizes.sm,
		fontFamily: Fonts.Regular,
		color: Colors.white + 'CC',
		marginTop: 2,
	},
	promoButton: {
		backgroundColor: Colors.white,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	promoButtonText: {
		fontSize: TextSizes.sm,
		fontFamily: Fonts.SemiBold,
		color: Colors.primary,
	},

	// Error States
	errorContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
});
