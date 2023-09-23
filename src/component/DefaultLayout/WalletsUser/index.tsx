import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";
import Button from "react-bootstrap/Button";

function WalletsUser() {
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [editMode, setEditMode] = useState(false); // Trạng thái chỉnh sửa
  const [editViviIndex, setEditViviIndex] = useState<number | null>(null);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");
  const [newViviName, setNewViviName] = useState(""); // Tên mới của ví
  const [newViviAmount, setNewViviAmount] = useState(""); // Số tiền ban đầu mới của ví

  useEffect(() => {
    paymentAccountApi.getAll({}).then((res) => {
      setViviData(res.data);
    });
  }, []);

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
    <div>
      <div className="d-flex align-items-center">
        <span className="m-0 mr-auto">Đang sử dụng</span>
      </div>

      {viviData.map((vivi, index) => (
        <div
          key={vivi.id}
          className="d-flex justify-content-between align-items-center"
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

          <Button onClick={handleSaveVivi} variant="success" className="m-2">
            Lưu
          </Button>
          <Button onClick={handleCancelEdit} variant="secondary" className="">
            Huỷ
          </Button>
        </div>
      ) : (
        // Hiển thị nút "Thêm ví" khi không trong chế độ chỉnh sửa
        <Button
          onClick={handleShowNewViviFields}
          variant="primary"
          className="m-2"
        >
          Thêm ví
        </Button>
      )}
    </div>
  );
}

export default WalletsUser;
