import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { ConvertObjectToFormData } from "../unils/common";
import { ITransactionsModel } from "../models/Transactions/ITransactions";

const transactionsApi = {
  getAll(data: IFilterBodyRequest): Promise<IBasePaging<ITransactionsModel>> {
    const url = "/Transactions/filter";
    return axiosClient().post(url, data);
  },
  create(data: ITransactionsModel): Promise<ITransactionsModel> {
    const url = "/Transactions";
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).post(url, formData);
  },
};

export default transactionsApi;