import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type VerifyEmailScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>VerifyEmailScreen</Text>
    </View>
  )
}

export default VerifyEmailScreen

const styles = StyleSheet.create({})