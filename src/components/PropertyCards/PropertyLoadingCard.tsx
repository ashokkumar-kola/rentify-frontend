// components/PropertyCards/PropertyLoadingCard.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';

const PropertyLoadingCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholder} />
      <View style={[styles.textPlaceholder, { width: '50%' }]} />
    </View>
  );
};

export default PropertyLoadingCard;

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 250,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginRight: 16,
    padding: 12,
    justifyContent: 'flex-start',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  textPlaceholder: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
});
