import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const createRequest = (url) => ({ url });

export const exchangesApi = createApi({
  reducerPath: 'exchangesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_EXCHANGES_API_URL,
  }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => createRequest(),
    }),
  }),
});

export const { useGetExchangesQuery } = exchangesApi;
