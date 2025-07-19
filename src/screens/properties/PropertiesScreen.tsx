import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import { Colors, Fonts } from '../../constants';
import { useFetchAllProperties } from '../../services/PropertyServices';
import PropertyCard from '../../components/PropertyCards/PropertyOverviewCard';

const PropertiesScreen: React.FC = () => {
  const { properties, loading, error, refetch } = useFetchAllProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter((prop) =>
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location?.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location?.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  }, [searchQuery, properties]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search properties..."
        placeholderTextColor={Colors.grey500}
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load properties.</Text>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PropertyCard property={item} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No properties found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default PropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: Colors.grey100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.black,
    marginTop: 12,
    marginBottom: 8,
    fontFamily: Fonts.Regular,
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
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: Colors.error,
    fontFamily: Fonts.Regular,
  },
});
