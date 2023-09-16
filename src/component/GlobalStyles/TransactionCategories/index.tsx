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
      {/* {viviData.map((vivi, index) => (
        <ul key={vivi.id} className="list-group">
          <li className="list-group-item list-group-item-action">
            {vivi.name}
          </li>
          <li className="list-group-item list-group-item-action">
            {vivi.code}
          </li>
          <li className="list-group-item list-group-item-action">Third item</li>
        </ul>
      ))} */}
      {viviData.map((vivi, index) => (
        <div key={vivi.id}>
          <div>
            <div
              className="d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              
              <span className="m-0 mr-auto">Chi tiêu hàng tháng</span>
            </div>
            <hr className="text-dark d-none d-sm-block" />
          </div>
          <div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
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
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/ic_category_transport.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    {vivi.name}
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_136.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    {vivi.name}
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_125.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_124.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn nước
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_134.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện thoại
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_139.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn gas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_84.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn TV
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_126.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn internet
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_138.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn tiện ích khác
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <hr className="text-dark d-none d-sm-block" />

            <div
              className="d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              <span className="m-0 mr-auto">Chi tiêu cần thiết</span>
            </div>

            <hr className="text-dark d-none d-sm-block" />
          </div>

          <div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
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
                    Ăn uống
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/ic_category_transport.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Di chuyển
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_136.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Thuê nhà
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_125.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_124.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn nước
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_134.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện thoại
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_139.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn gas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_84.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn TV
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_126.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn internet
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_138.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn tiện ích khác
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <hr className="text-dark d-none d-sm-block" />

            <div
              className="d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              <span className="m-0 mr-auto">Chi tiêu cần thiết</span>
            </div>

            <hr className="text-dark d-none d-sm-block" />
          </div>

          <div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
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
                    Ăn uống
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/ic_category_transport.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Di chuyển
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_136.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Thuê nhà
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_125.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_124.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn nước
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_134.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện thoại
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_139.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn gas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_84.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn TV
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_126.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn internet
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_138.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn tiện ích khác
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div>
            <hr className="text-dark d-none d-sm-block" />

            <div
              className="d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              <span className="m-0 mr-auto">Chi tiêu cần thiết</span>
            </div>

            <hr className="text-dark d-none d-sm-block" />
          </div>

          <div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
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
                    Ăn uống
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/ic_category_transport.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Di chuyển
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_136.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Thuê nhà
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_125.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_124.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn nước
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_134.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện thoại
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_139.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn gas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_84.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn TV
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_126.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn internet
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_138.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn tiện ích khác
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div>
            <hr className="text-dark d-none d-sm-block" />

            <div
              className="d-flex align-items-center"
              style={{ fontSize: "12px" }}
            >
              <span className="m-0 mr-auto">Chi tiêu cần thiết</span>
            </div>

            <hr className="text-dark d-none d-sm-block" />
          </div>

          <div>
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action active"
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
                    Ăn uống
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/ic_category_transport.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Di chuyển
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_136.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Thuê nhà
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_125.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_124.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn nước
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_134.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn điện thoại
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_139.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn gas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_84.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn TV
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_126.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn internet
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://static.moneylover.me/img/icon/icon_138.png"
                    alt="Avatar"
                    className="rounded-circle m-0"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span className="m-2" style={{ fontSize: "16px" }}>
                    Hoá đơn tiện ích khác
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionCategories;
