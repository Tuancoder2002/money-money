import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { ConvertObjectToFormData } from "../unils/common";
import { ITransactionsModel } from "../models/Transactions/ITransactions";
import { createAsyncThunk } from "@reduxjs/toolkit";

const transactionsApi = {
  // getAll: createAsyncThunk(
  //   "transactions/filter",
  //   async (
  //     data?: IFilterBodyRequest
  //   ): Promise<IBasePaging<ITransactionsModel>> => {
  //     const url = "/Transactions/filter";
  //     return await axiosClient().post(url, data);
  //   }
  // ),
  getAll: createAsyncThunk(
    "transactions/filter",
    (data: IFilterBodyRequest): Promise<IBasePaging<ITransactionsModel>> => {
      const url = "/Transactions/filter";
      data.pagination = { pageSize: 1000 };
      return axiosClient().post(url, data);
    }
  ),

  create: createAsyncThunk(
    "transactions/create",
    async (request: ITransactionsModel): Promise<ITransactionsModel> => {
      const url = "/Transactions";
      const formData = ConvertObjectToFormData(request, new FormData());
      const response = await axiosClient(contentTypeFormData).post<
        FormData,
        ITransactionsModel
      >(url, formData);
      return response; // Trả về dữ liệu từ phản hồi
    }
  ),
  update: createAsyncThunk(
    "transactions/update",
    async ({
      id,
      data,
    }: {
      id: string;
      data: ITransactionsModel;
    }): Promise<ITransactionsModel> => {
      const url = `/Transactions/${id}`;
      const formData = ConvertObjectToFormData(data, new FormData());
      const response = await axiosClient(contentTypeFormData).put(
        url,
        formData
      );
      return response.data; // Trả về dữ liệu từ phản hồi
    }
  ),
};

export default transactionsApi;
