import { format, parseISO } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomCard from '@/src/components/CustomCard';
import { FloatingActionButton } from '@/src/components/FloatingActionButton';
import { globalStyles, theme } from '../utils/theme';

interface JournalEntry {
  date: string;
  text: string;
  preview: string;
}

export const JournalScreen: React.FC = () => {
  const journalEntries = useSelector((state: any) => state.journal.entries);

  // Convert entries object to sorted array
  const entriesArray: JournalEntry[] = Object.entries(journalEntries)
    .map(([date, text]: [string, string]) => ({
      date,
      text,
      preview: text.length > 100 ? text.substring(0, 100) + '...' : text,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Latest first

  const formatEntryDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
        return 'Today';
      } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
        return 'Yesterday';
      } else {
        return format(date, 'MMM dd, yyyy');
      }
    } catch {
      return dateString;
    }
  };

  const handleEntryPress = (date: string) => {
    router.push(`/journal-entry?date=${date}`);
  };

  const handleNewEntry = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const existingEntry = journalEntries[today];
    
    if (existingEntry) {
      // If entry exists for today, create a new entry with timestamp
      const timestamp = new Date().getTime();
      const newDate = `${today}-${timestamp}`;
      router.push(`/journal-entry?date=${newDate}&isNew=true`);
    } else {
      // No entry for today, use today's date
      router.push(`/journal-entry?date=${today}&isNew=true`);
    }
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity onPress={() => handleEntryPress(item.date)}>
      <CustomCard style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Text style={[globalStyles.headingText, styles.entryDate]}>
            {formatEntryDate(item.date)}
          </Text>
        </View>
        
        {item.preview ? (
          <Text style={[globalStyles.primaryText, styles.entryPreview]} numberOfLines={3}>
            {item.preview}
          </Text>
        ) : (
          <Text style={[globalStyles.secondaryText, styles.emptyEntry]}>
            No content
          </Text>
        )}
      </CustomCard>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[globalStyles.headingText, styles.emptyTitle]}>
        Start Your Journal
      </Text>
      <Text style={[globalStyles.secondaryText, styles.emptySubtitle]}>
        Capture your thoughts, experiences, and daily reflections
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={[globalStyles.headingText, styles.screenTitle]}>
          My Journal
        </Text>
      </View>

      <FlatList
        data={entriesArray}
        renderItem={renderEntry}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      <FloatingActionButton onPress={handleNewEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  screenTitle: {
    fontSize: theme.fontSize.xxl,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    flexGrow: 1,
  },
  entryCard: {
    marginBottom: theme.spacing.md,
  },
  entryHeader: {
    marginBottom: theme.spacing.sm,
  },
  entryDate: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.ACCENT_COLOR,
  },
  entryPreview: {
    lineHeight: 22,
  },
  emptyEntry: {
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.fontSize.xxl,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
});