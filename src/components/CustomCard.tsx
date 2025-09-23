import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { globalStyles } from '../utils/theme';

interface CustomCardProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[globalStyles.card, style]} {...props}>
      {children}
    </View>
  );
};

export default CustomCard;
