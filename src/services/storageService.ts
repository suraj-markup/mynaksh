import AsyncStorage from '@react-native-async-storage/async-storage';

const JOURNAL_STORAGE_KEY = '@astro_journal_entries';
const SELECTED_SIGN_KEY = '@astro_selected_sign';

interface JournalEntry {
  text: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export const storageService = {
  // Save journal entries to AsyncStorage
  async saveJournalEntries(entries: Record<string, JournalEntry>): Promise<void> {
    try {
      const jsonValue = JSON.stringify(entries);
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, jsonValue);

    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
  },

  // Load journal entries from AsyncStorage
  async loadJournalEntries(): Promise<Record<string, JournalEntry> | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      const entries = jsonValue != null ? JSON.parse(jsonValue) : null;
      return entries;
    } catch (error) {
      console.error('Error loading journal entries:', error);
      return null;
    }
  },

  // Save selected zodiac sign
  async saveSelectedSign(sign: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SELECTED_SIGN_KEY, sign);
    } catch (error) {
      console.error('Error saving selected sign:', error);
    }
  },

  // Load selected zodiac sign
  async loadSelectedSign(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(SELECTED_SIGN_KEY);
    } catch (error) {
      console.error('Error loading selected sign:', error);
      return null;
    }
  },

  // Clear all data (for debugging)
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([JOURNAL_STORAGE_KEY, SELECTED_SIGN_KEY]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
};
