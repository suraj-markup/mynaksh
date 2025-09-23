import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchHoroscope, HoroscopeData } from '../services/horoscopeService';

interface HoroscopeState {
  data: Record<string, HoroscopeData & { fetchedAt: string }>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Async thunk for fetching horoscope data
export const fetchHoroscopeData = createAsyncThunk<
  { sign: string; data: HoroscopeData },
  string,
  { rejectValue: string }
>(
  'horoscope/fetchHoroscope',
  async (sign: string, { rejectWithValue }) => {
    try {
      const data = await fetchHoroscope(sign);
      return { sign, data };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: HoroscopeState = {
  data: {},
  status: 'idle',
  error: null,
};

const horoscopeSlice = createSlice({
  name: 'horoscope',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoroscopeData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHoroscopeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { sign, data } = action.payload;
        state.data[sign] = {
          ...data,
          fetchedAt: new Date().toISOString(),
        };
      })
      .addCase(fetchHoroscopeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { clearError } = horoscopeSlice.actions;
export default horoscopeSlice.reducer;
