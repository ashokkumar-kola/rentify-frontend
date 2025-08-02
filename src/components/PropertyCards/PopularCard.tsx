import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

import AppText from '../Common/AppText';

import type { Location, Property } from '../../types/Property';

import images from '../../assets/images';
import { Colors, Fonts } from '../../constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { formatLocation } from '../../utils/propertyUtils/formatLocation';

const screenWidth = Dimensions.get('window').width;

type Props = {
    property: Property;
};


const PropertyCard: React.FC<Props> = ({property}) => {
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
      <View style={styles.popularTag}>
        <AppText style={styles.popularText}>POPULAR</AppText>
      </View>
      <View style={styles.imageContainer}>
        <Image source={images.defaultHome} style={styles.propertyImage} resizeMode="contain" />
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleLocation}>
            <Text style={styles.title}>{title}</Text>
            <AppText style={styles.location}>
              <MaterialIcons name="location-on" size={12} color={Colors.primary} /> {location.locality + location.city}
            </AppText>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{price.toLocaleString()}</Text>
            <Text style={styles.deposit}>
              {/* <MaterialIcons name="lock" size={12} color={Colors.success} /> */}
              ₹{deposit.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <MaterialIcons name="king-bed" size={18} color={Colors.primary} />
            <Text style={styles.infoText}>{bedrooms} BHK</Text>
          </View>

          <View style={styles.infoBox}>
            <MaterialIcons name="square-foot" size={18} color={Colors.primary} />
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
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignSelf: 'center',
  },
  popularTag: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    // borderTopRightRadius: 8,
    borderBottomRightRadius: 16,
    // flex: 0,
  },
  popularText: {
    color: Colors.white,
    fontSize: 12,
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
    // fontWeight: '700',
    marginBottom: 2,
    color: Colors.black,
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
  // divider: {
  //   height: 1,
  //   backgroundColor: Colors.grey200,
  //   marginVertical: 10,
  // },
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
    // marginTop: 4,
    color: Colors.black,
  },
});

export default PropertyCard;
