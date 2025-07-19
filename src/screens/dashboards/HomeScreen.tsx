import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { DrawerParamList } from '../../navigation/DrawerNavigator';
import { Colors } from '../../constants';
import type { Property } from '../../types/Property';

import ScreenTemplate from '../../components/Common/ScreenTemplate';
import Banner from '../../components/CustomNavBars/Banner';
import Header from '../../components/CustomNavBars/Header';

import PropertyLoadingCard from '../../components/PropertyCards/PropertyLoadingCard';
import NewArrivalsCard from '../../components/PropertyCards/NewArrivalCard';
import PopularCard from '../../components/PropertyCards/PopularCard';
import FeaturedPropertyCard from '../../components/PropertyCards/FeaturedPropertyCard';
import ExploreMoreCard from '../../components/PropertyCards/ExploreMoreCard';


import { useNewArrivals } from '../../hooks/propertyHooks/useNewArrivals';
import { usePopularProperties } from '../../hooks/propertyHooks/usePopularProperties';
import { useFeaturedProperties } from '../../hooks/propertyHooks/useFeaturedProperties';

// import api from '../../api/apiClient';
import { decodeJwt } from '../../utils/jwt';

type User = {
  _id: string;
  full_name: string;
  email: string;
  token: string;
};

const HeaderLeft: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerLeft}>
    <Icon name="menu" size={24} color="#000" />
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [user, setUser] = useState<User | null>(null);

  const { newArrivals, loading: newArrivalsLoading } = useNewArrivals();
  const { popularProperties, loading: popularPropertiesLoading } = usePopularProperties();
  const { featuredProperties, loading: featuredPropertiesLoading } = useFeaturedProperties();

  const handleOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const HeaderLeftComponent = useCallback(() => {
    return <HeaderLeft onPress={handleOpenDrawer} />;
  }, [handleOpenDrawer]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: HeaderLeftComponent });
  }, [navigation, HeaderLeftComponent]);

  const getAuthUser = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken');
      console.log('User Token: ', userToken);
      if (userToken) {
        // const parsed: User = JSON.parse(userToken);
        const decoded = decodeJwt(userToken);
        setUser(decoded);
        console.log(user);
      }
    } catch (err) {
      console.error('Error fetching user from AsyncStorage:', err);
    }
  }, []); // user

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  const renderNewArrivalItem = ({ item }: { item: Property }) => (
    <NewArrivalsCard property={item} />
  );

  const renderPopularItem = ({ item }: { item: Property }) => (
    <PopularCard property={item} />
  );

  const renderFeaturedItem = ({ item }: { item: Property }) => (
    <FeaturedPropertyCard property={item} />
  );

  return (

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* <Banner /> */}
        <Header />

        <View style={styles.main}>
        {user && (
          <Text style={styles.greetingText}>Welcome, {user.email} 👋</Text>
        )}

        {/* New Arrivals Properties */}
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        {newArrivalsLoading ? (
          <View style={styles.propertySection}>
            <FlatList
              data={[1, 2, 3, 4]}
              horizontal
              keyExtractor={(item) => item.toString()}
              renderItem={() => <PropertyLoadingCard />}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <>
            {newArrivals.length > 0 && (
              <View style={styles.propertySection}>
                <FlatList
                  data={newArrivals}
                  horizontal
                  keyExtractor={(item) => item._id}
                  renderItem={renderNewArrivalItem}
                  contentContainerStyle={styles.flatListContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}

        {/* Popular Properties */}
        <Text style={styles.sectionTitle}>Popular Properties</Text>
        {popularPropertiesLoading ? (
          <View style={styles.propertySection}>
            <FlatList
              data={[1, 2, 3, 4]}
              horizontal
              keyExtractor={(item) => item.toString()}
              renderItem={() => <PropertyLoadingCard />}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <>
            {popularProperties.length > 0 && (
              <View style={styles.propertySection}>
                <FlatList
                  data={popularProperties}
                  horizontal
                  keyExtractor={(item) => item._id}
                  renderItem={renderPopularItem}
                  contentContainerStyle={styles.flatListContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}

        {/* Featured Properties */}
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {featuredPropertiesLoading ? (
          <View style={styles.propertySection}>
            <FlatList
              data={[1, 2, 3, 4]}
              horizontal
              keyExtractor={(item) => item.toString()}
              renderItem={() => <PropertyLoadingCard />}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <>
            {featuredProperties.length > 0 && (
              <View style={styles.propertySection}>
                <FlatList
                  data={featuredProperties}
                  horizontal
                  keyExtractor={(item) => item._id}
                  renderItem={renderFeaturedItem}
                  contentContainerStyle={styles.flatListContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}

        <ExploreMoreCard />
        </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  headerLeft: {
    marginLeft: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  propertySection: {
    marginBottom: 20,
  },
  flatListContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  loadingIndicator: {
    marginTop: 40,
  },
});

export default HomeScreen;
