import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { selectSelectedSign, setSelectedSign } from '../store/journalSlice';
import { ZODIAC_SIGNS } from '../utils/constants';
import { globalStyles, theme } from '../utils/theme';
import CustomCard from './CustomCard';

export const ZodiacSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSign = useSelector(selectSelectedSign);

  return (
    <CustomCard style={styles.container}>
      <Text style={[globalStyles.headingText, styles.title]}>Select Your Sign</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSign}
          onValueChange={(value) => dispatch(setSelectedSign(value))}
          style={styles.picker}
          dropdownIconColor={theme.colors.ACCENT_COLOR}
          itemStyle={styles.pickerItem}
        >
          {ZODIAC_SIGNS.map((sign) => (
            <Picker.Item
              key={sign.value}
              label={`${sign.symbol} ${sign.label}`}
              value={sign.value}
              color={theme.colors.PRIMARY_TEXT}
              style={styles.pickerItemText}
            />
          ))}
        </Picker>
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: theme.colors.PRIMARY_BACKGROUND,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  picker: {
    color: theme.colors.PRIMARY_TEXT,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    color: theme.colors.PRIMARY_TEXT,
    backgroundColor: theme.colors.CARD_BACKGROUND,
  },
  pickerItemText: {
    color: 'black',
    fontSize: theme.fontSize.md,
    fontWeight: '500',
  },
});
