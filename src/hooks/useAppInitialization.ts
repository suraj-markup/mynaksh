import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storageService } from '../services/storageService';
import { loadJournalEntries, setSelectedSign } from '../store/journalSlice';

export const useAppInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app data...');
        
        // Load journal entries
        const journalEntries = await storageService.loadJournalEntries();
        if (journalEntries) {
          dispatch(loadJournalEntries(journalEntries));
        }

        // Load selected zodiac sign
        const selectedSign = await storageService.loadSelectedSign();
        if (selectedSign) {
          dispatch(setSelectedSign(selectedSign));
        }

        console.log('App initialization complete');
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);
};
