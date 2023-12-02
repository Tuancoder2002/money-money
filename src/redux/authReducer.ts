import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authApi from "../apis/authApi";
import { RootState } from "./store";
import { IRegisterRequest } from "../models/Auths";
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user: UserInfo | null;
  inforUser?: IRegisterRequest;
}
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
};
interface UserInfo {
  name: string;
  email: string;
}

const authSlice = createSlice({
  name: "authSlicer",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
    },
    logout: () => {
      localStorage.clear();
    },
    getInforUser: (
      state,
      action: PayloadAction<IRegisterRequest>
    ) => {
      state.inforUser = action.payload
    }
  },
  extraReducers: {
    [authApi.login.pending.type]: (state, action) => {
      state.isAuthenticated = false;
    },
    [authApi.login.fulfilled.type]: (state, action) => {
      localStorage.setItem("access_token", action.payload);
      console.log("success", action);
      state.isAuthenticated = true;
      toast.success("Đăng nhập thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [authApi.login.rejected.type]: (state, action) => {
      state.isAuthenticated = false;
      toast.error("Email hoặc mật khẩu không đúng!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [authApi.register.pending.type]: (state, action) => {},
    [authApi.register.fulfilled.type]: (state, action) => {
      toast.success("Đăng ký thành công. Đăng nhập ngay!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    [authApi.register.rejected.type]: (state, action) => {
      toast.error("Đăng ký thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  },
});
// Actions
export const authActions = authSlice.actions;

export const selectUser = createSelector(
  [(state: RootState) => state.auth.user],
  (user) => user
);

export const selectisAuthenticated = createSelector(
  [(state: RootState) => state.auth.isAuthenticated],
  (isAuthenticated) => isAuthenticated
);

export const getInforUsers = createSelector(
  [(state: RootState) => state.auth.inforUser],
  (inforUser) => inforUser
);


export default authSlice.reducer;
