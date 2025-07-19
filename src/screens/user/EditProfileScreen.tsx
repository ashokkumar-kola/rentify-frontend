import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api/apiClient';
import images from '../../assets/images'

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
// const [profileImage, setProfileImage] = useState('');
// const [password, setPassword] = useState('');
// const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token:', token);

      const userId = JSON.parse(atob(token!.split('.')[1]))?.id;
      console.log('User ID:', userId);

      const res = await api.get(`/users/${userId}`);
      console.log('User Profile Response:', res.data.success);

      const data = res.data.data;
      console.log('User Data:', data);

      setUser(data);
      setFullName(data.full_name);
      setPhoneNo(data.phone_no || '');
      setEmail(data.email);
      // setProfileImage(data.profile_image);
    } catch (err) {
      console.error(err);
    }
  };

//   const openImagePicker = () => {
//     ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
//       if (response.didCancel || response.errorCode) {
//         return;
//       }
//       const uri = response.assets[0].uri;
//       setProfileImage(uri);
//     });
//   };

  const handleUpdate = async () => {
    if (!fullName || !email) {
      Alert.alert('Error', 'Full name and email are required.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone_no', phoneNo);
    //   if (password) {formData.append('password', password);}

    //   if (profileImage && profileImage !== user?.profile_image) {
    //     formData.append('profile_image', {
    //       uri: profileImage,
    //       type: 'image/jpeg',
    //       name: 'profile.jpg',
    //     });
    //   }
        console.log('Form Data:', user._id, formData);
        const res = await api.put(`/users/${user._id}`, {
            full_name: fullName,
            email,
            phone_no: phoneNo,
        }); // formData, { headers: { 'Content-Type': 'multipart/form-data' } }
        console.log('Update Profile Response:', res.data.success);

      if (res.data.success) {
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Alert.alert('This feature is still in development phase, coming soon!') }>
        <Image
          source={images.defaultProfileImg} // profileImage ? { uri: profileImage } :
          style={styles.avatar}
        />
        <View style={styles.cameraIcon}>
          <Icon name="camera" size={18} color="#fff" />
        </View>
      </TouchableOpacity>

      <Text style={styles.welcome}>Hi, My name is {fullName || 'User'}</Text>

        <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
        />
      <TextInput style={styles.input} value={phoneNo} onChangeText={setPhoneNo} placeholder="Phone Number" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

      {/* <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Change Password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={22} color="#666" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#6366f1',
    padding: 6,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#111827',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
