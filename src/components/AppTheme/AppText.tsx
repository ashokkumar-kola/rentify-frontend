import React from 'react';

import { Text, TextProps, TextStyle } from 'react-native';

import { Fonts } from '../../constants/Fonts';

type FontWeight = keyof typeof Fonts;

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  weight?: FontWeight;
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  weight = 'Regular',
  style,
  ...rest
}) => {
  return (
    <Text
      style={[{ fontFamily: Fonts[weight] }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
