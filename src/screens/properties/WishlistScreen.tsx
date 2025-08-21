/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppText from '../../components/AppTheme/AppText';
import { Colors, Fonts, Spacing, TextSizes } from '../../constants';
import Icons from '../../constants/Icons';
import { useAuth } from '../../contexts/AuthContext';

interface Property {
  _id: string;
  title: string;
  coverImage: string;
  price: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

const WishlistScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, isLoggedIn } = useAuth();
  const [wishlist, setWishlist] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const storedWishlist = await AsyncStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchWishlist();
    setRefreshing(false);
  }, [fetchWishlist]);

  // Fetch wishlist when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        fetchWishlist();
      } else {
        setLoading(false);
      }
    }, [isLoggedIn, fetchWishlist])
  );

  const handleLogin = () => {
    navigation.navigate('AuthStack', { screen : 'Login' as never });
  };

  const handleExplore = () => {
    navigation.navigate('Properties' as never);
  };

  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const removeFromWishlist = async (propertyId: string) => {
    try {
      const updatedWishlist = wishlist.filter(item => item._id !== propertyId);
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      // TODO: Also remove from backend
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Login Required State
  const LoginRequiredView = () => (
    <View style={styles.centerContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.iconContainer}>
          <Icons.MI name="favorite-border" size={48} color={Colors.primary} />
        </View>

        <AppText weight="Bold" style={styles.emptyTitle}>
          Your Wishlist Awaits
        </AppText>

        <AppText style={styles.emptyDescription}>
          Log in to save your favorite properties and access them anytime, anywhere
        </AppText>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Icons.MI name="login" size={20} color={Colors.white} />
          <AppText weight="SemiBold" style={styles.primaryButtonText}>
            Log In
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleExplore}
          activeOpacity={0.8}
        >
          <AppText weight="Medium" style={styles.secondaryButtonText}>
            Browse Properties
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Loading State
  const LoadingView = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <AppText style={styles.loadingText}>Loading your wishlist...</AppText>
    </View>
  );

  // Empty Wishlist State
  const EmptyWishlistView = () => (
    <View style={styles.centerContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.iconContainer}>
          <Icons.MI name="favorite-border" size={48} color={Colors.grey400} />
        </View>

        <AppText weight="Bold" style={styles.emptyTitle}>
          No Favorites Yet
        </AppText>

        <AppText style={styles.emptyDescription}>
          Start exploring amazing properties and add them to your wishlist to keep track of your favorites
        </AppText>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleExplore}
          activeOpacity={0.8}
        >
          <Icons.MI name="search" size={20} color={Colors.white} />
          <AppText weight="SemiBold" style={styles.primaryButtonText}>
            Explore Properties
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Filter' as never)}
          activeOpacity={0.8}
        >
          <AppText weight="Medium" style={styles.secondaryButtonText}>
            Set Search Preferences
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Header Component
  const Header = () => (
    <View style={styles.headerContainer}>
      <View>
        <AppText weight="Bold" style={styles.headerTitle}>
          My Wishlist
        </AppText>
        <AppText style={styles.headerSubtitle}>
          You have{' '}
          <AppText weight="SemiBold" style={styles.wishlistCount}>
            {wishlist.length}
          </AppText>{' '}
          saved {wishlist.length === 1 ? 'property' : 'properties'}
        </AppText>
      </View>

      <TouchableOpacity
        style={styles.exploreButton}
        onPress={handleExplore}
        activeOpacity={0.8}
      >
        <Icons.MI name="add" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  // Property Card Component
  const PropertyCard = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => handlePropertyPress(item._id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.coverImage }}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => removeFromWishlist(item._id)}
          activeOpacity={0.8}
        >
          <Icons.MI name="favorite" size={20} color={Colors.error || '#ef4444'} />
        </TouchableOpacity>
      </View>

      <View style={styles.propertyContent}>
        <AppText weight="SemiBold" style={styles.propertyTitle} numberOfLines={2}>
          {item.title}
        </AppText>

        {item.location && (
          <View style={styles.locationContainer}>
            <Icons.MI name="location-on" size={14} color={Colors.grey500} />
            <AppText style={styles.locationText} numberOfLines={1}>
              {item.location}
            </AppText>
          </View>
        )}

        <View style={styles.propertyDetails}>
          {item.bedrooms && (
            <View style={styles.detailItem}>
              <Icons.MI name="hotel" size={16} color={Colors.grey600} />
              <AppText style={styles.detailText}>{item.bedrooms}</AppText>
            </View>
          )}

          {item.bathrooms && (
            <View style={styles.detailItem}>
              <Icons.MI name="bathtub" size={16} color={Colors.grey600} />
              <AppText style={styles.detailText}>{item.bathrooms}</AppText>
            </View>
          )}

          {item.area && (
            <View style={styles.detailItem}>
              <Icons.MI name="square-foot" size={16} color={Colors.grey600} />
              <AppText style={styles.detailText}>{item.area} sq ft</AppText>
            </View>
          )}
        </View>

        <AppText weight="Bold" style={styles.propertyPrice}>
          ₹{item.price.toLocaleString()}/month
        </AppText>
      </View>
    </TouchableOpacity>
  );

  // Wishlist Content
  const WishlistContent = () => (
    <>
      <Header />
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PropertyCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => (
          <View style={styles.listFooter}>
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={handleExplore}
              activeOpacity={0.8}
            >
              <Icons.MI name="add-circle-outline" size={24} color={Colors.primary} />
              <AppText weight="SemiBold" style={styles.addMoreText}>
                Find More Properties
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggedIn ? (
        <LoginRequiredView />
      ) : loading ? (
        <LoadingView />
      ) : wishlist.length === 0 ? (
        <EmptyWishlistView />
      ) : (
        <WishlistContent />
      )}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.grey50 || '#f9fafb',
  },

  // Center Container for Empty States
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl || 24,
  },

  // Empty State Card
  emptyStateCard: {
    // backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing['2xl'] || 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 12,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg || 20,
  },

  emptyTitle: {
    fontSize: TextSizes.xl || 24,
    color: Colors.grey900 || '#111827',
    textAlign: 'center',
    marginBottom: Spacing.sm || 8,
  },

  emptyDescription: {
    fontSize: TextSizes.md || 16,
    color: Colors.grey600 || '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl || 24,
  },

  // Buttons
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl || 24,
    paddingVertical: Spacing.md || 16,
    borderRadius: 16,
    marginBottom: Spacing.md || 16,
    gap: Spacing.sm || 8,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  primaryButtonText: {
    color: Colors.white,
    fontSize: TextSizes.md || 16,
  },

  secondaryButton: {
    paddingHorizontal: Spacing.lg || 20,
    paddingVertical: Spacing.sm || 12,
    borderRadius: 12,
    backgroundColor: Colors.grey100 || '#f3f4f6',
  },

  secondaryButtonText: {
    color: Colors.grey700 || '#374151',
    fontSize: TextSizes.sm || 14,
  },

  // Header Styles
  headerContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg || 20,
    paddingVertical: Spacing.md || 16,
    marginHorizontal: Spacing.lg || 20,
    marginTop: Spacing.md || 16,
    marginBottom: Spacing.sm || 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: TextSizes.xl || 24,
    color: Colors.grey900 || '#111827',
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: TextSizes.sm || 14,
    color: Colors.grey600 || '#6b7280',
  },

  wishlistCount: {
    color: Colors.primary,
  },

  exploreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  // List Styles
  listContainer: {
    paddingHorizontal: Spacing.lg || 20,
    paddingBottom: Spacing['2xl'] || 32,
  },

  itemSeparator: {
    height: Spacing.md || 16,
  },

  listFooter: {
    marginTop: Spacing.lg || 20,
    alignItems: 'center',
  },

  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl || 24,
    paddingVertical: Spacing.md || 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    gap: Spacing.sm || 8,
  },

  addMoreText: {
    color: Colors.primary,
    fontSize: TextSizes.md || 16,
  },

  // Property Card Styles
  propertyCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  imageContainer: {
    position: 'relative',
  },

  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.grey200,
  },

  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  propertyContent: {
    padding: Spacing.lg || 20,
  },

  propertyTitle: {
    fontSize: TextSizes.lg || 18,
    color: Colors.grey900 || '#111827',
    marginBottom: Spacing.sm || 8,
    lineHeight: 24,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm || 8,
    gap: 4,
  },

  locationText: {
    fontSize: TextSizes.sm || 14,
    color: Colors.grey600 || '#6b7280',
    flex: 1,
  },

  propertyDetails: {
    flexDirection: 'row',
    marginBottom: Spacing.md || 16,
    gap: Spacing.md || 16,
  },

  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  detailText: {
    fontSize: TextSizes.xs || 12,
    color: Colors.grey600 || '#6b7280',
    fontWeight: '500',
  },

  propertyPrice: {
    fontSize: TextSizes.lg || 18,
    color: Colors.primary,
  },

  // Loading State
  loadingText: {
    fontSize: TextSizes.md || 16,
    color: Colors.grey600 || '#6b7280',
    marginTop: Spacing.md || 16,
    textAlign: 'center',
  },
};

export default WishlistScreen;
