import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { selectTodayJournalEntry, updateJournalEntry } from '../store/journalSlice';
import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

export const JournalInput: React.FC = () => {
  const dispatch = useDispatch();
  const savedEntry = useSelector(selectTodayJournalEntry);
  const [text, setText] = useState(savedEntry);

  useEffect(() => {
    setText(savedEntry);
  }, [savedEntry]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleBlur = () => {
    // Auto-save on blur
    const today = format(new Date(), 'yyyy-MM-dd');
    dispatch(updateJournalEntry({ date: today, text }));
  };

  return (
    <CustomCard style={styles.container}>
      <TextInput
        style={[globalStyles.input, styles.textInput]}
        value={text}
        onChangeText={handleTextChange}
        onBlur={handleBlur}
        placeholder="Write about your day, thoughts, and reflections..."
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
    minHeight: 300,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
  },
});
