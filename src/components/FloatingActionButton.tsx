import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { theme } from '../utils/theme';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons 
        name="add" 
        size={32} 
        color={theme.colors.PRIMARY_BACKGROUND} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.ACCENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
