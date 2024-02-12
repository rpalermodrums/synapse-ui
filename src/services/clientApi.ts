import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (clientData) => ({
        url: '/clients',
        method: 'POST',
        body: clientData,
      }),
    }),
    // Add other endpoints as needed
  }),
});

export const { useAddClientMutation } = clientApi;
