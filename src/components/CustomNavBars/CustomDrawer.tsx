import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { jwtDecode } from 'jwt-decode';

import { Colors } from '../../constants';
import images from '../../assets/images';

interface DecodedUser {
  name: string;
  lastName: string;
  avatar?: string;
}

type CustomDrawerProps = NativeStackNavigationProp<RootStackParamList>;

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<CustomDrawerProps>();
  const [user, setUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded: DecodedUser = jwtDecode(token);
          setUser(decoded);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.clear();

            navigation.navigate('AuthStack');
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'AuthStack' as never }],
            // });
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        {/* Rentify Logo */}
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={ images.defaultProfileImg
              // {
              // uri:
              //   user?.avatar ||
              //   `https://ui-avatars.com/api/?name=${user?.name || 'User'}+${user?.lastName || ''}&background=random&size=128`,
              // }
            }
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'Guest'}</Text>
          <Text style={styles.subName}>{user?.lastName || ''}</Text>
        </View>

        {/* Default Drawer Items */}
        {/* <View style={styles.menuList}>
          <DrawerItemList {...props} />
        </View> */}

        {/* Custom Quick Links */}
        <View style={styles.quickLinks}>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <FontAwesome name="user-circle" size={20} />
            <Text style={styles.linkText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('MyProperties' as never)}
          >
            <FontAwesome name="home" size={20} />
            <Text style={styles.linkText}>My Properties</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('MyRentals' as never)}
          >
            <FontAwesome name="building" size={20} />
            <Text style={styles.linkText}>My Rentals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate('MyApplications' as never)}
          >
            <FontAwesome name="file-text" size={20} />
            <Text style={styles.linkText}>My Applications</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings' as never)}
          style={styles.bottomItem}
        >
          <FontAwesome name="cog" size={20} />
          <Text style={styles.bottomText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SupportStack' as never)}
          style={styles.bottomItem}
        >
          <FontAwesome name="support" size={20} />
          <Text style={styles.bottomText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert('Privacy Policy')}
          style={styles.bottomItem}
        >
          <FontAwesome name="shield" size={20} />
          <Text style={styles.bottomText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 140,
    height: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f7f7f7',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
  },
  subName: {
    color: '#666',
    fontSize: 14,
  },
  quickLinks: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
    marginLeft: 12,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 20,
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
