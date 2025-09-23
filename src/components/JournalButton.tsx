import { router } from 'expo-router';
import React from 'react';

import CustomButton from './CustomButton';

export const JournalButton: React.FC = () => {
  const navigateToJournal = () => {
    // Navigate to the journal tab
    router.push('/(tabs)/explore');
  };

  return (
    <CustomButton
      title="Write in Journal"
      onPress={navigateToJournal}
    />
  );
};
