import React, { useEffect, useState } from "react";
import Sidebar from "../../component/GlobalStyles/Sidebar";
import Header from "../../component/GlobalStyles/Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import paymentAccountApi from "../../apis/paymentAccountApi";
import { IPaymentAccountModel } from "../../models/PaymentAccounts/IPaymentAccount";

const cx = classNames.bind(styles);

function Home() {
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);

  useEffect(() => {
    paymentAccountApi.getAll({}).then((res) => {
      setViviData(res.data);
      console.log(res);
    });
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [editViviIndex, setEditViviIndex] = useState<string | null>(null);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");
  const [selectedViviName, setSelectedViviName] = useState("Ví của tôi");

  const handleDeleteVivi = (id: number) => {
    // const updatedViviData = viviData.filter((vivi) => vivi.id !== id);
    // setViviData(updatedViviData);
  };

  const handleEditVivi = (index: number) => {
    // setEditViviIndex(index);
    // setEditViviName(viviData[index].name);
    // setEditViviAmount(viviData[index].amount);
    setEditMode(true);
  };

  const handleShowNewViviFields = () => {
    setEditViviIndex(null);
    setEditViviName("");
    setEditViviAmount("");
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditViviIndex(null);
    setEditViviName("");
    setEditViviAmount("");
  };

  const handleSaveVivi = () => {
    const newPaymentAccount: IPaymentAccountModel = {
      name: editViviName,
      initialMoney: +editViviAmount,
    };

    // Gọi API để tạo tài khoản mới
    paymentAccountApi.create(newPaymentAccount)
      .then((res) => {
        // Cập nhật danh sách tài khoản và đặt lại trạng thái chỉnh sửa
        setViviData([...viviData, res]); // Thêm tài khoản mới vào danh sách
        handleCancelEdit(); // Đặt lại trạng thái chỉnh sửa
        alert("Tạo tài khoản thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi tạo tài khoản:", error);
        alert("Lỗi khi tạo tài khoản");
      });
  };

  const handleSelectVivi = (name: string) => {
    setSelectedViviName(name);
  };

  return (
    <div className={cx("app__container")}>
      <Header />
      <div className={cx("app__wrapper")}>
        <Sidebar />
        <div className="container mt-5">
          <div>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th
                        colSpan={3}
                      >{`Đang sử dụng ( ${selectedViviName} )`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>
                        {!editMode ? (
                          <button
                            className="btn btn-primary"
                            onClick={handleShowNewViviFields}
                          >
                            Thêm ví
                          </button>
                        ) : (
                          <div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Tên ví"
                                value={editViviName}
                                onChange={(e) =>
                                  setEditViviName(e.target.value)
                                }
                                style={{ width: "50%" }}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Số tiền"
                                value={editViviAmount}
                                onChange={(e) =>
                                  setEditViviAmount(e.target.value)
                                }
                                style={{ width: "50%" }}
                              />
                            </div>
                            <button
                              className="btn btn-success"
                              onClick={handleSaveVivi}
                            >
                              Lưu
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={handleCancelEdit}
                            >
                              Hủy bỏ
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    {viviData.map((vivi, index) => (
                      <tr key={vivi.id}>
                        <td>{vivi.name}</td>
                        <td>{vivi.initialMoney}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleEditVivi(index)}
                          >
                            Sửa ví
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            // onClick={() => handleDeleteVivi(vivi.id)}
                          >
                            Xoá ví
                          </button>
                          <button
                            className="btn btn-primary ms-4"
                            // onClick={() => handleSelectVivi(vivi.name)}
                          >
                            Chọn
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;