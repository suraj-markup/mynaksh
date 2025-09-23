import { format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DateHeader } from '../components/DateHeader';
import { JournalInput } from '../components/JournalInput';
import { SaveButton } from '../components/SaveButton';
import { selectJournalEntry, updateJournalEntry } from '../store/journalSlice';
import { globalStyles, theme } from '../utils/theme';

export const JournalEntryScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const entryDate = params.date as string || format(new Date(), 'yyyy-MM-dd');
  const isNew = params.isNew === 'true';
  
  const existingEntry = useSelector((state: any) => selectJournalEntry(state, entryDate));
  const [text, setText] = useState(isNew ? '' : existingEntry);
  const [title, setTitle] = useState('Journal Entry');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      setText(existingEntry);
    }
  }, [existingEntry, isNew]);

  const handleTextChange = (newText: string) => {
    setText(newText);
    setHasUnsavedChanges(newText !== existingEntry);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
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
      <View style={styles.headerContainer}>
        <DateHeader 
          date={entryDate} 
          onBack={handleBack}
          title={title}
          onTitleChange={handleTitleChange}
          editable={true}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <JournalInput 
          value={text}
          onChangeText={handleTextChange}
          placeholder="Write about your day, thoughts, and reflections..."
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <SaveButton 
          onPress={handleSave}
          disabled={!hasUnsavedChanges}
          title={hasUnsavedChanges ? 'Save Changes' : 'Saved'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
});
