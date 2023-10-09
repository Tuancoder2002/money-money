import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import authApi from '../apis/authApi';
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: ''
}

const authSlice = createSlice({
  name: "authSlicer",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
    }
  },
  extraReducers: {
    [authApi.login.pending.type]: (state, action) => {
      state.isAuthenticated = false;
    },
    [authApi.login.fulfilled.type]: (state, action) => {
      localStorage.setItem('access_token', action.payload);
      console.log('success', action);
      state.isAuthenticated = true;
    },
    [authApi.login.rejected.type]: (state, action) => {
      state.isAuthenticated = false;
    }
  }
})

export default authSlice.reducer;