import { IPaymentAccountModel } from "./IPaymentAccount";

export interface IPaymentAccountView extends IPaymentAccountModel {
  currentMoney?: number;
}
