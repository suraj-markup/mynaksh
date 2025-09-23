import { configureStore } from '@reduxjs/toolkit';
import horoscopeReducer from './horoscopeSlice';
import journalReducer from './journalSlice';

export const store = configureStore({
  reducer: {
    horoscope: horoscopeReducer,
    journal: journalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
