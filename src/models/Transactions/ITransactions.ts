export interface ITransactionsModel {
  id?: string;
  code?: string;
  name?: string;
  amount: number;
  transactionDate?: string;
  fromPaymentAccountId?: string;
  fromPaymentAccountName?: string;
  ategoryId?: string;
  categoryName?: string;
  description?: string;
}
