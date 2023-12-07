import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { ConvertObjectToFormData } from "../unils/common";
import { ITransactionCategoriesModel } from "../models/TransactionCategories/ITransactionCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";

const transactionCategoriesApi = {
  getAll: createAsyncThunk(
    "paymentAccounts/filter",
    (data: IFilterBodyRequest): Promise<IBasePaging<ITransactionCategoriesModel>> => {
      const url = "/TransactionCategories/filter";
      data.pagination = { pageSize: 1000 };
      return axiosClient().post(url, data);
    }
  ),/*  */
  create: createAsyncThunk(
    "transactions/create",
    async (request: ITransactionCategoriesModel): Promise<ITransactionCategoriesModel> => {
      const url = "/TransactionCategories";
      const formData = ConvertObjectToFormData(request, new FormData());
      const response = await axiosClient(contentTypeFormData).post<
        FormData,
        ITransactionCategoriesModel
      >(url, formData);
      return response; // Trả về dữ liệu từ phản hồi
    }
  ),
};

export default transactionCategoriesApi;
