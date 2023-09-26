import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Wallet2 } from "react-bootstrap-icons";
import { NavbarBrand } from "reactstrap";

function ListWalletsUser() {
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [editMode, setEditMode] = useState(false); // Trạng thái chỉnh sửa
  const [editViviIndex, setEditViviIndex] = useState<number | null>(null);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");
  const [newViviName, setNewViviName] = useState(""); // Tên mới của ví
  const [newViviAmount, setNewViviAmount] = useState(""); // Số tiền ban đầu mới của ví
  const [showModalAddWallet, setShowModalAddWallet] = useState(false);
  const [selectedVivi, setSelectedVivi] = useState<IPaymentAccountModel | null>(null);
  const [showViviDetails, setShowViviDetails] = useState(false);


  const handleShowDetails = (index: number) => {
    const selectedAccount = viviData[index];
    setSelectedVivi(selectedAccount);
    setShowViviDetails(true);
  };
  

  useEffect(() => {
    paymentAccountApi.getAll({}).then((res) => {
      setViviData(res.data);
    });
  }, []);

  const handleOpenModalAddWallet = () => {
    setShowModalAddWallet(true);
  };

  const handleEditVivi = (index: number) => {
    setEditViviIndex(index);
    const accountToEdit = viviData[index];

    if (accountToEdit) {
      setEditViviName(accountToEdit.name || "");
      setEditViviAmount(accountToEdit.initialMoney?.toString() || "");
      setEditMode(true); // Bật chế độ chỉnh sửa
    }
  };

  const handleShowNewViviFields = () => {
    setEditViviIndex(null);
    setEditViviName("");
    setEditViviAmount("");
    setNewViviName(""); // Đặt lại tên mới của ví
    setNewViviAmount(""); // Đặt lại số tiền ban đầu mới của ví
    setEditMode(true); // Bật chế độ chỉnh sửa
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Tắt chế độ chỉnh sửa
    setEditViviIndex(null);
    setEditViviName("");
    setEditViviAmount("");
    setNewViviName(""); // Đặt lại tên mới của ví
    setNewViviAmount(""); // Đặt lại số tiền ban đầu mới của ví
  };

  const handleSaveVivi = () => {
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

        paymentAccountApi
          .update(accountId, updatedViviData[editViviIndex])
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
      const newPaymentAccount: IPaymentAccountModel = {
        name: newViviName, // Sử dụng tên mới của ví
        initialMoney: +newViviAmount, // Sử dụng số tiền ban đầu mới của ví
      };

      paymentAccountApi
        .create(newPaymentAccount)
        .then((res) => {
          if (res.id == null) {
            // thông báo lỗi create failed
            return;
          }
          paymentAccountApi.getAll({}).then((resPaymentAccounts) => {
            setViviData(resPaymentAccounts.data);
          });
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
    paymentAccountApi
      .delete(accountId ?? "")
      .then((res) => {
        paymentAccountApi.getAll({}).then((resPaymentAccounts) => {
          setViviData(resPaymentAccounts.data);
        });
        alert("Đã xoá tk thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi xoá tài khoản:", error);
        alert("Lỗi khi xoá tài khoản");
      });
  };

  return (
    <div className="d-flex justify-content-evenly">
      <div
        className="rounded-1"
        style={{ backgroundColor: "#ffffff", height: "100%" }}
      >
        <div className="m-4" style={{ minWidth: "400px" }}>
          <div className="d-flex align-items-center">
            <span className="mr-auto text-secondary">Số ví hiện có</span>
          </div>
          <hr className="text-dark d-none d-sm-block" />

          {viviData.map((vivi, index) => (
            <div
              key={vivi.id}
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center m-2">
                <img
                  src={vivi.icon}
                  alt="Avatar"
                  className="rounded-circle m-2"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="d-flex flex-column m-0">
                  {editMode && editViviIndex === index ? (
                    // Hiển thị các trường chỉnh sửa khi đang trong chế độ chỉnh sửa
                    <>
                      <input
                        type="text"
                        value={editViviName}
                        onChange={(e) => setEditViviName(e.target.value)}
                        className="form-control"
                      />
                      <input
                        type="text"
                        value={editViviAmount}
                        onChange={(e) => setEditViviAmount(e.target.value)}
                        className="form-control"
                      />
                      <Button
                        onClick={handleSaveVivi}
                        variant="success"
                        className="m-2"
                      >
                        Lưu
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="secondary"
                        className="m-2"
                      >
                        Huỷ
                      </Button>
                    </>
                  ) : (
                    // Hiển thị thông tin tài khoản khi không trong chế độ chỉnh sửa
                    <>
                      <span className="m-0" style={{ fontSize: "18px" }}>
                        {vivi.name}
                      </span>
                      <span className="m-0" style={{ fontSize: "12px" }}>
                        {vivi.initialMoney}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div>
                {editMode && editViviIndex === index ? null : ( // Hiển thị nút "Lưu" và "Hủy" khi đang trong chế độ chỉnh sửa
                  // Hiển thị nút "Sửa ví" và "Xoá ví" khi không trong chế độ chỉnh sửa
                  <>
                    <span
                      className="link-success m-2"
                      style={{
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onClick={() => handleEditVivi(index)}
                    >
                      Sửa ví
                    </span>
                    <span
                      className="m-2 link-danger"
                      style={{
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onClick={() => handleDeleteVivi(index)}
                    >
                      Xoá ví
                    </span>
                    <span
                      className="m-2 link-primary"
                      style={{
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onClick={() => handleShowDetails(index)}

                    >
                      Xem
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}

          {editMode ? ( // Hiển thị các trường thông tin mới khi trong chế độ chỉnh sửa
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="text"
                placeholder="Tên ví mới"
                value={newViviName}
                onChange={(e) => setNewViviName(e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Số tiền ban đầu mới"
                value={newViviAmount}
                onChange={(e) => setNewViviAmount(e.target.value)}
                className="form-control"
              />

              <Button
                onClick={handleSaveVivi}
                variant="success"
                className="m-2"
              >
                Lưu
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="secondary"
                className=""
              >
                Huỷ
              </Button>
            </div>
          ) : (
            // Hiển thị nút "Thêm ví" khi không trong chế độ chỉnh sửa
            <Button
              onClick={handleOpenModalAddWallet}
              variant="success"
              className="m-2"
            >
              Thêm ví
            </Button>
          )}
          <Modal
            show={showModalAddWallet}
            onHide={() => setShowModalAddWallet(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm ví</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-around align-items-center">
                <Form.Select
                  size="lg"
                  aria-label="Default select example"
                  className="m-2"
                >
                  <option>Loại ví</option>
                  <option value="1">Tiền mặt</option>
                  <option value="2">Thẻ tín dụng</option>
                  <option value="3">Thẻ visa</option>
                </Form.Select>

                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Tên ví"
                  value={newViviName}
                  onChange={(e) => setNewViviName(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder="Số tiền hiện có"
                  size="lg"
                  className="m-2"
                  value={newViviAmount}
                  onChange={(e) => setNewViviAmount(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-around align-items-center"></div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalAddWallet(false)}
              >
                Huỷ
              </Button>
              <Button variant="success" onClick={handleSaveVivi}>
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div
        className="rounded-1"
        style={{ backgroundColor: "#ffffff", height: "100%" }}
      >
        <div className="m-4" style={{ minWidth: "700px" }}>
        {showViviDetails && selectedVivi ? (
          <div>    
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <Wallet2 className="m-1" size={25} />
              <span className="text-dark" style={{ fontSize: "20px" }}>
                Thông tin chi tiết
              </span>
            </div>
            <div>
              <span
                className="link-success m-4"
                style={{
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
               
              >
                SỬA VÍ
              </span>
              <span
                className="m-4 link-danger"
                style={{
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                
              >
                XOÁ VÍ
              </span>
            </div>
          </div>
          <hr className="text-dark d-none d-sm-block" />
          <div className="d-flex align-items-center m-2">
            <img
              alt="Avatar"
              className="rounded-circle m-3"
              style={{ width: "70px", height: "70px" }}
              src={selectedVivi.icon}
            />
            <div className="d-flex flex-column m-2">
              <span style={{ fontSize: "25px", color: "#50c252" }}>
              {selectedVivi.name}
              </span>
              <span
                style={{
                  fontSize: "13px",
                }}
              >
                {selectedVivi.initialMoney} Việt Nam Đồng
              </span>
            </div>
          </div>
          </div>  
          ) : (
            <div className="text-secondary">Chọn một ví để xem thông tin chi tiết.</div>
          ) }
    
            
          <hr className="text-dark d-none d-sm-block" />
          <div>
            <span className="text-secondary">Thành viên</span>
          </div>
          <hr className="text-dark d-none d-sm-block" />
          <Form>
            <div className="">
              <Form.Check // prettier-ignore
                type="checkbox"
                id="Checkbox1" // Đặt id cho checkbox (thường để liên kết với label)
                label="Không tính vào tổng"
              />
              <span className="text-secondary m-4">
                Bỏ qua ví này và số dư khỏi tổng
              </span>
            </div>
          </Form>
          <Form>
            <div className="">
              <Form.Check // prettier-ignore
                type="checkbox"
                id="Checkbox2" // Đặt id cho checkbox (thường để liên kết với label)
                label="Lưu trữ"
              />
              <span className="text-secondary m-4">
                Đóng băng ví này và ngừng tạo ra giao dịch định kì & hoá đơn
              </span>
            </div>
          </Form>
          <hr className="text-dark d-none d-sm-block" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <span
                className="link-success"
                style={{
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                CHIA SẺ VÍ
              </span>
              <hr className="text-dark d-none d-sm-block" />
            </div>

            <span
              className="link-success"
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              CHUYỂN TIỀN
              <hr className="text-dark d-none d-sm-block" />
            </span>
            <span
              className="link-success"
              style={{
                cursor: "pointer",
                transition: "color 0.3s",
              }}
            >
              ĐIỀU CHỈNH SỐ DƯ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListWalletsUser;
