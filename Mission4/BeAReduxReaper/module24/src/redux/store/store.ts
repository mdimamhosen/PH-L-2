import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "../api/baseAPI";

export const reduxStore = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
