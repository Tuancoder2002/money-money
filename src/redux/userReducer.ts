// userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  // Trạng thái và actions cho chức năng quản lý người dùng
  users: User[]; // Ví dụ, mảng chứa thông tin người dùng
}

interface User {
  id: string;
  name: string;
  // Thêm các thuộc tính khác nếu cần
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    // Thêm các actions khác nếu cần
  },
});

export const userActions = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
