// import axiosClient, { contentTypeFormData } from "./axiosClient";
// import { IBasePaging } from "../models/Bases/IBasePagination";
// import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
// import { IPaymentAccountModel } from "../models/PaymentAccounts/IPaymentAccount";
// import { ConvertObjectToFormData } from "../unils/common";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const paymentAccountApi = {
//   getAll: createAsyncThunk(
//     "paymentAccounts/filter",
//     (data: IFilterBodyRequest): Promise<IBasePaging<IPaymentAccountModel>> => {
//       const url = "/paymentAccounts/filter";
//       data.pagination = { pageSize: 1000 };
//       return axiosClient().post(url, data);
//     }
//   ),
//   create(data: IPaymentAccountModel): Promise<IPaymentAccountModel> {
//     const url = "/PaymentAccounts";
//     const formData = ConvertObjectToFormData(data, new FormData());
//     return axiosClient(contentTypeFormData).post(url, formData);
//   },
//   update(
//     id: string,
//     data: IPaymentAccountModel
//   ): Promise<IPaymentAccountModel> {
//     const url = `/PaymentAccounts/${id}`;
//     const formData = ConvertObjectToFormData(data, new FormData());
//     return axiosClient(contentTypeFormData).put(url, formData);
//   },
//   delete(id: string): Promise<void> {
//     const url = `/PaymentAccounts/${id}`;
//     return axiosClient().delete(url);
//   },
// };

// export default paymentAccountApi;
import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { IPaymentAccountModel } from "../models/PaymentAccounts/IPaymentAccount";
import { ConvertObjectToFormData } from "../unils/common";
import { createAsyncThunk } from "@reduxjs/toolkit";

const paymentAccountApi = {
  getAll: createAsyncThunk(
    "paymentAccounts/filter",
    async (data: IFilterBodyRequest): Promise<IBasePaging<IPaymentAccountModel>> => {
      const url = "/paymentAccounts/filter";
      data.pagination = { pageSize: 1000 };
      const response = await axiosClient().post<IFilterBodyRequest,IBasePaging<IPaymentAccountModel>>(url, data);
      return response;
    }
  ),
  create: createAsyncThunk(
    "paymentAccounts/create",
    async (data: IPaymentAccountModel): Promise<IPaymentAccountModel> => {
      const url = "/PaymentAccounts";
      const formData = ConvertObjectToFormData(data, new FormData());
      const response = await axiosClient(contentTypeFormData).post(url, formData);
      return response.data;
    }
  ),
  update: createAsyncThunk(
    "paymentAccounts/update",
    async ({ id, data }: { id: string, data: IPaymentAccountModel }): Promise<IPaymentAccountModel> => {
      const url = `/PaymentAccounts/${id}`;
      const formData = ConvertObjectToFormData(data, new FormData());
      const response = await axiosClient(contentTypeFormData).put(url, formData);
      return response.data;
    }
  ),
  delete: createAsyncThunk(
    "paymentAccounts/delete",
    async (id: string): Promise<void> => {
      const url = `/PaymentAccounts/${id}`;
      await axiosClient().delete(url);
    }
  ),
};

export default paymentAccountApi;
