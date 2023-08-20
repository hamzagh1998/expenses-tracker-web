import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./api";

interface LoginI {
  email: string;
  password: string;
  userFbToken: string;
};

interface RegisterI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userFbToken: string;
};

export const authApi = createApi({
  baseQuery: baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: LoginI) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    register: build.mutation({
      query: (payload: RegisterI) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

