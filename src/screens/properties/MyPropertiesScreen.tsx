import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import PropertyOverviewCard from '../../components/PropertyCards/PropertyOverviewCard';
import useMyProperties from '../../hooks/userHooks/useMyProperties';
import { Colors } from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyPropertiesScreen: React.FC = ({ navigation }: any) => {
  const { properties, loading, error, refresh } = useMyProperties();

  console.log(properties);

  const handleCreateProperty = () => {
    navigation.navigate('AddProperty'); // Adjust to your route name
  };

  const handleEdit = (id: string) => {
    navigation.navigate('EditProperty', { propertyId: id });
  };

  const handleDetails = (id: string) => {
    navigation.navigate('PropertyDetails', { propertyId: id });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.countText}>
          You have {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </Text>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateProperty}>
          <FontAwesome name="plus" size={16} color="#fff" />
          <Text style={styles.createButtonText}>Add Property</Text>
        </TouchableOpacity>
      </View>

      {/* No properties */}
      {properties.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>You haven't added any properties yet.</Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateProperty}>
            <FontAwesome name="plus" size={16} color="#fff" />
            <Text style={styles.createButtonText}>Create Your First Property</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PropertyOverviewCard
              property={{
                ...item,
                onPrimaryAction: () => handleEdit(item._id),
                onSecondaryAction: () => handleDetails(item._id),
                primaryLabel: 'Edit',
                secondaryLabel: 'View Details',
              }}
            />
          )}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={refresh}
        />
      )}
    </View>
  );
};

export default MyPropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
});
