import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../api/baseAPI";
import authReducer from "../feature/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RooState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
