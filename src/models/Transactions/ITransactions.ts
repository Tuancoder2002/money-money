export interface ITransactionsModel {
  id?: string;
  code?: string;
  name?: string;
  amount: number;
  transactionDate?: string;
  fromPaymentAccountId?: string;
  fromPaymentAccountName?: string;
  categoryId?: string;
  categoryName?: string;
  description?: string;
}
