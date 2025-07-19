import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import AppText from '../Common/AppText';

import type { Location, Property } from '../../types/Property';

import images from '../../assets/images';
import { Colors, Fonts } from '../../constants';

import { Ionicons, MaterialIcons } from '../../utils/imports';

const screenWidth = Dimensions.get('window').width;

type Props = {
  property: Property;
};

const FeaturedPropertyCard: React.FC<Props> = ({ property }) => {
  const {
    title,
    location,
    price,
    deposit,
    property_type,
    bedrooms,
    bathrooms,
    area,
    images: propertyImages,
  } = property as Property & { location: Location };

  return (
    <View style={styles.card}>
      {/* Featured Ribbon */}
      <View style={styles.featuredRibbon}>
        <AppText style={styles.featuredText}>FEATURED</AppText>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={images.defaultHome}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleLocation}>
            <Text style={styles.title}>{title}</Text>
            <AppText style={styles.location}>
              <MaterialIcons
                name="location-on"
                size={12}
                color={Colors.primary}
              />{' '}
              {location.locality + ', ' + location.city}
            </AppText>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{price.toLocaleString()}</Text>
            <Text style={styles.deposit}>
              {/* <MaterialIcons
                name="lock"
                size={12}
                color={Colors.success}
              /> */}
              ₹{deposit.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <MaterialIcons name="king-bed" size={18} color={Colors.primary} />
            <Text style={styles.infoText}>{bedrooms} BHK</Text>
          </View>

          <View style={styles.infoBox}>
            <MaterialIcons
              name="square-foot"
              size={18}
              color={Colors.primary}
            />
            <Text style={styles.infoText}>{area} sqft</Text>
          </View>

          <View style={styles.infoBox}>
            <MaterialIcons name="bathtub" size={18} color={Colors.primary} />
            <Text style={styles.infoText}>{bathrooms} Baths</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.725,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignSelf: 'center',
  },
  featuredRibbon: {
    position: 'absolute',
    top: 12,
    left: -40,
    backgroundColor: Colors.success,
    width: 140,
    paddingVertical: 4,
    transform: [{ rotate: '-45deg' }],
    zIndex: 10,
    alignItems: 'center',
  },
  featuredText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.Medium,
    letterSpacing: 1,
  },
  imageContainer: {
    height: 160,
    backgroundColor: Colors.grey100,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00000080',
    borderRadius: 20,
    padding: 6,
  },
  content: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleLocation: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    color: Colors.black,
    marginBottom: 2,
  },
  location: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: Colors.grey600,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  deposit: {
    fontFamily: Fonts.Regular,
    fontSize: 10,
    color: Colors.grey600,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: Colors.blue50,
    paddingVertical: 8,
    borderRadius: 10,
    width: '31%',
  },
  infoText: {
    fontFamily: Fonts.Regular,
    fontSize: 10,
    color: Colors.black,
  },
});

export default FeaturedPropertyCard;
