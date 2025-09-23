import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';

import { globalStyles, theme } from '../utils/theme';
import { selectJournalEntry, updateJournalEntry } from '../store/journalSlice';
import { DateHeader } from '../components/DateHeader';
import { JournalInput } from '../components/JournalInput';
import { SaveButton } from '../components/SaveButton';

export const JournalEntryScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const entryDate = params.date as string || format(new Date(), 'yyyy-MM-dd');
  
  const existingEntry = useSelector((state: any) => selectJournalEntry(state, entryDate));
  const [text, setText] = useState(existingEntry);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setText(existingEntry);
  }, [existingEntry]);

  const handleTextChange = (newText: string) => {
    setText(newText);
    setHasUnsavedChanges(newText !== existingEntry);
  };

  const handleSave = () => {
    dispatch(updateJournalEntry({ date: entryDate, text }));
    setHasUnsavedChanges(false);
    Alert.alert('Saved', 'Your journal entry has been saved successfully!');
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before leaving?',
        [
          { text: 'Discard', style: 'destructive', onPress: () => router.back() },
          { text: 'Cancel', style: 'cancel' },
          { text: 'Save', onPress: () => { handleSave(); router.back(); } },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <DateHeader date={entryDate} onBack={handleBack} />
        
        <View style={styles.contentContainer}>
          <JournalInput 
            value={text}
            onChangeText={handleTextChange}
            placeholder="Write about your day, thoughts, and reflections..."
          />
          
          <SaveButton 
            onPress={handleSave}
            disabled={!hasUnsavedChanges}
            title={hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing.lg,
  },
});
