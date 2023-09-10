import { api } from "./api";

type Provider = "email" | "google";

export interface LoginI {
  email: string;
  password?: string;
  userFbToken: string;
  provider: Provider;
};

export interface RegisterI {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  photoURL?: string;
  userFbToken: string;
  provider: Provider;
};

export interface ResetPasswordI {
  password: string;
  oobCode: string | null;
};

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: LoginI) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      })
    }),

    register: build.mutation({
      query: (payload: RegisterI) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      })
    }),

    resetPassword: build.mutation({
      query: (payload: ResetPasswordI) => ({
        url: "auth/new-password",
        method: "POST",
        body: payload,
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useResetPasswordMutation } = authApi;

