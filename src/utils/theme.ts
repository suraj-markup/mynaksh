import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from './constants';

// Base theme configuration
export const theme = {
  colors: COLORS,
  fonts: FONTS,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

// Global styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.PRIMARY_BACKGROUND,
  },
  card: {
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryText: {
    color: theme.colors.PRIMARY_TEXT,
    fontSize: theme.fontSize.md,
  },
  secondaryText: {
    color: theme.colors.SECONDARY_TEXT,
    fontSize: theme.fontSize.sm,
  },
  headingText: {
    color: theme.colors.PRIMARY_TEXT,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.colors.ACCENT_COLOR,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.PRIMARY_BACKGROUND,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.CARD_BACKGROUND,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    color: theme.colors.PRIMARY_TEXT,
    fontSize: theme.fontSize.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
});
