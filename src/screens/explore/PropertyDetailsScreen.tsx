import React from 'react';
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
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Colors, Fonts } from '../../constants';
import images from '../../assets/images';
import { usePropertyDetails } from '../../hooks/propertyHooks/usePropertyDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'react-native-linear-gradient';

type RootStackParamList = {
  PropertyDetails: { propertyId: string };
};

const { width } = Dimensions.get('window');

const PropertyDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PropertyDetails'>>();
  const { propertyId } = route.params;

  const { property, loading } = usePropertyDetails(propertyId);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Property not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Image with gradient overlay */}
        <View style={styles.imageContainer}>
          {property.coverImage && (
            <Image
              // source={{ uri: property.coverImage }}
              source={images.defaultHome}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.gradient}
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>₹{property.price?.toLocaleString() || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.locationRow}>
            <Icon name="location-on" size={16} color={Colors.primary} />
            <Text style={styles.locationText}>
              {property.location?.locality}, {property.location?.city}
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Icon name="king-bed" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>{property.bedrooms || 'N/A'} Beds</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="bathtub" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>{property.bathrooms || 'N/A'} Baths</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="straighten" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>{property.area || 'N/A'} sqft</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {property.description || 'No description available.'}
          </Text>
        </View>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Icon name="check-circle" size={16} color={Colors.primary} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Contact Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => {
            // TODO: Open contact modal here.
            console.log('Contact owner pressed');
          }}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.blue100]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="phone" size={20} color={Colors.white} />
            <Text style={styles.contactButtonText}>Contact Owner</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  priceTag: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceTagText: {
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.grey600,
    marginLeft: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.grey200,
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.grey800,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 12,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: 15,
    color: Colors.grey800,
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2 - 30,
    marginBottom: 12,
  },
  amenityText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.grey800,
    marginLeft: 8,
  },
  contactButton: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  contactButtonText: {
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    marginLeft: 10,
  },
  errorText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.error,
  },
});