/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyPropertyCard from '../../components/PropertyCards/MyPropertyCard';
import useMyProperties from '../../hooks/userHooks/useMyProperties';
import AppText from '../../components/AppTheme/AppText';
import { Colors, Fonts, Spacing, TextSizes } from '../../constants';
import Icons from '../../constants/Icons';
import { useAuth } from '../../contexts/AuthContext';

const MyPropertiesScreen: React.FC = ({ navigation }: any) => {
	const { user, isLoggedIn } = useAuth();
	const { properties, loading, error, refresh } = useMyProperties();
	console.log(properties);

	const handleLogin = () => {
		navigation.navigate('AuthStack', { screen: 'Login' });
	};
	const handleCreateProperty = () => {
		navigation.navigate('AddProperty');
	};
	const handleEdit = (id: string) => {
		navigation.navigate('EditProperty', { propertyId: id });
	};
	const handleDetails = (id: string) => {
		navigation.navigate('MyPropertyDetails', { propertyId: id });
	};

  // Login Required State
  const LoginRequiredView = () => (
    <View style={styles.centerContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.iconContainer}>
          <Icons.MI name="lock" size={48} color={Colors.primary} />
        </View>

        <AppText weight="Bold" style={styles.emptyTitle}>
          Login Required
        </AppText>

        <AppText style={styles.emptyDescription}>
          Please log in to view and manage your properties
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
      </View>
    </View>
  );

  // Loading State
  const LoadingView = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <AppText style={styles.loadingText}>Loading your properties...</AppText>
    </View>
  );

  // Empty Properties State
  const EmptyPropertiesView = () => (
    <View style={styles.centerContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.iconContainer}>
          <Icons.MI name="home" size={48} color={Colors.primary} />
        </View>

        <AppText weight="Bold" style={styles.emptyTitle}>
          No Properties Yet
        </AppText>

        <AppText style={styles.emptyDescription}>
          Start building your property portfolio by adding your first property
        </AppText>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleCreateProperty}
          activeOpacity={0.8}
        >
          <Icons.MI name="add" size={20} color={Colors.white} />
          <AppText weight="SemiBold" style={styles.primaryButtonText}>
            Add Your First Property
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Properties')}
          activeOpacity={0.8}
        >
          <AppText weight="Medium" style={styles.secondaryButtonText}>
            Browse All Properties
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Header Component
  const Header = () => (
		// <View style={styles.headerRow}>
		// 	<AppText style={styles.countText}>
		// 		You have{' '}
		// 		<AppText style={styles.countNumber}>
		// 			{properties.length}
		// 		</AppText>{' '}
		// 		{properties.length === 1 ? 'property' : 'properties'}
		// 	</AppText>
		// 	<TouchableOpacity
		// 	style={styles.createButton}
		// 	onPress={handleCreateProperty}
		// 	>
		// 	<Icons.FA name="plus" size={16} color="#fff" />
		// 	<Text style={styles.createButtonText}>Add Property</Text>
		// 	</TouchableOpacity>
		// </View>

    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View>
          <AppText weight="Bold" style={styles.headerTitle}>
            My Properties
          </AppText>
          <AppText style={styles.headerSubtitle}>
            You have{' '}
            <AppText weight="SemiBold" style={styles.propertyCount}>
              {properties.length}
            </AppText>{' '}
            {properties.length === 1 ? 'property' : 'properties'}
          </AppText>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateProperty}
          activeOpacity={0.8}
        >
          <Icons.MI name="add" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Property List Component
  const PropertyList = () => (
    <>
      <Header />
      <FlatList
        data={properties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MyPropertyCard
            property={{
              ...item,
              onPrimaryAction: () => handleEdit(item.id),
              onSecondaryAction: () => handleDetails(item.id),
              primaryLabel: 'Edit',
              secondaryLabel: 'View Details',
            }}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={refresh}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => (
          <View style={styles.listFooter}>
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={handleCreateProperty}
              activeOpacity={0.8}
            >
              <Icons.MI name="add-circle-outline" size={24} color={Colors.primary} />
              <AppText weight="SemiBold" style={styles.addMoreText}>
                Add Another Property
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );

  // Error State (optional)
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.emptyStateCard}>
            <View style={styles.iconContainer}>
              <Icons.MI name="error" size={48} color={Colors.error || '#ef4444'} />
            </View>

            <AppText weight="Bold" style={styles.emptyTitle}>
              Something went wrong
            </AppText>

            <AppText style={styles.emptyDescription}>
              We couldn't load your properties. Please try again.
            </AppText>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={refresh}
              activeOpacity={0.8}
            >
              <Icons.MI name="refresh" size={20} color={Colors.white} />
              <AppText weight="SemiBold" style={styles.primaryButtonText}>
                Try Again
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggedIn ? (
        <LoginRequiredView />
      ) : loading ? (
        <LoadingView />
      ) : properties.length === 0 ? (
        <EmptyPropertiesView />
      ) : (
        <PropertyList />
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
  },

  headerContent: {
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

  propertyCount: {
    color: Colors.primary,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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

  // Loading State
  loadingText: {
    fontSize: TextSizes.md || 16,
    color: Colors.grey600 || '#6b7280',
    marginTop: Spacing.md || 16,
    textAlign: 'center',
  },
};

export default MyPropertiesScreen;
