import axiosClient, { contentTypeFormData } from "./axiosClient";
import { IBasePaging } from "../models/Bases/IBasePagination";
import { IFilterBodyRequest } from "../models/Bases/IFilterBodyRequest";
import { IPaymentAccountModel } from "../models/PaymentAccounts/IPaymentAccount";
import { ConvertObjectToFormData } from "../unils/common";

const paymentAccountApi = {
  getAll(data: IFilterBodyRequest): Promise<IBasePaging<IPaymentAccountModel>> {
    const url = "/paymentAccounts/filter";
    return axiosClient().post(url, data);
  },
  create(data: IPaymentAccountModel): Promise<IPaymentAccountModel> {
    const url = "/PaymentAccounts";
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).post(url, formData);
  },
  update(data: IPaymentAccountModel): Promise<IPaymentAccountModel> {
    const url = `/PaymentAccounts/${data.id}`;
    const formData = ConvertObjectToFormData(data, new FormData());
    return axiosClient(contentTypeFormData).put(url, formData);
  },
};

export default paymentAccountApi;
