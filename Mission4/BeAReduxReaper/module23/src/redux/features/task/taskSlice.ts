import { RootState } from "@/redux/store/store";
import { ITask } from "@/types/taskType";
import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: IInitialState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2021-12-31",
      isComplete: false,
      priority: "low",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      dueDate: "2021-12-31",
      isComplete: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      dueDate: "2021-12-31",
      isComplete: false,
      priority: "high",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = action.payload;
    },
    removeTask: (state, action) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export default taskSlice.reducer;

export const selectTasks = (state: RootState) => {
  return state.todos.tasks;
};

export const selectFilter = (state: RootState) => {
  return state.todos.filter;
};

export const { addTask, removeTask, updateTask } = taskSlice.actions;
