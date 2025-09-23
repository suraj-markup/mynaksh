import { Ionicons } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

interface DateHeaderProps {
  date?: string;
  onBack?: () => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  editable?: boolean;
}

export const DateHeader: React.FC<DateHeaderProps> = ({ 
  date, 
  onBack, 
  title = "Journal Entry",
  onTitleChange,
  editable = false 
}) => {
  let targetDate: Date;
  
  try {
    if (date) {
      // Extract just the date part if it contains timestamp
      const dateOnly = date.split('-').slice(0, 3).join('-');
      targetDate = parseISO(dateOnly);
    } else {
      targetDate = new Date();
    }
  } catch {
    targetDate = new Date();
  }
  
  const formattedDate = format(targetDate, 'EEEE, MMMM do, yyyy');

  return (
    <CustomCard style={styles.container}>
      <View style={styles.headerRow}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={theme.colors.PRIMARY_TEXT} 
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.titleContainer}>
          {editable && onTitleChange ? (
            <TextInput
              style={[globalStyles.headingText, styles.titleInput]}
              value={title}
              onChangeText={onTitleChange}
              placeholder="Journal Entry"
              placeholderTextColor={theme.colors.SECONDARY_TEXT}
              textAlign="center"
              multiline={false}
              maxLength={50}
            />
          ) : (
            <Text style={[globalStyles.headingText, styles.title]}>
              {title}
            </Text>
          )}
          <Text style={[globalStyles.secondaryText, styles.date]}>
            {formattedDate}
          </Text>
        </View>
        
        {onBack && <View style={styles.placeholder} />}
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  titleInput: {
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ACCENT_COLOR,
    paddingVertical: theme.spacing.xs,
  },
  date: {
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
});
