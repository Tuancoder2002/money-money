// listUserSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { IPaymentAccountModel } from '../models/PaymentAccounts/IPaymentAccount';

interface ListUserState {
  selectedVivi: IPaymentAccountModel | null;
}

const initialState: ListUserState = {
  selectedVivi: null,
};

const listUserSlice = createSlice({
  name: 'listUser',
  initialState,
  reducers: {
    setSelectedVivi: (state, action) => {
      state.selectedVivi = action.payload;
    },
    
  },
});

export const { setSelectedVivi } = listUserSlice.actions;
export default listUserSlice.reducer;
