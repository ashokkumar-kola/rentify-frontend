import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Colors } from '../../constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // TODO: Implement your API call here
    Alert.alert('Success', `A 6-digit code will be sent to ${email}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AppDrawer')}>
            <MaterialIcons name="arrow-back" size={36} color={Colors.primary} />
          </TouchableOpacity>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>LIVE YOUR DREAM HOME</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.tagline}>Forgot Password</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcome}>Reset your password</Text>
          <Text style={styles.subText}>
            Enter your email address and we'll send you a 6-digit code.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.grey200}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.sendCodeButton}
            onPress={handleSendCode}
          >
            <Text style={styles.sendCodeButtonText}>
              Send Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
