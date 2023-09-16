import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";

function PaymentAccount() {
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editViviIndex, setEditViviIndex] = useState<number | null>(null);
  const [editViviName, setEditViviName] = useState("");
  const [editViviAmount, setEditViviAmount] = useState("");

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
        console.error("Lỗi khi tạo tài khoản:", error);
        alert("Lỗi khi tạo tài khoản");
      });
  };

  return (
    <div style={{ maxWidth: "400px" }}>
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
                      onChange={(e) => setEditViviName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số tiền"
                      value={editViviAmount}
                      onChange={(e) => setEditViviAmount(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success" onClick={handleSaveVivi}>
                    Lưu
                  </button>
                  <button className="btn btn-danger" onClick={handleCancelEdit}>
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
                <button className="btn btn-primary ms-4">Chọn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentAccount;
