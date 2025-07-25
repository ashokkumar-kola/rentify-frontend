import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type ChangePasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ChangePassword'>;

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>ChangePasswordScreen</Text>
    </View>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})