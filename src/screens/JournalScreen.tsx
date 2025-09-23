import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { DateHeader } from '../components/DateHeader';
import { JournalInput } from '../components/JournalInput';
import { SaveButton } from '../components/SaveButton';
import { selectTodayJournalEntry } from '../store/journalSlice';
import { globalStyles, theme } from '../utils/theme';

export const JournalScreen: React.FC = () => {
  const todayEntry = useSelector(selectTodayJournalEntry);

  return (
    <View style={globalStyles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <DateHeader />
        
        <View style={styles.journalContainer}>
          <JournalInput />
          <SaveButton />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  journalContainer: {
    flex: 1,
    gap: theme.spacing.lg,
  },
});
