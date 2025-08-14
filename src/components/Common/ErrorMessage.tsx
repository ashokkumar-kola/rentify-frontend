import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors'; // adjust to your path
import AppText from '../AppTheme/AppText';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="home" size={40} color={Colors.primary} />
      <AppText weight="SemiBold" style={styles.title}>Something went wrong</AppText>
      <AppText style={styles.subtitle}>
        {message || 'We couldn\'t load your properties right now.'}
      </AppText>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
	// flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});
