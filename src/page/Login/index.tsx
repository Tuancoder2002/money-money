import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions";
import { EyeSlashFill, EyeFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../apis/authApi";
import { FormLoginData } from "../../models/Auths/FormLoginData";

const cx = classNames.bind(styles);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const history = useNavigate();

  function handleLoginSuccess() {
    // Xử lý đăng nhập thành công
    // Sau khi xác thực người dùng, gọi dispatch(loginSuccess()) để cập nhật trạng thái đăng nhập.
    dispatch(loginSuccess());
  }

  const [formData, setFormData] = useState<FormLoginData>({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleLogin() {
    if (formData.email && formData.password) {
      // Lấy thông tin người dùng từ Local Storage
      // Kiểm tra thông tin đăng nhập

      authApi
        .login(formData)
        .then((response) => {
          console.log(response);
          toast.success("Đăng nhập thành công!", {
            position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
          });
          localStorage.setItem("token", response);
          handleLoginSuccess();
          history("/home");
        })
        .catch((error) => {
          toast.error("Email hoặc mật khẩu không đúng!", {
            position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
          });
        });
    } else {
      toast.warning("Vui lòng điền chính xác tất cả các trường bắt buộc.", {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
      });
    }
  }
  // Kiểm tra trạng thái đăng nhập

  return (
    <div>
      <section className={cx("vh-100")} style={{ backgroundColor: "#f3e0e2" }}>
        <div className={cx("container", "py-5", "h-100")}>
          <div
            className={cx(
              "row",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "h-100"
            )}
          >
            <div className={cx("col", "col-xl-10")}>
              <div className={cx("card", cx("border-1"))}>
                <div className={cx("row", "g-0")}>
                  <div
                    className={cx(
                      "col-md-6",
                      "col-lg-5",
                      "d-none",
                      "d-md-block"
                    )}
                  >
                    <img
                      src="picture-login.png"
                      alt="login form"
                      className={cx("img-fluid")}
                    />
                  </div>
                  <div
                    className={cx(
                      "col-md-6",
                      "col-lg-7",
                      "d-flex",
                      "align-items-center"
                    )}
                  >
                    <div
                      className={cx("card-body", "p-4", "p-lg-5", "text-black")}
                    >
                      <form>
                        <div
                          className={cx(
                            "d-flex",
                            "align-items-center",
                            "mb-3",
                            "pb-1"
                          )}
                        >
                          <i
                            className={cx("fas", "fa-cubes", "fa-2x", "me-3")}
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className={cx("h1", "fw-bold", "mb-0")}>
                            Login
                          </span>
                        </div>

                        <h5
                          className={cx("fw-normal", "mb-3", "pb-3")}
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className={cx("form-outline", "mb-4")}>
                          <input
                            type="email"
                            id="form2Example17"
                            className={cx("form-control", "form-control-lg")}
                            name="email"
                            value={formData.email}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input email
                          />
                          <label
                            className={cx("form-label")}
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        </div>

                        <div className={cx("form-outline", "mb-4")}>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="form2Example27"
                            className={cx("form-control", "form-control-lg")}
                            name="password"
                            value={formData.password}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input password
                          />
                          <div className="d-flex justify-content-between">
                            <label
                              className={cx("form-label")}
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                            <label
                              className={cx("form-label")}
                              htmlFor="form2Example27"
                              onClick={toggleShowPassword}
                            >
                              {showPassword ? (
                                <EyeFill size={20} />
                              ) : (
                                <EyeSlashFill size={20} />
                              )}
                            </label>
                          </div>
                        </div>

                        <div className={cx("pt-1", "mb-4")}>
                          <button
                            className={cx(
                              "btn",
                              "btn-success",
                              "btn-lg",
                              "btn-block"
                            )}
                            type="button"
                            onClick={handleLogin} // Gọi hàm xử lý đăng nhập khi nhấn nút Login
                          >
                            Login
                          </button>
                        </div>

                        <Link className={cx("small", "text-muted")} to="/home">
                          Forgot password?
                        </Link>
                        <p
                          className={cx("mb-5", "pb-lg-2")}
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                        <Link to="#!" className={cx("small", "text-muted")}>
                          Terms of use.
                        </Link>
                        <Link to="#!" className={cx("small", "text-muted")}>
                          Privacy policy
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Login;
