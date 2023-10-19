import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_NEWS_RAPIDAPI_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_API_NEWS_RAPIDAPI_HOST,
};

const baseUrl = import.meta.env.VITE_API_NEWS_API_URL;

const createRequest = (url) => ({
  url,
  method: 'GET',
  headers: cryptoApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
