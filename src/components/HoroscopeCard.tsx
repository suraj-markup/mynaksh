import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { HoroscopeData } from '../services/horoscopeService';
import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

interface HoroscopeCardProps {
  horoscopeData?: HoroscopeData & { fetchedAt: string };
  loading: boolean;
  error: string | null;
  selectedSign: string;
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({
  horoscopeData,
  loading,
  error,
  selectedSign,
}) => {
  if (loading) {
    return (
      <CustomCard style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.ACCENT_COLOR} />
        <Text style={[globalStyles.secondaryText, styles.loadingText]}>
          Loading your horoscope...
        </Text>
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard style={styles.container}>
        <Text style={[globalStyles.primaryText, styles.errorText]}>
          Unable to load horoscope. Please try again.
        </Text>
      </CustomCard>
    );
  }

  if (!horoscopeData) {
    return null;
  }

  return (
    <CustomCard style={styles.container}>
      <Text style={[globalStyles.headingText, styles.title]}>
        Today's Horoscope
      </Text>
      <Text style={[globalStyles.secondaryText, styles.date]}>
        {horoscopeData.current_date}
      </Text>
      
      <Text style={[globalStyles.primaryText, styles.description]}>
        {horoscopeData.description}
      </Text>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Mood:</Text>
          <Text style={styles.detailValue}>{horoscopeData.mood}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Lucky Color:</Text>
          <Text style={styles.detailValue}>{horoscopeData.color}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Lucky Number:</Text>
          <Text style={styles.detailValue}>{horoscopeData.lucky_number}</Text>
        </View>
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  date: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  details: {
    width: '100%',
    gap: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...globalStyles.secondaryText,
    fontWeight: '600',
  },
  detailValue: {
    ...globalStyles.primaryText,
    color: theme.colors.ACCENT_COLOR,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: '#ff6b6b',
  },
});
