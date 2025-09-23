import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

interface JournalInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const JournalInput: React.FC<JournalInputProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Write about your day, thoughts, and reflections..." 
}) => {

  return (
    <CustomCard style={styles.container}>
      <TextInput
        style={[globalStyles.input, styles.textInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.SECONDARY_TEXT}
        multiline
        textAlignVertical="top"
      />
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  textInput: {
    flex: 1,
    minHeight: 400,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
    padding: theme.spacing.md,
  },
});
