import React, { useEffect, useState } from "react";
import Sidebar from "../../component/GlobalStyles/Sidebar";
import Header from "../../component/GlobalStyles/Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import paymentAccountApi from "../../apis/paymentAccountApi";
import { IPaymentAccountModel } from "../../models/PaymentAccounts/IPaymentAccount";
import { Modal, Button } from "react-bootstrap";


const cx = classNames.bind(styles);

function Home() {
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editViviIndex, setEditViviIndex] = useState<number | null>(null);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    paymentAccountApi.getAll({}).then((res) => {
      setViviData(res.data);
      console.log(res);
    });
  }, []);

  const handleEditVivi = (index: number) => {
    setEditViviIndex(index);
    const accountToEdit = viviData[index];

    if (accountToEdit) {
      setEditViviName(accountToEdit.name || "");
      setEditViviAmount(accountToEdit.initialMoney?.toString() || "");
      setEditMode(true);
    }
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

    if (editMode && editViviIndex !== null) {
      const accountId = viviData[editViviIndex]?.id;
      if (accountId) {
        const updatedViviData = [...viviData];
        updatedViviData[editViviIndex] = {
          ...updatedViviData[editViviIndex], // Giữ lại thông tin của tài khoản cũ
          name: editViviName,
          initialMoney: +editViviAmount,
        };
    
        // Chuyển đổi accountId thành kiểu số
        const accountIdNumber = parseInt(accountId, 10); // 10 là cơ số
    
        paymentAccountApi
          .update(accountIdNumber, updatedViviData[editViviIndex])
          .then(() => {
            setViviData(updatedViviData);
            handleCancelEdit();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật tài khoản:", error);
            alert("Lỗi khi cập nhật tài khoản");
          });
      }
    } else {
      // Gọi API để tạo tài khoản mới
      paymentAccountApi
        .create(newPaymentAccount)
        .then((res) => {
          setViviData([...viviData, res]); // Thêm tài khoản mới vào danh sách
          handleCancelEdit(); // Đặt lại trạng thái chỉnh sửa
          alert("Tạo tài khoản thành công");
        })
        .catch((error) => {
          console.error("Lỗi khi tạo tài khoản:", error);
          alert("Lỗi khi tạo tài khoản");
        });
    }
  };

  const handleDeleteVivi = (index: number) => {
    const accountId = viviData[index]?.id;
  
    if (accountId) {
      const accountIdNumber = parseInt(accountId, 10); // Parse the accountId to a number
      
      // Make an API call to delete the payment account on the server side
      paymentAccountApi
        .delete(accountIdNumber) // Use the parsed accountIdNumber
        .then(() => {
          // If the delete request is successful, update the viviData state
          const updatedViviData = viviData.filter((_, i) => i !== index);
          setViviData(updatedViviData);
          alert("Xoá ví thành công");
        })
        .catch((error) => {
          console.error("Lỗi khi xoá ví:", error); // Log the error to the console
          alert("Lỗi khi xoá ví: " + error.message); // Show an alert with the error message
        });
    }
  };
  
  
  
  

  return (
    <div className={cx("app__container")}>
      <Header />
      <div className={cx("app__wrapper")}>
        <Sidebar />
        
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>PaymentAccounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container mt-5">
          <div>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th colSpan={3}>Đang sử dụng</th>
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
                            onClick={() => handleDeleteVivi(index)}
                          >
                            Xoá ví
                          </button>
                          <button
                            className="btn btn-primary ms-4"
                            onClick={handleOpenModal}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
