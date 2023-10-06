import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import transactionsApi from "../../../apis/transactionsApi";

function AddTransaction() {
  const [viviData, setViviData] = useState<ITransactionsModel[]>([]);

  useEffect(() => {
    transactionsApi.getAll({}).then((res) => {
      setViviData(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Ví</option>
          {viviData.map((vivi, index) => (
            <option key={vivi.id} value="1">
              {vivi.fromPaymentAccountName}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Nhóm</option>
          {viviData.map((vivi, index) => (
            <option key={vivi.id} value="1">
              {vivi.categoryName}
            </option>
          ))}
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
          type="date"
          placeholder="Số tiền"
          size="lg"
          className="m-2"
        />
        <Form.Control as="textarea" rows={3} placeholder="Ghi chú" />
      </div>
    </div>
  );
}

export default AddTransaction;
