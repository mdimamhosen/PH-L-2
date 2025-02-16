import { createSlice } from "@reduxjs/toolkit";
import { RooState } from "../../store/store";

type TAuthState = {
  user: null | IUSer;
  token: null | string;
};

export interface IUSer {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const initialState: TAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RooState) => state.auth.token;
export const selectCurrentUser = (state: RooState) => state.auth.user;
