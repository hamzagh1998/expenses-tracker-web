import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { createApi } from "@reduxjs/toolkit/dist/query";


export const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the RootState
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", "Bearer " + token);
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

// Create the API
export const api = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: build => ({}), // Add your endpoints here
});
