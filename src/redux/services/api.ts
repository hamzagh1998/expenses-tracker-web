import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi } from "@reduxjs/toolkit/query/react"; // Make sure to import BaseQueryApi
import { RootState } from "../store";
import { createApi } from "@reduxjs/toolkit/dist/query";

// Define prepareHeaders function
const prepareHeaders = (headers: Headers, api: Pick<BaseQueryApi, "getState">) => {
  const token = (api.getState() as RootState).auth.token;
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

// Create the API
export const api = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: build => ({}), // Add your endpoints here
});

