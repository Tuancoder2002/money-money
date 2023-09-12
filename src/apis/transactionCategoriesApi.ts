import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { ConvertObjectToFormData } from "../unils/common";
import { ITransactionCategoriesModel } from "../models/TransactionCategories/ITransactionCategories";

const transactionCategoriesApi = {
  getAll(data: IFilterBodyRequest): Promise<IBasePaging<ITransactionCategoriesModel>> {
    const url = "/TransactionCategories/filter";
    return axiosClient().post(url, data);
  },
  create(data: ITransactionCategoriesModel): Promise<ITransactionCategoriesModel> {
    const url = "/TransactionCategories";
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).post(url, formData);
  },
};

export default transactionCategoriesApi;
