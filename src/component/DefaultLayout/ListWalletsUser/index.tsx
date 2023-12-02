import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Wallet2 } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../../redux/hooks";
import {
  paymentAccountActions,
  selectPaymentAccountViews,
} from "../../../redux/paymentAccountReducer";
import { useSelector } from "react-redux";

function ListWalletsUser() {
  const viviData = useSelector(selectPaymentAccountViews);
  const [editViviName, setEditViviName] = useState("");
  const [editViviIcon, setEditViviIcon] = useState("");
  
  const [editViviAmount, setEditViviAmount] = useState<number>(0);
  const [showModalAddWallet, setShowModalAddWallet] = useState(false);
  const [selectedVivi, setSelectedVivi] = useState<IPaymentAccountModel | null>(
    null
  );
  const [showViviDetails, setShowViviDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowDetails = (vivi: IPaymentAccountModel) => {
    setSelectedVivi(vivi);
    setShowViviDetails(true);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(paymentAccountApi.getAll({}))
          .unwrap()
          .then((response) => {
            dispatch(
              paymentAccountActions.setPaymentAccountViews(response.data)
            );
          })
          .catch((error) => {});
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ví:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleOpenModalAddWallet = () => {
    setShowModalAddWallet(true);
  };

  const handleEditViviDetails = (vivi: IPaymentAccountModel) => {
    setSelectedVivi(vivi);
    setEditViviName(vivi.name || "");
    setEditViviAmount(vivi.initialMoney);
    setShowEditModal(true);
  };

  const handleDeleteViviDetails = () => {
    if (selectedVivi) {
      const accountId = selectedVivi.id;
      if (accountId) {
        paymentAccountApi
          .delete(accountId)
          .then((res) => {
            toast.success("Đã xoá tài khoản thành công.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(paymentAccountApi.getAll({}))
              .unwrap()
              .then((response) => {
                paymentAccountActions.setPaymentAccountViews(response.data);

                setShowViviDetails(false);
              });
          })
          .catch((error) => {
            toast.error("Lỗi khi xoá tài khoản.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    }
  };

  const handleSaveViviDetails = async () => {
    if (selectedVivi && selectedVivi.id) {
      const updatedViviData = [...viviData];
      const editedViviIndex = updatedViviData.findIndex(
        (vivi) => vivi.id === selectedVivi.id
      );
      if (editedViviIndex !== -1) {
        updatedViviData[editedViviIndex].name = editViviName;
        updatedViviData[editedViviIndex].icon = editViviIcon;
        updatedViviData[editedViviIndex].initialMoney = editViviAmount;
          
      }
      try {
        await paymentAccountApi.update(
          selectedVivi.id,
          updatedViviData[editedViviIndex]
        );
        paymentAccountActions.setPaymentAccountViews(updatedViviData);
        setShowEditModal(false);
        toast.success("Thông tin ví đã được cập nhật thành công.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Không thể cập nhật thông tin ví.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Không thể cập nhật thông tin ví.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAddVivi = async () => {
    const newVivi = {
      name: editViviName,
      initialMoney: editViviAmount,
      icon: editViviIcon,
    };

    try {
      const response = await paymentAccountApi.create(newVivi);
      if (response.id != null) {
        const updatedViviData = [...viviData, response];
        paymentAccountActions.setPaymentAccountViews(updatedViviData);
        setShowModalAddWallet(false);
        toast.success("Tạo ví thành công.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Có lỗi khi tạo ví.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Có lỗi khi tạo ví.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <div
        className=""
        style={{
          backgroundColor: "rgba(54, 19, 84, 0.8)",
          height: "100%",
          borderRadius: "30px",
          maxWidth: "270px",
          boxShadow: "0 0 5px #ccc",
          color: "#fff",
        }}
      >
        <div className="m-2 mx-auto mt-auto">
          {viviData.map((vivi, index) => (
            <div
              key={vivi.id}
              className="mb-1 d-flex align-items-center"
              onClick={() => handleShowDetails(vivi)}
              style={{
                backgroundColor: "rgba(73, 231, 210, 0.8)",
                borderRadius: "40px",
                boxShadow: "0 0 5px #ccc",
                height: "100%",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(73, 231, 210, 1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(73, 231, 210, 0.8)")
              }
            >
              <img
                src={vivi.icon}
                alt="Avatar"
                className="rounded-circle m-2"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="d-flex flex-column">
                <span className="m-0" style={{ fontSize: "18px" }}>
                  {vivi.name}
                </span>
                <span className="m-0" style={{ fontSize: "16px" }}>
                  {vivi.initialMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className=""
        style={{
          backgroundColor: "rgba(54, 19, 84, 0.8)",
          height: "100%",
          borderRadius: "30px",
          boxShadow: "0 0 5px #ccc",
          color: "#fff",
        }}
      >
        <div className="m-2">
          {showViviDetails && selectedVivi ? (
            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex mt-2">
                  <Wallet2 className="m-1" size={25} />
                  <span className="text-white" style={{ fontSize: "20px" }}>
                    Thông tin chi tiết
                  </span>
                </div>
                <div>
                  <span
                    className="link-success m-2"
                    onClick={() => handleEditViviDetails(selectedVivi)}
                  >
                    SỬA VÍ
                  </span>
                  <span
                    className="m-4 link-danger"
                    onClick={handleDeleteViviDetails}
                  >
                    XOÁ VÍ
                  </span>
                </div>
              </div>
              <hr className="text-white" />
              <div className="d-flex align-items-center mb-4">
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
                  <span style={{ fontSize: "13px" }}>
                    {selectedVivi.initialMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 })} Việt Nam Đồng
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <img
                src="https://cdn.textstudio.com/output/sample/normal/5/8/4/5/money-logo-600-5485.png"
                alt="Avatar"
                className="rounded-circle m-2"
                style={{ width: "260px" }}
              />
            </div>
          )}
          <hr className="text-white" />
          <div>
            <span className="text-secondary">Thành viên</span>
          </div>
          <hr className="text-white" />
          <Form>
            <div className="mb-4">
              <Form.Check
                type="checkbox"
                id="Checkbox1"
                label="Không tính vào tổng"
              />
              <span className="text-secondary">
                Bỏ qua ví này và số dư khỏi tổng
              </span>
            </div>
          </Form>
          <Form>
            <div className="mb-4">
              <Form.Check type="checkbox" id="Checkbox2" label="Lưu trữ" />
              <span className="text-secondary">
                Đóng băng ví này và ngừng tạo ra giao dịch định kì & hoá đơn
              </span>
            </div>
          </Form>
          <hr className="text-white" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-2">
              <span className="link-success">CHIA SẺ VÍ</span>
            </div>
            <div className="mb-2">
              <span className="link-success">CHUYỂN TIỀN</span>
            </div>
            <Button
              onClick={handleOpenModalAddWallet}
              variant="primary"
              className="mb-4"
            >
              Thêm ví mới
            </Button>
          </div>
        </div>
      </div>
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
              value={editViviIcon}
              onChange={(e) => setEditViviIcon(e.target.value)}
            >
              <option>Loại ví</option>
              <option value={"cash.png"}>Tiền mặt</option>
              <option value={"logoATM.png"}>Thẻ ngân hàng</option>
              <option value={"visa.png"}>Thẻ visa</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Tên ví"
              size="lg"
              className="m-2"
              value={editViviName}
              onChange={(e) => setEditViviName(e.target.value)}
            />
             <Form.Control
              name="amount"
              type="text"
              placeholder="Số tiền"
              size="lg"
              className="m-2"
              value={editViviAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              onChange={(e) => {
                const inputText = e.target.value;
                const sanitizedText = inputText.replace(/[^\d]/g, ""); // Chỉ giữ lại số
                const parsedAmount = parseInt(sanitizedText, 10);

                if (!isNaN(parsedAmount)) {
                  setEditViviAmount(parsedAmount);
                }
              }}
            />
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalAddWallet(false)}
          >
            Huỷ
          </Button>
          <Button variant="success" 
          onClick={handleAddVivi}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={handleCancelEdit}
        style={{ position: "absolute", top: "0", left: "0" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin ví</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Tên ví:</label>
          <Form.Control
            type="text"
            placeholder="Tên ví"
            size="lg"
            className="m-2"
            value={editViviName}
            onChange={(e) => setEditViviName(e.target.value)}
          />
          <br />
          <label>Số tiền ban đầu:</label>
          <Form.Control
              name="amount"
              type="text"
              placeholder="Số tiền"
              size="lg"
              className="m-2"
              value={editViviAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
              onChange={(e) => {
                const inputText = e.target.value;
                const sanitizedText = inputText.replace(/[^\d]/g, ""); // Chỉ giữ lại số
                const parsedAmount = parseInt(sanitizedText, 10);

                if (!isNaN(parsedAmount)) {
                  setEditViviAmount(parsedAmount);
                }
              }}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Huỷ
          </Button>
          <Button variant="primary" 
          onClick={handleSaveViviDetails}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default ListWalletsUser;
