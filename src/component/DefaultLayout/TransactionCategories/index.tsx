import React, { useEffect, useState } from "react";
import { ITransactionCategoriesModel } from "../../../models/TransactionCategories/ITransactionCategories";
import transactionCategoriesApi from "../../../apis/transactionCategoriesApi";
import { useAppDispatch } from "../../../redux/hooks";
import { selectSelectedCategories, transactionCategoriesAction } from "../../../redux/transactionCategoriesReducer";
import { useSelector } from "react-redux";

function TransactionCategories() {
  const transactionCategories = useSelector(selectSelectedCategories);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   transactionCategoriesApi.getAll({}).then((res) => {
  //     setViviData(res.data);
  //     console.log(res);
  //   });
  // }, []);
  const fetchData = async () => {
    try {
      dispatch(transactionCategoriesApi.getAll({}))
        .unwrap()
        .then((response) => {
          console.log("transactionCategories", response);
          dispatch(transactionCategoriesAction.setTransactionCategories(response.data));
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ví:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="m-4" >
      <div>
        <div className="d-flex align-items-center" style={{ fontSize: "20px", color:"#fff" }}>
          <span className="m-2">Chi tiêu hàng tháng</span>
        </div>
        {/* <hr className="text-dark d-none d-sm-block" /> */}
      </div>
      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
      {transactionCategories.map((categories, index) => (
        <div key={categories.id} className="list-group mt-2">
          <a
            href="#"
            className="list-group-item list-group-item-action"
            aria-current="true"
            style={{ fontSize: "14px" }}
          >
            <div className="d-flex align-items-center">
              <img
                src={categories.icon}
                alt="Avatar"
                className="rounded-circle m-0"
                style={{ width: "30px", height: "30px" }}
              />
              <span className="m-2" style={{ fontSize: "16px" }}>
                {categories.name}
              </span>
            </div>
          </a>
        </div>
      ))}
      </div>
      
      <hr className="text-dark d-none d-sm-block" />
    </div>
  );
}

export default TransactionCategories;
