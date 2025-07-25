import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import AppText from '../../components/AppTheme/AppText';
import { Colors, Spacing, TextSizes } from '../../constants';
import NotificationItem from './NotificationItem';
import images from '../../assets/images';

import { getNotifications } from '../../services/UserServices';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await getNotifications().then((response: any) => {
          setNotifications(response);
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={images.no_notifications}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <AppText style={styles.emptyText}>No notifications yet!</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        contentContainerStyle={{ padding: Spacing.md }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundLight,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: Spacing.lg,
  },
  emptyText: {
    fontSize: TextSizes.md,
    color: Colors.textGrey,
    textAlign: 'center',
  },
});







{/* <FlatList
  data={notifications}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <NotificationItem notification={item} />}
  contentContainerStyle={{ flexGrow: 1, padding: Spacing.md }}
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={() => (
    <View style={styles.emptyContainer}>
      <Image
        source={images.no_notifications}
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <AppText style={styles.emptyText}>No notifications yet!</AppText>
    </View>
  )}
/> */}
