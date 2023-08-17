import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./api";

// Define your mutation endpoints here
export const authApi = createApi({
  baseQuery: baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    register: build.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

