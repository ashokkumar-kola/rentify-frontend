import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExploreStackParamList } from '../../navigation/types';
import { Property } from '../../types/Property';

import { Colors, Fonts } from '../../constants';
import Icons from '../../constants/Icons';
import LinearGradient from 'react-native-linear-gradient';

import { useFilterProperties } from '../../hooks/propertyHooks/useFilterProperties';

import PropertyLoadingCard from '../../components/PropertyCards/PropertyLoadingCard';
import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList>;
type RoutePropType = RouteProp<ExploreStackParamList, 'Properties'>;

const PropertiesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  const routeFilters = route.params?.filters || {};

  const [searchQuery, setSearchQuery] = useState('');

  const {
    filteredProperties,
    loading,
    refetch,
    updateParams,
  } = useFilterProperties({
    ...routeFilters,
    page: 1,
    limit: 20,
    sort_by: 'createdAt',
    sort_order: 'desc',
  });

  // Local search filtering for instant feedback
  const [localFilteredProperties, setLocalFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setLocalFilteredProperties(filteredProperties);
    } else {
      const filtered = filteredProperties.filter((prop) =>
        prop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location?.locality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLocalFilteredProperties(filtered);
    }
  }, [searchQuery, filteredProperties]);

  // When filters change from Filters screen → update server filters
  useEffect(() => {
    updateParams({
      ...routeFilters,
      page: 1,
      limit: 20,
    });
  }, []); // routeFilters

  const handlePrimaryAction = (property: Property) => {
    Alert.alert(
      'Contact Owner',
      `Owner Contact: ${property.ownerContact || 'N/A'}`,
      [{ text: 'OK' }]
    );
  };

  const handleSecondaryAction = (property: Property) => {
    navigation.navigate('PropertyDetails', { propertyId: property.id });
  };

  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => navigation.navigate('Filters' as never)}
          >
            <Icons.FA name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.propertiesSection}>
        {/* <Text style={styles.heading}>Properties</Text> */}

        {loading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <PropertyLoadingCard />}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={localFilteredProperties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PropertyOverviewCard
                property={{
                  ...item,
                  onPrimaryAction: () => handlePrimaryAction(item),
                  onSecondaryAction: () => handleSecondaryAction(item),
                  primaryLabel: 'Contact',
                  secondaryLabel: 'View Details',
                }}
              />
            )}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No properties found.</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: 16,
    // borderColor: Colors.primary,
    // borderWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 10,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.grey100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.black,
    marginTop: 12,
    marginBottom: 16,
    fontFamily: Fonts.Regular,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  heading: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    marginBottom: 8,
    color: Colors.black,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: Colors.grey500,
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
    marginTop: 12,
  },
  propertiesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
