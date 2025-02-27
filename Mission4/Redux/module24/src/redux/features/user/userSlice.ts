import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store/store";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUserState {
  users: IUser[];
}

const initialState: IUserState = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "jhondoe@gmail.com",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "janedoe@gmail.com",
    },
    {
      id: "3",
      name: "John Smith",
      email: "johnsmith@gmail.com",
    },
  ],
};

type DraftUser = Pick<IUser, "name" | "email">;

const createUser = (userData: DraftUser): IUser => {
  return {
    id: nanoid(),
    ...userData,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const userData = createUser(action.payload);
      state.users.push(userData);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;

export const { addUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.users;
