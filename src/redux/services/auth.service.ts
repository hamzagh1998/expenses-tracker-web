import { api } from "./api";


// Create the authApi object with explicit types
const authApi: any = api.injectEndpoints({
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

  overrideExisting: false,
});

// Now you can access the mutation hooks
export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
