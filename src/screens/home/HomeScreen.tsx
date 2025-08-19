import React, {
	useEffect,
	useLayoutEffect,
	useState,
	useCallback,
} from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
	ScrollView,
	StatusBar,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';
import type { Property } from '../../types/Property';
import AppText from '../../components/AppTheme/AppText';

import TopNavBar from '../../components/CustomNavBars/TopNavBar';
// import Banner from '../../components/CustomNavBars/Banner';
// import Header from '../../components/CustomNavBars/Header';

import { useAuth } from '../../contexts/AuthContext';

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

const HomeScreen = ({ navigation }: any) => {
	const { user, isLoggedIn } = useAuth();
	const [token, setToken] = useState<any>(null);
	const [lastViewed, setLastViewed] = useState<any>(null);
	const { newArrivals, loading: newArrivalsLoading } = useNewArrivals();
	const { popularProperties, loading: popularPropertiesLoading } = usePopularProperties();
	const { featuredProperties, loading: featuredPropertiesLoading } = useFeaturedProperties();

	useEffect(() => {
		const fetchToken = async () => {
			const decoded = await getDecodedToken();
			setToken(decoded);
			// console.log(decoded);
		};
		fetchToken();
	}, []);

	useEffect(() => {
		(async () => {
			const property = await getLastViewedProperty();
			setLastViewed(property);
		})();
	}, []);

	const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (isLoggedIn && user) {
			// console.log('User:', user);
		}
	}, [isLoggedIn, user]);

	const handlePress = () => {
		navigation.navigate('Properties');
	};

	const toggleWishlist = async (propertyId: string) => {
		const isAlready = wishlist[propertyId];
		try {
			if (isAlready) {
				// await WishlistService.remove(propertyId);
			} else {
				// await WishlistService.add(propertyId);
			}

			setWishlist((prev) => ({
				...prev,
				[propertyId]: !isAlready,
			}));
		} catch (err) {
			Alert.alert('Error', 'Something went wrong.');
		}
	};

	const renderNewArrivalItem = ({ item }: { item: Property }) => (
		<NewArrivalsCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() =>
				navigation.navigate('AppDrawer', {
					screen: 'MainTabs',
					params: {
						screen: 'ExploreStack',
						params: {
							screen: 'PropertyDetails',
							params: {
								propertyId: item.id,
							},
						},
					},
				})
			}
		/>
	);

	const renderPopularItem = ({ item }: { item: Property }) => (
		<PopularCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() =>
				navigation.navigate('AppDrawer', {
					screen: 'MainTabs',
					params: {
						screen: 'ExploreStack',
						params: {
							screen: 'PropertyDetails',
							params: {
								propertyId: item.id,
							},
						},
					},
				})
			}
		/>
	);

	const renderFeaturedItem = ({ item }: { item: Property }) => (
		<FeaturedCard
			property={item}
			isWishlisted={wishlist[item.id]}
			onWishlistToggle={() => toggleWishlist(item.id)}
			onPress={() =>
				navigation.navigate('AppDrawer', {
					screen: 'MainTabs',
					params: {
						screen: 'ExploreStack',
						params: {
							screen: 'PropertyDetails',
							params: {
								propertyId: item.id,
							},
						},
					},
				})
			}
		/>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* Status Bar */}
			<StatusBar
				barStyle="light-content"
				backgroundColor={Colors.primary}
			/>

			{/* Top Navigation Bar */}
			<TopNavBar />

			{/* Scroll View */}
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				{/* Banner */}
				{/* <Banner /> */}
				<View style={styles.bannerContainer}>
					<View style={styles.sloganWrapper}>
						<Icons.FA
							name="quote-left"
							size={16}
							color={Colors.primary}
						/>
						<AppText weight="SemiBold" style={styles.sloganText}>
							Find Your Space. Live Your Dream.
						</AppText>
						<Icons.FA
							name="quote-right"
							size={16}
							color={Colors.primary}
						/>
					</View>
					<SearchBar />
				</View>

				<View style={styles.main}>
					{/* Last Search  lastSearch */}
					{isLoggedIn && lastViewed && (
						<ContinueLastSearchCard
							userEmail={user?.email}
							// lastSearch={lastSearch}
							onPress={() =>
								navigation.navigate('AppDrawer', {
									screen: 'MainTabs',
									params: {
										screen: 'ExploreStack',
										params: {
											screen: 'PropertyDetails',
											params: {
												propertyId: lastViewed,
											},
										},
									},
								})
								// () => navigation.navigate('PropertyDetails', { propertyId: lastViewed })
							}
						/>
					)}

					{/* New Arrivals Properties */}
					<Text style={styles.sectionTitle}>New Arrivals</Text>
					{newArrivalsLoading ? (
						<View style={styles.propertySection}>
							<FlatList
								data={[1, 2]}
								horizontal
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PropertyLoadingCard />}
								contentContainerStyle={styles.flatListContainer}
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					) : (
						<>
							{newArrivals.length > 0 && (
								<View style={styles.propertySection}>
									<FlatList
										data={newArrivals}
										horizontal
										keyExtractor={(item, index) =>
											item.id ?? `property-${index}`
										}
										renderItem={renderNewArrivalItem}
										contentContainerStyle={
											styles.flatListContainer
										}
										showsHorizontalScrollIndicator={false}
									/>
								</View>
							)}
						</>
					)}

					{/* Popular Properties */}
					<Text style={styles.sectionTitle}>Popular Properties</Text>
					{popularPropertiesLoading ? (
						<View style={styles.propertySection}>
							<FlatList
								data={[1, 2]}
								horizontal
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PropertyLoadingCard />}
								contentContainerStyle={styles.flatListContainer}
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					) : (
						<>
							{popularProperties.length > 0 && (
								<View style={styles.propertySection}>
									<FlatList
										data={popularProperties}
										horizontal
										keyExtractor={(item, index) =>
											item.id ?? `property-${index}`
										}
										renderItem={renderPopularItem}
										contentContainerStyle={
											styles.flatListContainer
										}
										showsHorizontalScrollIndicator={false}
									/>
								</View>
							)}
						</>
					)}

					{/* Featured Properties */}
					<Text style={styles.sectionTitle}>Featured Properties</Text>
					{featuredPropertiesLoading ? (
						<View style={styles.propertySection}>
							<FlatList
								data={[1, 2]}
								horizontal
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PropertyLoadingCard />}
								contentContainerStyle={styles.flatListContainer}
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					) : (
						<>
							{featuredProperties.length > 0 && (
								<View style={styles.propertySection}>
									<FlatList
										data={featuredProperties}
										horizontal
										keyExtractor={(item, index) =>
											item.id ?? `property-${index}`
										}
										renderItem={renderFeaturedItem}
										contentContainerStyle={
											styles.flatListContainer
										}
										showsHorizontalScrollIndicator={false}
									/>
								</View>
							)}
						</>
					)}

					<ExploreMorePropertiesCard
						onPress={() => {
							handlePress;
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

// const HeaderLeft: React.FC<{ onPress: () => void }> = ({ onPress }) => (
//   <TouchableOpacity onPress={onPress} style={styles.headerLeft}>
//     <Icon name="menu" size={24} color="#000" />
//   </TouchableOpacity>
// );

// const handleOpenDrawer = useCallback(() => {
//   navigation.openDrawer();
// }, [navigation]);

// const HeaderLeftComponent = useCallback(() => {
//   return <HeaderLeft onPress={handleOpenDrawer} />;
// }, [handleOpenDrawer]);

// useLayoutEffect(() => {
//   navigation.setOptions({ headerLeft: HeaderLeftComponent });
// }, [navigation, HeaderLeftComponent]);

// const [user, setUser] = useState<User | null>(null);

// const getAuthUser = useCallback(async () => {
//   const decoded = await getDecodedToken();
//   setUser(decoded);
// }, []);

// useEffect(() => {
//   getAuthUser();
// }, [getAuthUser]);
