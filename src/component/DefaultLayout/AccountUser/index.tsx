import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  getInforUsers,
  selectUser,
} from "../../../redux/authReducer";
import authApi from "../../../apis/authApi";
import { useAppDispatch } from "../../../redux/hooks";

function AccountUser() {
  const dispatch = useAppDispatch();

  const inforUser = useSelector(getInforUsers);
  useEffect(() => {
    console.log("dddddddddddd", inforUser);
  }, [inforUser]);

  const fetchViviData = async () => {
    try {
      dispatch(authApi.getUserInfo())
        .unwrap()
        .then((response) => {
          console.log("response", response);
          dispatch(authActions.getInforUser(response));
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchViviData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="accountLogo.png"
          className="rounded-circle m-2"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="d-flex flex-column m-3">
          <span className="m-0" style={{ fontSize: "16px" }}>
            ID User: {inforUser?.id}
          </span>
          <span className="m-0" style={{ fontSize: "14px" }}>
            Email User: {inforUser?.email}
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <span className="m-0 mr-auto">Trung tâm tài khoản</span>
      </div>

    


      <a
        href="https://www.facebook.com/tuancodedao"
        className="d-flex align-items-center m-2"
        style={{ textDecoration: "none", color: "#16191b" }}
      >
        <img
          src="fb.png"
          alt="Avatar"
          className="rounded-circle m-2"
          style={{ width: "36px", height: "36px" }}
        />
        <div className="d-flex flex-column m-0">
          <span className="m-0" style={{ fontSize: "16px" }}>
          Theo dõi chúng tôi trên Facebook.
          </span>
          <span className="m-0" style={{ fontSize: "12px" }}>
            Chia sẻ
          </span>
        </div>
      </a>
      <hr className="text-dark d-none d-sm-block" />

<a
  href="https://www.linkedin.com/in/tr%E1%BA%A7n-qu%E1%BB%91c-tu%E1%BA%A5n-316154299/"
  className="d-flex align-items-center m-2"
  style={{ textDecoration: "none", color: "#16191b" }}
>
  <img
    src="Linkedin.png"
    alt="Avatar"
    className="rounded-circle m-2"
    style={{ width: "36px", height: "36px" }}
  />
  <div className="d-flex flex-column m-0">
    <span className="m-0" style={{ fontSize: "16px" }}>
    Theo dõi chúng tôi trên Linkedin.
    </span>
    <span className="m-0" style={{ fontSize: "12px" }}>
      Chia sẻ
    </span>
  </div>
</a>  <hr className="text-dark d-none d-sm-block" />

<a
  href="https://github.com/Tuancoder2002"
  className="d-flex align-items-center m-2"
  style={{ textDecoration: "none", color: "#16191b" }}
>
  <img
    src="Github.png"
    alt="Avatar"
    className="rounded-circle m-2"
    style={{ width: "36px", height: "36px" }}
  />
  <div className="d-flex flex-column m-0">
    <span className="m-0" style={{ fontSize: "16px" }}>
      Theo dõi chúng tôi trên Github.
    </span>
    <span className="m-0" style={{ fontSize: "12px" }}>
      Chia sẻ
    </span>
  </div>
</a>
    </div>
  );
}

export default AccountUser;
