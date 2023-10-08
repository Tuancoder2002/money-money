import { configureStore } from '@reduxjs/toolkit';
import { default as authSlice } from './authReducer';

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
