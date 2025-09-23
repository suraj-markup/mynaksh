import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

interface JournalState {
  entries: Record<string, string>; // { 'YYYY-MM-DD': 'journal text...' }
  selectedSign: string;
}

const initialState: JournalState = {
  entries: {},
  selectedSign: 'aries', // Default zodiac sign
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    updateJournalEntry: (state, action: PayloadAction<{ date: string; text: string }>) => {
      const { date, text } = action.payload;
      state.entries[date] = text;
    },
    setSelectedSign: (state, action: PayloadAction<string>) => {
      state.selectedSign = action.payload;
    },
    loadJournalEntries: (state, action: PayloadAction<Record<string, string> | null>) => {
      // Used to hydrate state from AsyncStorage
      state.entries = action.payload || {};
    },
    deleteJournalEntry: (state, action: PayloadAction<{ date: string }>) => {
      const { date } = action.payload;
      delete state.entries[date];
    },
  },
});

export const { 
  updateJournalEntry, 
  setSelectedSign, 
  loadJournalEntries,
  deleteJournalEntry 
} = journalSlice.actions;

// Selectors
export const selectJournalEntry = (state: any, date: string | Date): string => {
  const formattedDate = typeof date === 'string' ? date : format(date, 'yyyy-MM-dd');
  return state.journal.entries[formattedDate] || '';
};

export const selectTodayJournalEntry = (state: any): string => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return state.journal.entries[today] || '';
};

export const selectSelectedSign = (state: any): string => state.journal.selectedSign;

export default journalSlice.reducer;
