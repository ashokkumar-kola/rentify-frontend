import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  imageList: (string | number)[];
};

const PropertyImageSlider: React.FC<Props> = ({ imageList }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const isDefault = imageList.length === 1 && typeof imageList[0] !== 'string';

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal={!isDefault}
        pagingEnabled={!isDefault}
        scrollEnabled={!isDefault}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={!isDefault ? handleScroll : undefined}
        nestedScrollEnabled={true}
        contentContainerStyle={isDefault ? styles.centerImageWrapper : undefined}
      >
        {imageList.map((img, index) => (
          <Image
            key={index}
            source={typeof img === 'string' ? { uri: img } : img}
            style={styles.image}
            resizeMode={isDefault ? 'contain' : 'cover'}
          />
        ))}
      </ScrollView>

      {!isDefault && (
        <View style={styles.dotsContainer}>
          {imageList.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default PropertyImageSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 180,
  },
  centerImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
  },
});
