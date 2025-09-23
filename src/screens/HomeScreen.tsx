import { format } from 'date-fns';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FloatingActionButton } from '@/src/components/FloatingActionButton';
import { HoroscopeCard } from '@/src/components/HoroscopeCard';
import { ZodiacSelector } from '@/src/components/ZodiacSelector';
import { fetchHoroscopeData } from '../store/horoscopeSlice';
import { selectSelectedSign } from '../store/journalSlice';
import { globalStyles, theme } from '../utils/theme';

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSign = useSelector(selectSelectedSign);
  const horoscopeState = useSelector((state: any) => state.horoscope);

  useEffect(() => {
    // Only fetch if we don't already have data for this sign
    const existingData = horoscopeState.data[selectedSign];
    const isDataFresh = existingData && 
      new Date().getTime() - new Date(existingData.fetchedAt).getTime() < 60 * 60 * 1000; // 1 hour cache
    
    if (!existingData || !isDataFresh) {
      dispatch(fetchHoroscopeData(selectedSign) as any);
    }
  }, [selectedSign, dispatch, horoscopeState.data]);

  return (
    <View style={globalStyles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ZodiacSelector />
        </View>
        
        <View style={styles.content}>
          <HoroscopeCard 
            horoscopeData={horoscopeState.data[selectedSign]}
            loading={horoscopeState.status === 'loading'}
            error={horoscopeState.error}
            selectedSign={selectedSign}
          />
        </View>
      </ScrollView>
      
      <FloatingActionButton onPress={() => {
        const today = format(new Date(), 'yyyy-MM-dd');
        router.push(`/journal-entry?date=${today}&isNew=true`);
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  content: {
    flex: 1,
    gap: theme.spacing.lg,
  },
});
