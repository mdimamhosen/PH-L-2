import { configureStore } from "@reduxjs/toolkit";
import logger from "../middlewares/logger";

export const reduxStore = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
