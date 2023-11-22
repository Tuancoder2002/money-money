
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITransactionCategoriesModel } from "../models/TransactionCategories/ITransactionCategories";
import transactionCategoriesApi from "../apis/transactionCategoriesApi";

interface TransactionCategoriesState {
  selectedCategories: ITransactionCategoriesModel[]
}

const initialState: TransactionCategoriesState = {
  selectedCategories: [],
};

const transactionCategoriesSlice = createSlice({
  name: "transactionCategories",
  initialState: initialState,
  reducers: {
    setTransactionCategories: (
      state,
      action: PayloadAction<ITransactionCategoriesModel[]>
    ) => {
      state.selectedCategories = action.payload;
    },
},
extraReducers: {
  [transactionCategoriesApi.getAll.fulfilled.type]: (state, action) => {},
},
});



export const transactionCategoriesAction = transactionCategoriesSlice.actions;

export const selectSelectedCategories = createSelector(
  [(state: RootState) => state.transactionCategories.selectedCategories],
  (selectedCategories) => selectedCategories ?? []
);
export default transactionCategoriesSlice.reducer;
