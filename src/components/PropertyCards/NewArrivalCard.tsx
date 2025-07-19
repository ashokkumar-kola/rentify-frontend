import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Fonts } from '../../constants';
import images from '../../assets/images';

import type { Location, Property } from '../../types/Property';

import AppText from '../Common/AppText';

const screenWidth = Dimensions.get('window').width;

type Props = {
  property: Property;
};

const NewArrivalCard: React.FC<Props> = ({ property }) => {
  const {
    title,
    location,
    price,
    deposit,
    bedrooms,
    bathrooms,
    area,
  } = property as Property & { location: Location };

  return (
    <View style={styles.card}>
      <View style={styles.ribbon}>
        <Text style={styles.ribbonText}>New</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={images.defaultHome}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Text>
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
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <MaterialIcons name="king-bed" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{bedrooms} BHK</Text>
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="bathtub" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{bathrooms} Baths</Text>
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="square-foot" size={16} color={Colors.primary} />
            <Text style={styles.infoText}>{area} sqft</Text>
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
    marginHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignSelf: 'center',
  },
  ribbon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.warning,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    zIndex: 20,
  },
  ribbonText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.Medium,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
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
    backgroundColor: '#00000070',
    borderRadius: 18,
    padding: 6,
  },
  content: {
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
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
    color: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: Colors.blue50,
    paddingVertical: 6,
    borderRadius: 10,
    width: '31%',
  },
  infoText: {
    fontFamily: Fonts.Regular,
    fontSize: 10,
    color: Colors.black,
  },
});

export default NewArrivalCard;
