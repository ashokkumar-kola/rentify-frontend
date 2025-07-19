import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, TextSizes } from '../../constants';

import type { KeyboardTypeOptions } from 'react-native';

type FormInputProps = {
  iconName: string;
  iconSize?: number;
  iconLib?: 'FontAwesome' | 'MaterialIcons';
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  [key: string]: any;
};

const FormInput: React.FC<FormInputProps> = ({
  iconName,
  iconSize = 24,
  iconLib = 'FontAwesome',
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  error,
  ...props
}) => {
  const IconComponent = iconLib === 'MaterialIcons' ? MaterialIcons : FontAwesome;

  return (
    <>
      <View style={styles.inputContainer}>
        <IconComponent
          name={iconName}
          size={iconSize}
          color={Colors.primary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey800}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || 'none'}
          {...props}
        />
        {props.rightIcon && (
          <MaterialIcons
            name={props.rightIcon}
            size={24}
            color={Colors.primary}
            onPress={props.onRightIconPress}
          />
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" color={Colors.error} size={TextSizes.base} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.white100,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#222',
    fontSize: TextSizes.base,
    fontFamily: 'Poppins-Regular',
  },
  errorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  errorText: {
    color: Colors.white100,
    fontSize: 12,
    marginLeft: 8,
  },
});

export default FormInput;
