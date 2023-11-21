import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITransactionsModel } from "../models/Transactions/ITransactions";
import transactionsApi from "../apis/transactionsApi";
import { toast } from "react-toastify";
interface MoneyMonth {
  in: number;
  out: number;
}
interface TransactionState {
  totalMoney: number;
  moneyLastMonth: MoneyMonth;
  moneyNowMonth: MoneyMonth;
  transactions: ITransactionsModel[];
  isShowModal?: boolean;
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
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload;
    },
  },
  extraReducers: {
    [transactionsApi.getAll.fulfilled.type]: (state, action) => {},
    [transactionsApi.create.pending.type]: (state, action) => {
      // show loading
    
    },
    [transactionsApi.create.fulfilled.type]: (
      state,
      action: PayloadAction<ITransactionsModel>
    ) => {
      let responseData = action.payload;
      if (responseData.id != null) {
        toast.success("Thêm giao dịch thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Có lỗi khi thêm giao dịch 1", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // xử lý show hide modal
    },
    [transactionsApi.create.rejected.type]: (state, action) => {
      console.error("Error when creating a transaction", action);
      toast.error("Có lỗi khi thêm giao dịch", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
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
