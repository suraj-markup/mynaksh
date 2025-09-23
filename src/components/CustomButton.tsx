import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { globalStyles, theme } from '../utils/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  variant = 'primary' 
}) => {
  const buttonStyles = [
    globalStyles.button,
    variant === 'secondary' && styles.secondaryButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyles = [
    globalStyles.buttonText,
    variant === 'secondary' && styles.secondaryButtonText,
    disabled && styles.disabledButtonText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.ACCENT_COLOR,
  },
  secondaryButtonText: {
    color: theme.colors.ACCENT_COLOR,
  },
  disabledButton: {
    backgroundColor: theme.colors.SECONDARY_TEXT,
    opacity: 0.6,
  },
  disabledButtonText: {
    color: theme.colors.PRIMARY_BACKGROUND,
  },
});

export default CustomButton;
