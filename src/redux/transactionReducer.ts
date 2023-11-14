import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITransactionsModel } from "../models/Transactions/ITransactions";
import transactionsApi from "../apis/transactionsApi";
interface MoneyMonth {
  in: number;
  out: number;
}
interface TransactionState {
  totalMoney: number;
  moneyLastMonth: MoneyMonth;
  moneyNowMonth: MoneyMonth;
  transactions: ITransactionsModel[];
}

const initialState: TransactionState = {
  totalMoney: 0,
  moneyLastMonth: {
    in: 0,
    out: 0,
  },
  moneyNowMonth: {
    in: 0,
    out: 0,
  },
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState: initialState,
  reducers: {
    setTotalMoney: (state, action: PayloadAction<number>) => {
      state.totalMoney = action.payload;
    },
    setMoneyNowMonth: (state, action: PayloadAction<MoneyMonth>) => {
      state.moneyNowMonth = action.payload;
    },
    setMoneyLastMonth: (state, action: PayloadAction<MoneyMonth>) => {
      state.moneyLastMonth = action.payload;
    },
    setTransactions: (state, action: PayloadAction<ITransactionsModel[]>) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: {
    [transactionsApi.getAll.fulfilled.type]: (state, action) => {},
  },
});
// Actions
export const transactionActions = transactionSlice.actions;

export const selectTotalMoney = createSelector(
  [(state: RootState) => state.transaction.totalMoney],
  (totalMoney) => totalMoney
);
export const selectMoneyLastMonth = createSelector(
  [(state: RootState) => state.transaction.moneyLastMonth],
  (moneyLastMonth) => moneyLastMonth
);
export const selectMoneyNowMonth = createSelector(
  [(state: RootState) => state.transaction.moneyNowMonth],
  (moneyNowMonth) => moneyNowMonth
);
export const selectTransactions = createSelector(
  [(state: RootState) => state.transaction.transactions],
  (transactions) => transactions
);

export default transactionSlice.reducer;
