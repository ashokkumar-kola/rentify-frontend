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
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useFilterProperties } from '../../hooks/propertyHooks/useFilterProperties';
// import { useFetchAllProperties } from '../../hooks/propertyHooks/useFetchAllProperties';
import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';

// import styles from '../auth/styles';
import { Colors, Fonts, Spacing, TextSizes } from '../../constants';

import PropertySkeletonCard from '../../components/PropertyCards/PropertySkeletonCard';
import ErrorMessage from '../../components/Common/ErrorMessage';
import ReloadView from '../../components/Common/ReloadView';
import EmptyListView from '../../components/PropertyCards/EmptyListView';
import ContactModal from '../../components/PropertyCards/ContactModal';

// import SearchBar from '../../components/Common/SearchBar';

import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../constants/Icons';

type Property = {
	id: string;
	title: string;
	location?: {
		locality?: string;
		city?: string;
	};
};

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

	// const handleContact = (id: string) => {
	// 	Alert.alert('Property Contact Info:', id, );
	// };
	const handleContact = (landlord: any) => {
		setSelectedLandlord(landlord);
		setVisible(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000);

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
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.location?.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setDisplayedProperties(filtered);
		}
	}, [searchQuery, properties]);

  return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.searchContainer}>
				<TextInput
					placeholder="Search properties..."
					placeholderTextColor={Colors.grey500}
					style={styles.searchInput}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<LinearGradient
					colors={[Colors.blue100, Colors.blue300]}
					style={styles.filterButton}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate('Filters')}
					>
						<Icons.FA name="sliders" size={16} color={Colors.white} />
					</TouchableOpacity>
				</LinearGradient>
			</View>

			{/* Properties */}
				<View style={styles.propertiesContainer}>
				{tempLoading ? (
					<FlatList
						key="loading-grid"
						data={loadingItems}
						keyExtractor={(_, index) => index.toString()}
						// numColumns={2}
						// columnWrapperStyle={{
						// 	justifyContent: 'space-between',
						// 	paddingHorizontal: 16,
						// }}
						renderItem={() => (
							<PropertySkeletonCard
								width={300}
								height={320}
								imageHeight={150}
								shimmer={true}
								textLines={3}
								textWidths={[0.9, 0.8, 0.7]}
								marginRight={8}
							/>
						)}
						showsVerticalScrollIndicator={false}
					/>
				) : error ? (
					<View style={styles.errorContainer}>
					<ErrorMessage message="Failed to load properties." />
					<ReloadView message="Failed to load data" onReload={refetch} />
					</View>
				) : (
					<FlatList
						key="properties-list" // Different key from loading state
						data={displayedProperties}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<PropertyOverviewCard
								property={{
									...item,
									onPrimaryAction: () => handleContact(item.landlord_id),
									onSecondaryAction: () => handleDetails(item.id),
									primaryLabel: 'Edit',
									secondaryLabel: 'View Details',
								}}
							/>
						)}
						contentContainerStyle={styles.listContent}
						ListEmptyComponent={
							<EmptyListView message="No properties found." />
						}
						showsVerticalScrollIndicator={false}
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
		backgroundColor: Colors.white150,
		paddingBottom: 40,
	},
	activityIndicator: {
		marginTop: 20,
	},
	errorContainer: {
		// flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	propertiesContainer: {
		marginHorizontal: 16,
		alignItems: 'center',
		backgroundColor: Colors.white150,
	},
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 16,
		marginVertical: 8,
	},
	searchInput: {
		flex: 1,
		color: Colors.black,
		backgroundColor: Colors.grey100,
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 8,
		fontSize: TextSizes.md,
		fontFamily: Fonts.Regular,
		borderWidth: 1.5,
		borderColor: Colors.primary,
		marginRight: 8,
	},
	listContent: {
		paddingBottom: Spacing.base,
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 40,
		fontSize: 14,
		color: Colors.grey500,
		fontFamily: Fonts.Regular,
	},
	errorText: {
		textAlign: 'center',
		marginTop: 40,
		fontSize: 14,
		color: Colors.error,
		fontFamily: Fonts.Regular,
	},
	filterButton: {
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},
});




// 	useEffect(() => {
// 		setFilteredProperties(properties);
// 	}, [properties]);

// 	useEffect(() => {
// 		if (searchQuery.trim() === '') {
// 			setFilteredProperties(properties);
// 		} else {
// 			const filtered = properties.filter(
// 				(prop) =>
// 					prop.title
// 						.toLowerCase()
// 						.includes(searchQuery.toLowerCase()) ||
// 					prop.location?.locality
// 						.toLowerCase()
// 						.includes(searchQuery.toLowerCase()) ||
// 					prop.location?.city
// 						.toLowerCase()
// 						.includes(searchQuery.toLowerCase())
// 			);
// 			setFilteredProperties(filtered);
// 		}
// 	}, [searchQuery, properties]);

// 	return (
// 		<SafeAreaView style={styles.safeArea}>

// 			<View style={styles.searchContainer}>
// 				<TextInput
// 					placeholder="Search properties..."
// 					placeholderTextColor={Colors.grey500}
// 					style={styles.searchInput}
// 					value={searchQuery}
// 					onChangeText={setSearchQuery}
// 				/>
// 				<LinearGradient
// 					colors={[Colors.blue100, Colors.blue300]}
// 					style={styles.filterButton}
// 					start={{ x: 0, y: 0 }}
// 					end={{ x: 1, y: 1 }}
// 				>
// 					<TouchableOpacity
// 						onPress={() => navigation.navigate('Filters')}
// 					>
// 						<Icons.FA name="sliders" size={16} color={Colors.white} />
// 					</TouchableOpacity>
// 				</LinearGradient>
// 			</View>

// 		</SafeAreaView>
// 	);
// };

// export default PropertiesScreen;

// const styles = StyleSheet.create({

// });

