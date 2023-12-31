// listUserSlice.ts
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { IPaymentAccountModel } from "../models/PaymentAccounts/IPaymentAccount";
import { RootState } from "./store";
import { IPaymentAccountView } from "../models/PaymentAccounts/IPaymentAccountView";

interface ListUserState {
  selectedVivi: IPaymentAccountView | null;
}

const initialState: ListUserState = {
  selectedVivi: null,
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {
    setSelectedVivi: (state, action) => {
      state.selectedVivi = action.payload;
    },
  },
});

export const selectSelectedViviId = createSelector(
  [(state: RootState) => state.listUser.selectedVivi?.id],
  (id) => id
);

export const selectSelectedVivi = createSelector(
  [(state: RootState) => state.listUser.selectedVivi],
  (selectedVivi) => selectedVivi
);

export const { setSelectedVivi } = listUserSlice.actions;
export default listUserSlice.reducer;
