import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

interface JournalEntry {
  text: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface JournalState {
  entries: Record<string, JournalEntry>; // { 'YYYY-MM-DD': JournalEntry }
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
    updateJournalEntry: (state, action: PayloadAction<{ date: string; text: string; title?: string }>) => {
      const { date, text, title } = action.payload;
      const now = new Date().toISOString();
      
      if (state.entries[date]) {
        // Update existing entry
        state.entries[date] = {
          ...state.entries[date],
          text,
          title: title || state.entries[date].title || 'Journal Entry',
          updatedAt: now,
        };
      } else {
        // Create new entry
        state.entries[date] = {
          text,
          title: title || 'Journal Entry',
          createdAt: now,
          updatedAt: now,
        };
      }
    },
    setSelectedSign: (state, action: PayloadAction<string>) => {
      state.selectedSign = action.payload;
    },
    loadJournalEntries: (state, action: PayloadAction<Record<string, JournalEntry> | null>) => {
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
  const entry = state.journal.entries[formattedDate];
  return entry?.text || '';
};

export const selectJournalEntryFull = (state: any, date: string | Date): JournalEntry | null => {
  const formattedDate = typeof date === 'string' ? date : format(date, 'yyyy-MM-dd');
  return state.journal.entries[formattedDate] || null;
};

export const selectTodayJournalEntry = (state: any): string => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const entry = state.journal.entries[today];
  return entry?.text || '';
};

export const selectSelectedSign = (state: any): string => state.journal.selectedSign;

export default journalSlice.reducer;
