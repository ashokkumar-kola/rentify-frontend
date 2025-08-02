import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import useConfirmEmail from '../../hooks/authHooks/useConfirmEmail';

import AppText from '../../components/AppTheme/AppText';
import { Colors } from '../../constants';
import Icons from '../../constants/Icons';
import images from '../../assets/images';
import styles from './styles';

type ConfirmEmailProps = NativeStackScreenProps<AuthStackParamList, 'ConfirmEmail'>;

const ConfirmEmailScreen: React.FC<ConfirmEmailProps> = ({ navigation, route }) => {
  const {
    otp,
    setOtp,
    loading,
    alertVisible,
    alertMessage,
    handleConfirmEmail,
  } = useConfirmEmail();

  const handleSubmit = async () => {
    const result = await handleConfirmEmail(route.params.email);
    if (result.success) {
      navigation.navigate('ResetPassword', { email: route.params.email });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icons.MI name="arrow-back" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <AppText style={styles.tagline}>LIVE YOUR DREAM HOME</AppText>
        </View>

        <View style={styles.logoContainer}>
          <AppText style={styles.tagline}>Confirm Email</AppText>
        </View>

        <View style={styles.card}>
          <AppText style={styles.welcome}>Enter Verification Code</AppText>
          <AppText style={styles.subText}>
            Enter the 6-digit code sent to{' '}
            <AppText weight="Bold" >{route.params.email}</AppText>
          </AppText>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, alertVisible ? { borderColor: Colors.warning } : {}]}
              placeholder="Enter OTP"
              placeholderTextColor={Colors.grey200}
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
            {alertVisible && (
              <AppText style={styles.errorText}>{alertMessage}</AppText>
            )}
          </View>

          <TouchableOpacity
            style={styles.sendCodeButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <AppText style={styles.sendCodeButtonText}>Verify Code</AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConfirmEmailScreen;
