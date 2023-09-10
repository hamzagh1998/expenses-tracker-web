import { createApi, fetchBaseQuery, retry, BaseQueryApi } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

// Define prepareHeaders function
const prepareHeaders = (headers: Headers, api: Pick<BaseQueryApi, "getState">) => {
  const token = (api.getState() as RootState).auth.token;
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  };
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:4000/api/",
  prepareHeaders,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

// Create the API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  endpoints: build => ({}), // Add your endpoints here
});



