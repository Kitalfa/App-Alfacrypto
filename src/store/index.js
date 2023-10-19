import { configureStore } from '@reduxjs/toolkit';
// import Reducer from './TaskSlice';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { exchangesApi } from '../services/exchangesApi';
const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [exchangesApi.reducerPath]: exchangesApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
      exchangesApi.middleware
    ),
});
export default store;
