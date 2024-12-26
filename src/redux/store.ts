import { configureStore } from '@reduxjs/toolkit';
import preferenceReducer from './features/preferenceSlice';
import { newsApi } from './api/newsApi';  // Assuming this is where your API slice is defined

export const store = configureStore({
  reducer: {
    preference: preferenceReducer,
    [newsApi.reducerPath]: newsApi.reducer,  // Add the newsApi reducer here
  },
  // Add the middleware for the RTK query to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),  // Add the middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
