import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import transactionsApi from "../../../apis/transactionsApi";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import { toast } from "react-toastify";

function AddTransaction({
  handleAddTransaction,
}: {
  handleAddTransaction: (formData: ITransactionsModel) => void;
}) {
  const [formData, setFormData] = useState<ITransactionsModel>({
    fromPaymentAccountId: "",
    fromPaymentAccountName: "",
    categoryName: "",
    amount: "",
    transactionDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveTransaction = () => {
    // Gọi API để thêm giao dịch mới
    transactionsApi
      .create(formData)
      .then((response) => {
        // Sau khi thêm giao dịch thành công, có thể xóa dữ liệu trong mẫu hoặc thực hiện các xử lý khác (nếu cần)
        toast.success("Giao dịch đã được tạo thành công!");

        // Gọi hàm xử lý thêm giao dịch
        handleAddTransaction(formData);

        // Sau khi xử lý xong, reset form
        setFormData({
          fromPaymentAccountId: "",
          fromPaymentAccountName: "",
          categoryName: "",
          amount: "",
          transactionDate: "",
        });
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        toast.error("Đã xảy ra lỗi khi tạo giao dịch!");
      });
  };

  return (
    <div>
      {/* <div className="d-flex justify-content-around align-items-center">
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Ví</option>

          <option value="1"></option>
        </Form.Select>
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Nhóm</option>

          <option value="1"></option>
        </Form.Select>
        <Form.Control
          type="number"
          placeholder="Số tiền"
          size="lg"
          className="m-2"
        />
      </div>

      <div className="d-flex justify-content-around align-items-center">
        <Form.Control
          name="amount"
          type="number"
          value={formData.amount}
          placeholder="Số tiền"
          size="lg"
          className="m-2"
          onChange={handleInputChange}
        />
        <Form.Control as="textarea" rows={3} placeholder="Ghi chú" />
      </div> */}
    </div>
  );
}

export default AddTransaction;
