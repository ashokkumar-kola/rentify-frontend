import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { api } from '../../api/apiClient'; // your axios instance
import PropertyCard from '../../components/PropertyCards/PropertyCard';
import { Colors } from '../../constants';

const MyPropertiesScreen = ({navigation, route}: any) => {
  console.log('MyPropertiesScreen rendered');

  const { userId } = route.params || undefined;
  console.log('User ID:', userId);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/users/${userId}/properties`);
      if (res.data.success) {
        setProperties(res.data.data);
        console.log('Fetched No. of properties:', res.data.data.length);
      } else {
        Alert.alert('Error', 'Failed to fetch your properties.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (propertyId: string) => {
    Alert.alert('Delete Property', 'Are you sure you want to delete this property?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await api.delete(`/properties/${propertyId}`);
            if (res.data.success) {
              fetchMyProperties();
            } else {
              Alert.alert('Error', res.data.message);
            }
          } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to delete property.');
          }
        },
      },
    ]);
  };

  const handleEdit = (property: any) => {
    navigation.navigate('EditProperty', { property });
  };

  const handleCreate = () => {
    navigation.navigate('AddProperty');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Properties</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
          <FontAwesome name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.propertyList}>
        {properties.length === 0 ? (
          <Text style={styles.emptyText}>You have not added any properties yet.</Text>
        ) : (
          properties.map((property) => (
            <View key={property._id} style={styles.cardContainer}>
              <PropertyCard
                title={property.title}
                location={`${property.location?.locality}, ${property.location?.city}`}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                price={property.price}
                // priceType={property.priceType}
                // tags={property.amenities.map((amenity) => ({
                //   label: amenity,
                //   color: '#3b82f6', // You can customize this based on your needs
                // }))}
                extraLabelLeft="My Property"
                extraLabelRight={property.is_verified ? 'Verified' : ''}
                onPrimaryAction={() => handleEdit(property)}
                onSecondaryAction={() => handleDelete(property._id)}
                primaryLabel="Edit"
                secondaryLabel="Delete"
                // isForRent={property.property_type === 'rent'}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyPropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  propertyList: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 50,
    fontSize: 16,
  },
});
