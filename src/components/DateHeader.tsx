import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

export const DateHeader: React.FC = () => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM do, yyyy');

  return (
    <CustomCard style={styles.container}>
      <Text style={[globalStyles.headingText, styles.title]}>
        Journal Entry
      </Text>
      <Text style={[globalStyles.secondaryText, styles.date]}>
        {formattedDate}
      </Text>
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
    textAlign: 'center',
  },
});
