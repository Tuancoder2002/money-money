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
      {viviData.map((vivi, index) => (
        <ul key={vivi.id} className="list-group">
          <li className="list-group-item list-group-item-action">
            {vivi.name}
          </li>
          <li className="list-group-item list-group-item-action">
            {vivi.code}
          </li>
          <li className="list-group-item list-group-item-action">Third item</li>
        </ul>
      ))}
    </div>
  );
}

export default TransactionCategories;
