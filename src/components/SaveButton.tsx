import React from 'react';
import CustomButton from './CustomButton';

interface SaveButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ 
  onPress, 
  disabled = false,
  title = 'Save Entry'
}) => {
  return (
    <CustomButton
      title={title}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
