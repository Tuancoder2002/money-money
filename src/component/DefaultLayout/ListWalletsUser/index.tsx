import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Wallet2 } from "react-bootstrap-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListWalletsUser() {
  const notify = () => toast("Wow so easy!");
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");
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

  useEffect(() => {
    // Hàm này sẽ gọi API để lấy danh sách ví và cập nhật vào state khi component được render.
    const fetchData = async () => {
      try {
        const response = await paymentAccountApi.getAll({});
        setViviData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ví:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModalAddWallet = () => {
    setShowModalAddWallet(true);
  };

  // Hàm sửa thông tin ví ở bảng 2
  const handleEditViviDetails = (vivi: IPaymentAccountModel) => {
    setSelectedVivi(vivi);
    setEditViviName(vivi.name || "");
    setEditViviAmount(vivi.initialMoney?.toString() || "");
    setShowEditModal(true);
  };

  // Hàm xoá ví ở bảng 2
  const handleDeleteViviDetails = () => {
    if (selectedVivi) {
      const accountId = selectedVivi.id;
      if (accountId) {
        // Gọi API để xoá tài khoản có id là accountId
        paymentAccountApi
          .delete(accountId)
          .then((res) => {
            // Sau khi xoá thành công, gọi lại API để lấy danh sách ví mới
            return paymentAccountApi.getAll({});
          })
          .then((resPaymentAccounts) => {
            // Cập nhật state `viviData` bằng danh sách ví mới
            setViviData(resPaymentAccounts.data);
            // Đóng bảng thông tin chi tiết ví (setShowViviDetails(false))
            setShowViviDetails(false);
            toast.success("Đã xoá tài khoản thành công.", {
              position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
            });
           
          })
          .catch((error) => {
            
            toast.error("Lỗi khi xoá tài khoản.", {
              position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
            });
          });
      }
    }
  };

  const handleSaveViviDetails = async () => {
    if (selectedVivi && selectedVivi.id) {
      // Tạo một bản sao của dữ liệu ví hiện tại
      const updatedViviData = [...viviData];

      // Tìm ví cần chỉnh sửa trong mảng và cập nhật thông tin
      const editedViviIndex = updatedViviData.findIndex(
        (vivi) => vivi.id === selectedVivi.id
      );
      if (editedViviIndex !== -1) {
        updatedViviData[editedViviIndex].name = editViviName;
        updatedViviData[editedViviIndex].initialMoney =
          parseFloat(editViviAmount);
      }
      try {
        // Gọi API để cập nhật thông tin ví
        await paymentAccountApi.update(
          selectedVivi.id,
          updatedViviData[editedViviIndex]
        );
        // Sau khi cập nhật thành công API, cập nhật dữ liệu trong state của bảng 2
        setViviData(updatedViviData);
        // Ẩn modal chỉnh sửa
        setShowEditModal(false);
        // Thông báo cập nhật thành công
        
        toast.success("Thông tin ví đã được cập nhật thành công.", {
          position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
        });
      } catch (error) {
        toast.error("Không thể cập nhật thông tin ví.", {
          position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
        });
      }
    } else {
      toast.error("Không thể cập nhật thông tin ví.", {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
      });
     
    }
  };

  const handleAddVivi = async () => {
    // Tạo một đối tượng mới ví từ dữ liệu nhập vào
    const newVivi = {
      name: editViviName, // Sử dụng editViviName thay vì newViviName
      initialMoney: parseFloat(editViviAmount), // Sử dụng editViviAmount thay vì newViviAmount
    };

    try {
      // Gọi API để tạo ví mới
      const response = await paymentAccountApi.create(newVivi);

      // Kiểm tra xem API có trả về id hay không
      if (response.id != null) {
        // Tạo một bản sao của dữ liệu ví hiện tại và thêm ví mới vào mảng
        const updatedViviData = [...viviData, response];

        // Cập nhật state của bảng 2
        setViviData(updatedViviData);

        // Ẩn modal thêm ví
        setShowModalAddWallet(false);

        // Thông báo tạo ví thành công
        toast.success("Tạo ví thành công.", {
          position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
        });
      } else {
        toast.error("Có lỗi khi tạo ví.", {
          position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
        });
      }
    } catch (error) {
      toast.error("Có lỗi khi tạo ví.", {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
      });
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="d-flex justify-content-evenly">
      {/* Bảng 1 */}
      <div
        className="rounded-1"
        style={{
          backgroundColor: "#ffffff",
          height: "100%",
          boxShadow: "0 0 5px #ccc",
        }}
      >
        <div className="m-4" style={{ minWidth: "400px" }}>
          <div className="d-flex align-items-center">
            <span className="mr-auto text-secondary">Số ví hiện có</span>
          </div>

          {viviData.map((vivi, index) => (
            <div
              key={vivi.id}
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetails(vivi)}
            >
              <div className="d-flex align-items-center m-2">
                <img
                  src={vivi.icon}
                  alt="Avatar"
                  className="rounded-circle m-2"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="d-flex flex-column m-0">
                  <span className="m-0" style={{ fontSize: "18px" }}>
                    {vivi.name}
                  </span>
                  <span className="m-0" style={{ fontSize: "12px" }}>
                    {vivi.initialMoney}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bảng 2 */}
      <div
        className="rounded-1"
        style={{
          backgroundColor: "#ffffff",
          height: "100%",
          boxShadow: "0 0 10px #ccc",
        }}
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
                    className="link-success m-2"
                    style={{
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onClick={() => handleEditViviDetails(selectedVivi)} // Khi nhấp vào nút "Sửa", gọi hàm handleEditVivi
                  >
                    SỬA VÍ
                  </span>
                  <span
                    className="m-4 link-danger"
                    style={{
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onClick={handleDeleteViviDetails}
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
            <div className="d-flex justify-content-center">
              <img
                src="https://cdn.textstudio.com/output/sample/normal/5/8/4/5/money-logo-600-5485.png"
                alt="Avatar"
                className="rounded-circle m-2"
                style={{ width: "300px" }}
              />
            </div>
          )}

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

            <Button
              onClick={handleOpenModalAddWallet}
              variant="primary"
              className=""
            >
              Thêm ví mới
            </Button>
          </div>
        </div>
      </div>

      {/* Modal thêm ví */}
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
              type="text"
              placeholder="Tên ví"
              size="lg"
              className="m-2"
              value={editViviName}
              onChange={(e) => setEditViviName(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Số tiền"
              size="lg"
              className="m-2"
              value={editViviAmount}
              onChange={(e) => setEditViviAmount(e.target.value)}
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
          <Button variant="success" onClick={handleAddVivi}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal sửa xoá */}

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
            type="number"
            placeholder="Số tiền"
            size="lg"
            className="m-2"
            value={editViviAmount}
            onChange={(e) => setEditViviAmount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSaveViviDetails}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      
        <ToastContainer />
    </div>
  );
}

export default ListWalletsUser;
