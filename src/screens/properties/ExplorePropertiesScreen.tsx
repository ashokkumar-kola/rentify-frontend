import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants';
import images from '../../assets/images';

import PropertyCard from '../../components/PropertyCards/PopularCard';

const FilteredProperties = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { properties } = route.params;

  useEffect(() => {
    if (properties) {
      setFilteredData(properties);
    }
  }, [properties]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(properties);
    } else {
      const filtered = properties.filter(property => 
        property.title.toLowerCase().includes(text.toLowerCase()) ||
        property.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const navigateToFilters = () => {
    navigation.navigate('Filters');
  };

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetails', { property: item })}
    >
      <Image 
        // source={{ uri: item.images && item.images.length > 0 ? item.images[0] : undefined }}
        source={images.defaultHome}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cardPrice}>${item.price}/mo</Text>
        </View>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFeatures}>
          <View style={styles.feature}>
            <Ionicons name="bed" size={16} color={Colors.primary} />
            <Text style={styles.featureText}>{item.bedrooms}</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="water" size={16} color={Colors.primary} />
            <Text style={styles.featureText}>{item.bathrooms} Bath</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="resize" size={16} color={Colors.primary} />
            <Text style={styles.featureText}>{item.area} sqft</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardType}>{item.property_type}</Text>
          <Text style={styles.cardStatus}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties..."
            placeholderTextColor={Colors.grey}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={navigateToFilters}
        >
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Property List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="home" size={50} color={Colors.grey200} />
              <Text style={styles.emptyText}>No properties found</Text>
              <Text style={styles.emptySubText}>Try adjusting your filters</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey200,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.grey900,
  },
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grey900,
    flex: 1,
    marginRight: 10,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.grey700,
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: Colors.grey900,
    marginLeft: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.grey200,
    paddingTop: 12,
  },
  cardType: {
    fontSize: 14,
    color: Colors.grey700,
    textTransform: 'capitalize',
  },
  cardStatus: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grey900,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.grey100,
    marginTop: 4,
  },
});

export default FilteredProperties;
