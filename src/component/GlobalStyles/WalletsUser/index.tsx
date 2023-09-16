import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";

function WalletsUser() {
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
    <div>
      <div className="d-flex align-items-center">
        <span className="m-0 mr-auto">Đang sử dụng</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center m-2">
          <img
            src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/370268855_1695003577662262_8933963674553939351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K1Gv9wIxRg8AX99qBn-&_nc_oc=AQmb9UTWD_2WYnczZNempbTrIZo1VEcIqrRqPIsEmoqg4AYL55BZUtllNT4SToBvHdzyIhL0XrzTsqbcEmR669BI&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBr3MX8bJ2PIpMla6nZeAqETfMrVkFhBSjnpBUd7DEQZw&oe=65086372"
            alt="Avatar"
            className="rounded-circle m-2"
            style={{ width: "36px", height: "36px" }}
          />
          <div className="d-flex flex-column m-0">
            <span className="m-0" style={{ fontSize: "16px" }}>
              Tiền mặt
            </span>
            <span className="m-0" style={{ fontSize: "12px" }}>
              5.000.000đ
            </span>
          </div>
        </div>
        <div>
          <Button color="success" size="sm" className="m-2">
            Sửa ví
          </Button>
          <Button color="danger" size="sm" className="m-2">
            Xoá ví
          </Button>
        </div>
      </div>
      <hr className="text-dark d-none d-sm-block" />
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center m-2">
          <img
            src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/374209495_1698867620609191_6065399787513978540_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5614bc&_nc_ohc=4afp55_XSSEAX918GoU&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCe1z9RplRBrdVucSmRJqZpgC3tqV7BUjE6C_qfGhFsTw&oe=6509964C"
            alt="Avatar"
            className="rounded-circle m-2"
            style={{ width: "36px", height: "36px" }}
          />
          <div className="d-flex flex-column m-0">
            <span className="m-0" style={{ fontSize: "16px" }}>
              Thẻ tín dụng
            </span>
            <span className="m-0" style={{ fontSize: "12px" }}>
              3.000.000đ
            </span>
          </div>
        </div>
        <div>
          <Button color="success" size="sm" className="m-2">
            Sửa ví
          </Button>
          <Button color="danger" size="sm" className="m-2">
            Xoá ví
          </Button>
        </div>
      </div>
      <hr className="text-dark d-none d-sm-block" />
      <div className="d-flex justify-content-between align-items-center">
        {viviData.map((vivi, index) => (
          <div className="d-flex align-items-center m-2" key={vivi.id}>
            <img
              src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/363951363_1680296165799670_7499793505753164886_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5614bc&_nc_ohc=tREJIU3Jfy0AX8L9MMy&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfAwv30rVoGommnbneKzqx3MOvKK0D-5ZlNRvsOz0eb2Mw&oe=65092DFB"
              alt="Avatar"
              className="rounded-circle m-2"
              style={{ width: "36px", height: "36px" }}
            />
            <div className="d-flex flex-column m-0">
              <span className="m-0" style={{ fontSize: "16px" }}>
              {vivi.name}
              </span>
              <span className="m-0" style={{ fontSize: "12px" }}>
              {vivi.initialMoney}
              </span>
            </div>
          </div>
        ))}
        <div>
          <Button color="success" size="sm" className="m-2">
            Sửa ví
          </Button>
          <Button color="danger" size="sm" className="m-2">
            Xoá ví
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WalletsUser;
