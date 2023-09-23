import React, { useEffect, useState } from "react";
import { ITransactionCategoriesModel } from "../../../models/TransactionCategories/ITransactionCategories";
import transactionCategoriesApi from "../../../apis/transactionCategoriesApi";

function TransactionCategories() {
  const [viviData, setViviData] = useState<ITransactionCategoriesModel[]>([]);

  useEffect(() => {
    transactionCategoriesApi.getAll({}).then((res) => {
      setViviData(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex align-items-center" style={{ fontSize: "12px" }}>
          <span className="m-0 mr-auto">Chi tiêu hàng tháng</span>
        </div>
        <hr className="text-dark d-none d-sm-block" />
      </div>
      {viviData.map((vivi, index) => (
        <div key={vivi.id} className="list-group">
          <a
            href="#"
            className="list-group-item list-group-item-action"
            aria-current="true"
            style={{ fontSize: "14px" }}
          >
            <div className="d-flex align-items-center">
              <img
                src="https://static.moneylover.me/img/icon/ic_category_foodndrink.png"
                alt="Avatar"
                className="rounded-circle m-0"
                style={{ width: "30px", height: "30px" }}
              />
              <span className="m-2" style={{ fontSize: "16px" }}>
                {vivi.name}
              </span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default TransactionCategories;
