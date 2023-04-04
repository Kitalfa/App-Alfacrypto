import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'https://coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '46a1930555msh40811054868aa91p1405dejsn90070fa8c219',
};

// const baseUrl = 'coinranking1.p.rapidapi.com';
// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// export const cryptoApi = createApi({
//   reducerPath: 'cryptoApi',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: () => createRequest(`${baseUrl}/coins`),
//     }),
//   }),
// });

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`${baseUrl}/coins`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'X-RapidAPI-Key': '46a1930555msh40811054868aa91p1405dejsn90070fa8c219',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
