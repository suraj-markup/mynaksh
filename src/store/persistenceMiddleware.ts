import { Middleware } from '@reduxjs/toolkit';
import { storageService } from '../services/storageService';

// Middleware to automatically save journal entries to AsyncStorage
export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save to AsyncStorage when journal entries are updated
  if (action.type?.startsWith('journal/')) {
    const state = store.getState() as any;
    
    // Save journal entries
    if (action.type === 'journal/updateJournalEntry' || 
        action.type === 'journal/deleteJournalEntry') {
      storageService.saveJournalEntries(state.journal.entries);
    }
    
    // Save selected sign
    if (action.type === 'journal/setSelectedSign') {
      storageService.saveSelectedSign(state.journal.selectedSign);
    }
  }

  return result;
};
