import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '2aad956bd7mshf3c03494e38d1d6p1e20c8jsn4f46f729500d',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk';

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
      query: () => createRequest(),
    }),
  }),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;
