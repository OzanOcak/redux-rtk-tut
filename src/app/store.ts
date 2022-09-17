import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter-slice';
import { apiSlice } from '../features/dogs/dogs-api-slice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },// this middleware allow cashing data, so we don't need to fetch everytime
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;