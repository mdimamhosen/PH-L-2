import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "../features/task/taskSlice";

export const reduxStore = configureStore({
  reducer: {
    todos: taskReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
