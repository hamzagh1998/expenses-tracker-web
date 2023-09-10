import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface State {
  userData: null | object;
  fbToken: null | string;
  token: null | string;
};

const initialState: State = {
  userData: null,
  fbToken: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, {payload: {userData, fbToken, token}}: PayloadAction<State>) => {
      state.userData = userData;
      state.fbToken = fbToken;
      state.token = token;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUserData } = authSlice.actions;

export default authSlice;

