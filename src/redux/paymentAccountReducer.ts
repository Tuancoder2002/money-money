import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IPaymentAccountView } from "../models/PaymentAccounts/IPaymentAccountView";
interface PaymentAccountState {
  paymentAccounts: IPaymentAccountView[];
}

const initialState: PaymentAccountState = {
  paymentAccounts: [],
};

const paymentAccountSlice = createSlice({
  name: "paymentaccountSlice",
  initialState: initialState,
  reducers: {
    setPaymentAccountViews: (
      state,
      action: PayloadAction<IPaymentAccountView[]>
    ) => {
      console.log("setPaymentAccountViews", action.payload);
      state.paymentAccounts = action.payload;
    },
    setOrUpdatePaymentAccountView: (
      state,
      action: PayloadAction<IPaymentAccountView>
    ) => {
      let currentPaymentAccounts = state.paymentAccounts;
      var i = currentPaymentAccounts.findIndex(
        (e) => e.id === action.payload.id
      );
      if (i < 0) {
        currentPaymentAccounts.push(action.payload);
      } else {
        currentPaymentAccounts[i] = action.payload;
      }
      state.paymentAccounts = currentPaymentAccounts;
    },
  },
});
// Actions
export const paymentAccountActions = paymentAccountSlice.actions;

export const selectPaymentAccountViews = createSelector(
  [(state: RootState) => state.paymentAccountView.paymentAccounts],
  (paymentaccounts) => paymentaccounts
);

export default paymentAccountSlice.reducer;
