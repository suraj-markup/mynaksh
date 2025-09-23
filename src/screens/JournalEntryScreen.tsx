import { format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DateHeader } from '../components/DateHeader';
import { JournalInput } from '../components/JournalInput';
import { selectJournalEntry, selectJournalEntryFull, updateJournalEntry } from '../store/journalSlice';
import { globalStyles, theme } from '../utils/theme';

export const JournalEntryScreen: React.FC = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const entryDate = params.date as string || format(new Date(), 'yyyy-MM-dd');
  const isNew = params.isNew === 'true';
  
  const existingEntryText = useSelector((state: any) => selectJournalEntry(state, entryDate));
  const existingEntryFull = useSelector((state: any) => selectJournalEntryFull(state, entryDate));
  
  const [text, setText] = useState(isNew ? '' : existingEntryText);
  const [title, setTitle] = useState(isNew ? 'Journal Entry' : (existingEntryFull?.title || 'Journal Entry'));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(isNew);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isNew) {
      setText(existingEntryText);
      setTitle(existingEntryFull?.title || 'Journal Entry');
    }
  }, [existingEntryText, existingEntryFull, isNew]);

  const autoSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      dispatch(updateJournalEntry({ date: entryDate, text, title }));
      setHasUnsavedChanges(false);
      setTimeout(() => setIsSaving(false), 500);
    }, 1000); // Auto-save after 1 second of inactivity
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    const hasChanges = newText !== existingEntryText || title !== (existingEntryFull?.title || 'Journal Entry');
    setHasUnsavedChanges(hasChanges);
    
    if (hasChanges) {
      autoSave();
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const hasChanges = text !== existingEntryText || newTitle !== (existingEntryFull?.title || 'Journal Entry');
    setHasUnsavedChanges(hasChanges);
    
    if (hasChanges) {
      autoSave();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleBack = () => {
    if (hasUnsavedChanges && !isSaving) {
      // Force save before leaving
      dispatch(updateJournalEntry({ date: entryDate, text, title }));
    }
    router.back();
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
        
        {/* Auto-save indicator */}
        {(isSaving || hasUnsavedChanges) && (
          <View style={styles.statusContainer}>
            <Text style={[globalStyles.secondaryText, styles.statusText]}>
              {isSaving ? 'Saving...' : 'Unsaved changes'}
            </Text>
          </View>
        )}
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
    paddingBottom: theme.spacing.lg,
  },
  statusContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.CARD_BACKGROUND,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.fontSize.xs,
  },
});
