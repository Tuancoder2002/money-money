import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { ConvertObjectToFormData } from "../unils/common";
import { ITransactionsModel } from "../models/Transactions/ITransactions";
import { createAsyncThunk } from "@reduxjs/toolkit";

const transactionsApi = {
  getAll: createAsyncThunk(
    "transactions/filter",
    async (
      data?: IFilterBodyRequest
    ): Promise<IBasePaging<ITransactionsModel>> => {
      const url = "/Transactions/filter";
      return await axiosClient().post(url, data);
    }
  ),
  create(data: ITransactionsModel): Promise<ITransactionsModel> {
    const url = "/Transactions";
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).post(url, formData);
  },
  update(id: string, data: ITransactionsModel): Promise<ITransactionsModel> {
    const url = `/Transactions/${id}`;
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).put(url, formData);
  },
};

export default transactionsApi;
