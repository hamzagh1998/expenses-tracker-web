import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../feature/auth/slices/auth.slice";
import { api } from "./services/api";


export interface RootState {
  auth: {
    userData: null | object;
    fbToken: null | string;
    token: null | string;
  };
};

export const store = configureStore({
  reducer: { 
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = RootState;
