import { configureStore } from '@reduxjs/toolkit';
import { default as authSlice } from './authReducer';
import { default as userSlice } from './userReducer';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
