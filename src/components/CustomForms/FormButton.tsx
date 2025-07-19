import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, TextSizes } from '../../constants';

type FormButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: object;
  textStyle?: object;
  [key: string]: any;
};

const FormButton: React.FC<FormButtonProps> = ({ title, onPress, loading = false, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={Colors.primary} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    backgroundColor: Colors.white100,
    paddingVertical: 16,
    borderRadius: 26,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: TextSizes.base,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default FormButton;
