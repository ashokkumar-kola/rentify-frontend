import React, {
	useEffect,
	useLayoutEffect,
	useState,
	useCallback,
	useMemo,
} from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
	StatusBar,
	Alert,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';
import type { Property } from '../../types/Property';
import AppText from '../../components/AppTheme/AppText';

import { useAuth } from '../../contexts/AuthContext';

import TopNavBar from '../../components/CustomNavBars/TopNavBar';
import SearchBar from '../../components/Common/SearchBar';
import PropertyLoadingCard from '../../components/PropertyCards/PropertyLoadingCard';
import NewArrivalsCard from '../../components/PropertyCards/NewArrivalCard';
import PopularCard from '../../components/PropertyCards/PopularCard';
import FeaturedCard from '../../components/PropertyCards/FeaturedCard';
import ExploreMorePropertiesCard from '../../components/PropertyCards/ExploreMorePropertiesCard';
import ContinueLastSearchCard from '../../components/PropertyCards/ContinueLastSearchCard';

import { useNewArrivals } from '../../hooks/propertyHooks/useNewArrivals';
import { usePopularProperties } from '../../hooks/propertyHooks/usePopularProperties';
import { useFeaturedProperties } from '../../hooks/propertyHooks/useFeaturedProperties';

import { getDecodedToken } from '../../utils/getDecodedToken';
import { getLastViewedProperty } from '../../utils/propertyUtils/lastViewed';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Section types for our main FlatList
type SectionType = 'banner' | 'lastSearch' | 'newArrivals' | 'popular' | 'featured' | 'exploreMore';

interface Section {
	id: string;
	type: SectionType;
	data?: Property[];
	loading?: boolean;
	title?: string;
}

const HomeScreen = ({ navigation }: any) => {
	const { user, isLoggedIn } = useAuth();
	// const [token, setToken] = useState<any>(null);
	const [lastViewed, setLastViewed] = useState<any>(null);
	const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

	// Property hooks
	const { newArrivals, loading: newArrivalsLoading } = useNewArrivals();
	const { popularProperties, loading: popularPropertiesLoading } = usePopularProperties();
	const { featuredProperties, loading: featuredPropertiesLoading } = useFeaturedProperties();

	// Initialize data
	// useEffect(() => {
	// 	const fetchToken = async () => {
	// 		try {
	// 			const decoded = await getDecodedToken();
	// 			setToken(decoded);
	// 		} catch (error) {
	// 			console.error('Error fetching token:', error);
	// 		}
	// 	};
	// 	fetchToken();
	// }, []);

	useEffect(() => {
		const fetchLastViewed = async () => {
			try {
				const property = await getLastViewedProperty();
				setLastViewed(property);
			} catch (error) {
				console.error('Error fetching last viewed property:', error);
			}
		};
		fetchLastViewed();
	}, []);

	// useEffect(() => {
	// 	if (isLoggedIn && user) {
	// 		// Initialize user-specific data
	// 		console.log('User logged in:', user?.email);
	// 	} else {
	// 		console.log('User did not logged in');
	// 	}
	// }, [isLoggedIn, user]);

	// Navigation handlers
	const handlePropertiesNavigation = useCallback(() => {
		navigation.navigate('Properties');
	}, [navigation]);

	const handlePropertyPress = useCallback((propertyId: string) => {
		navigation.navigate('AppDrawer', {
			screen: 'MainTabs',
			params: {
				screen: 'ExploreStack',
				params: {
					screen: 'PropertyDetails',
					params: {
						propertyId: propertyId,
					},
				},
			},
		});
	}, [navigation]);

	const handleLastViewedPress = useCallback(() => {
		if (lastViewed) {
			handlePropertyPress(lastViewed);
		}
	}, [lastViewed, handlePropertyPress]);

	// Wishlist functionality
	const toggleWishlist = useCallback(async (propertyId: string) => {
		const isAlready = wishlist[propertyId];
		try {
			setWishlist((prev) => ({
				...prev,
				[propertyId]: !isAlready,
			}));

			if (isAlready) {
				// await WishlistService.remove(propertyId);
			} else {
				// await WishlistService.add(propertyId);
			}
		} catch (err) {
			setWishlist((prev) => ({
				...prev,
				[propertyId]: isAlready,
			}));
			Alert.alert('Error', 'Something went wrong with wishlist update.');
		}
	}, [wishlist]);

	// Memoized sections data
	const sections = useMemo((): Section[] => {
		const sectionsData: Section[] = [
			{
				id: 'banner',
				type: 'banner',
			},
		];

		// Add last search if user is logged in and has last viewed
		if (isLoggedIn && lastViewed) {
			sectionsData.push({
				id: 'lastSearch',
				type: 'lastSearch',
			});
		}

		// Add property sections
		sectionsData.push(
			{
				id: 'newArrivals',
				type: 'newArrivals',
				data: newArrivals,
				loading: newArrivalsLoading,
				title: 'New Arrivals',
			},
			{
				id: 'popular',
				type: 'popular',
				data: popularProperties,
				loading: popularPropertiesLoading,
				title: 'Popular Properties',
			},
			{
				id: 'featured',
				type: 'featured',
				data: featuredProperties,
				loading: featuredPropertiesLoading,
				title: 'Featured Properties',
			},
			{
				id: 'exploreMore',
				type: 'exploreMore',
			}
		);

		return sectionsData;
	}, [
		isLoggedIn,
		lastViewed,
		newArrivals,
		newArrivalsLoading,
		popularProperties,
		popularPropertiesLoading,
		featuredProperties,
		featuredPropertiesLoading,
	]);

	// Render functions for different property types
	const renderNewArrivalItem = useCallback(({ item }: { item: Property }) => (
		<NewArrivalsCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() => handlePropertyPress(item.id)}
		/>
	), [wishlist, toggleWishlist, handlePropertyPress]);

	const renderPopularItem = useCallback(({ item }: { item: Property }) => (
		<PopularCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() => handlePropertyPress(item.id)}
		/>
	), [wishlist, toggleWishlist, handlePropertyPress]);

	const renderFeaturedItem = useCallback(({ item }: { item: Property }) => (
		<FeaturedCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() => handlePropertyPress(item.id)}
		/>
	), [wishlist, toggleWishlist, handlePropertyPress]);

	// Loading card renderer
	const renderLoadingCard = useCallback(() => <PropertyLoadingCard />, []);

	// Property list renderer
	const renderPropertyList = useCallback((
		data: Property[],
		loading: boolean,
		renderItem: ({ item }: { item: Property }) => React.ReactElement
	) => {
		if (loading) {
			return (
				<FlatList
					data={[1, 2]}
					horizontal
					keyExtractor={(item, index) => `loading-${index}`}
					renderItem={renderLoadingCard}
					contentContainerStyle={styles.flatListContainer}
					showsHorizontalScrollIndicator={false}
					removeClippedSubviews={true}
					initialNumToRender={2}
					maxToRenderPerBatch={2}
					windowSize={3}
				/>
			);
		}

		if (!data || data.length === 0) {
			return (
				<View style={styles.emptySection}>
					<AppText style={styles.emptyText}>No properties available</AppText>
				</View>
			);
		}

		return (
			<FlatList
				data={data}
				horizontal
				keyExtractor={(item, index) => item.id ?? `property-${index}`}
				renderItem={renderItem}
				contentContainerStyle={styles.flatListContainer}
				showsHorizontalScrollIndicator={false}
				removeClippedSubviews={true}
				initialNumToRender={2}
				maxToRenderPerBatch={3}
				windowSize={5}
				getItemLayout={(data, index) => ({
					length: 280, // Approximate card width + margin
					offset: 280 * index,
					index,
				})}
			/>
		);
	}, [renderLoadingCard]);

	// Banner component
	const BannerSection = useCallback(() => (
		<View style={styles.bannerContainer}>
			<View style={styles.sloganWrapper}>
				<Icons.FA
					name="quote-left"
					size={16}
					color={Colors.white}
				/>
				<AppText weight="SemiBold" style={styles.sloganText}>
					Find Your Space. Live Your Dream.
				</AppText>
				<Icons.FA
					name="quote-right"
					size={16}
					color={Colors.white}
				/>
			</View>
			<SearchBar />
		</View>
	), []);

	// Last search component
	const LastSearchSection = useCallback(() => (
		<ContinueLastSearchCard
			userEmail={user?.email}
			onPress={handleLastViewedPress}
		/>
	), [user?.email, handleLastViewedPress]);

	// Explore more component
	const ExploreMoreSection = useCallback(() => (
		<ExploreMorePropertiesCard
			onPress={handlePropertiesNavigation}
		/>
	), [handlePropertiesNavigation]);

	// Main render item function
	const renderMainItem = useCallback(({ item }: { item: Section }) => {
		switch (item.type) {
			case 'banner':
				return <BannerSection />;

			case 'lastSearch':
				return <LastSearchSection />;

			case 'newArrivals':
				return (
					<View style={styles.propertySection}>
						<Text style={styles.sectionTitle}>{item.title}</Text>
						{renderPropertyList(item.data || [], item.loading || false, renderNewArrivalItem)}
					</View>
				);

			case 'popular':
				return (
					<View style={styles.propertySection}>
						<Text style={styles.sectionTitle}>{item.title}</Text>
						{renderPropertyList(item.data || [], item.loading || false, renderPopularItem)}
					</View>
				);

			case 'featured':
				return (
					<View style={styles.propertySection}>
						<Text style={styles.sectionTitle}>{item.title}</Text>
						{renderPropertyList(item.data || [], item.loading || false, renderFeaturedItem)}
					</View>
				);

			case 'exploreMore':
				return <ExploreMoreSection />;

			default:
				return null;
		}
	}, [
		BannerSection,
		LastSearchSection,
		renderPropertyList,
		renderNewArrivalItem,
		renderPopularItem,
		renderFeaturedItem,
		ExploreMoreSection,
	]);

	// Get item layout for main FlatList optimization
	const getMainItemLayout = useCallback((data: Section[] | null | undefined, index: number) => {
		const item = data?.[index];
		let height = 0;

		switch (item?.type) {
			case 'banner':
				height = 160; // Approximate banner height
				break;
			case 'lastSearch':
				height = 120; // Approximate last search card height
				break;
			case 'newArrivals':
			case 'popular':
			case 'featured':
				height = 300; // Section title + property cards height
				break;
			case 'exploreMore':
				height = 100; // Explore more card height
				break;
			default:
				height = 50;
		}

		return {
			length: height,
			offset: height * index,
			index,
		};
	}, []);

	// Loading state
	if (newArrivalsLoading && popularPropertiesLoading && featuredPropertiesLoading) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<StatusBar
					barStyle="light-content"
					backgroundColor={Colors.primary}
				/>
				<TopNavBar />
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={Colors.primary} />
					<AppText style={styles.loadingText}>Loading amazing properties...</AppText>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* Status Bar */}
			<StatusBar
				barStyle="light-content"
				backgroundColor={Colors.primary}
			/>

			{/* Top Navigation Bar */}
			<TopNavBar />

			{/* Main Content - Single FlatList */}
			<FlatList
				data={sections}
				keyExtractor={(item) => item.id}
				renderItem={renderMainItem}
				contentContainerStyle={styles.mainContainer}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				initialNumToRender={3}
				maxToRenderPerBatch={2}
				windowSize={10}
				getItemLayout={getMainItemLayout}
				onEndReachedThreshold={0.5}
				bounces={true}
				overScrollMode="auto"
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;
