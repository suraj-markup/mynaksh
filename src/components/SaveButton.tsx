import { format } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTodayJournalEntry, updateJournalEntry } from '../store/journalSlice';
import CustomButton from './CustomButton';

export const SaveButton: React.FC = () => {
  const dispatch = useDispatch();
  const todayEntry = useSelector(selectTodayJournalEntry);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      dispatch(updateJournalEntry({ date: today, text: todayEntry }));
      
      // Simulate save delay for user feedback
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (error) {
      setIsSaving(false);
      console.error('Failed to save journal entry:', error);
    }
  };

  return (
    <CustomButton
      title={isSaving ? 'Saving...' : 'Save Entry'}
      onPress={handleSave}
      disabled={isSaving || !todayEntry.trim()}
    />
  );
};
