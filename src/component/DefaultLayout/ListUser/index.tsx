// ListUser.tsx
import { useEffect, useState } from "react";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";

interface ListUserProps {
  closeModal: () => void;
  updateHeaderData: (vivi: IPaymentAccountModel) => void; // Thêm prop này
}

const ListUser: React.FC<ListUserProps> = ({
  closeModal,
  updateHeaderData,
}) => {
  const handleViviClick = (vivi: IPaymentAccountModel) => {
    closeModal(); // Đóng modal ListUser
    updateHeaderData(vivi); // Gọi hàm updateHeaderData để cập nhật dữ liệu trên thanh tiêu đề
  };

  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
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
  const modalStyle: React.CSSProperties = {
    width: "250px",
    backgroundColor: "rgba(54, 19, 84, 0.8)",
    border: "1px solid #ccc",
    borderRadius: "10px",
    position: "fixed",
    top: "220px",
    left: "220px",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    padding: "20px",
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Kiểm tra xem người dùng đã click vào khu vực modal hay không
    if (e.target === e.currentTarget) {
      closeModal(); // Gọi hàm closeModal để đóng modal
    }
  };

  return (
    <div
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={handleBackdropClick}
    >
      <div style={modalStyle}>
        <div>
          {/* Thêm nội dung modal ở đây */}

          {viviData.map((vivi, index) => (
            <div
              key={vivi.id}
              className="d-flex justify-content-between align-items-center"
              style={{
                cursor: "pointer",
                backgroundColor: "rgba(73, 231, 210, 0.8)",
                transition: "background-color 0.3s",
                borderRadius: "20px",
                
              }}
              onClick={() => handleViviClick(vivi)}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(73, 231, 210, 1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(73, 231, 210, 0.8)")
              }
            >
              <div className="d-flex align-items-center m-1">
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
    </div>
  );
};

export default ListUser;
