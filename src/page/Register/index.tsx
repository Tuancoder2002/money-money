import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleRegister() {
    // Kiểm tra xem tất cả các trường thông tin cần thiết đã được điền đúng cách
    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      // Ở đây, bạn có thể thực hiện xử lý lưu thông tin đăng ký
      // Ví dụ: kiểm tra thông tin hợp lệ và lưu vào Local Storage
      localStorage.setItem("user", JSON.stringify(formData));
      // Hiển thị cửa sổ thông báo khi đăng ký thành công
      window.alert("Đăng ký thành công. Đăng nhập ngay!");
    } else {
      alert("Vui lòng điền chính xác tất cả các trường bắt buộc");
    }
  }

  return (
    <div>
      <section className={cx("vh-100")} style={{ backgroundColor: "#f3e0e2" }}>
        <div className={cx("container", "h-100")}>
          <div
            className={cx(
              "row",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "h-100"
            )}
          >
            <div className={cx("col-lg-12", "col-xl-11")}>
              <div
                className={cx("card", "text-black", {
                  "border-radius": "25px",
                })}
              >
                <div className={cx("card-body", "p-md-5")}>
                  <div className={cx("row", "justify-content-center")}>
                    <div
                      className={cx(
                        "col-md-10",
                        "col-lg-6",
                        "col-xl-5",
                        "order-2",
                        "order-lg-1"
                      )}
                    >
                      <p
                        className={cx(
                          "text-center",
                          "h1",
                          "fw-bold",
                          "mb-5",
                          "mx-1",
                          "mx-md-4",
                          "mt-4"
                        )}
                      >
                        Register
                      </p>

                      <form className={cx("mx-1", "mx-md-4")}>
                        <div
                          className={cx(
                            "d-flex",
                            "flex-row",
                            "align-items-center",
                            "mb-4"
                          )}
                        >
                          <i
                            className={cx(
                              "fas",
                              "fa-user",
                              "fa-lg",
                              "me-3",
                              "fa-fw"
                            )}
                          ></i>
                          <div
                            className={cx("form-outline", "flex-fill", "mb-0")}
                          >
                            <input
                              type="text"
                              id="name"
                              className={cx("form-control")}
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                            <label className={cx("form-label")} htmlFor="name">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div
                          className={cx(
                            "d-flex",
                            "flex-row",
                            "align-items-center",
                            "mb-4"
                          )}
                        >
                          <i
                            className={cx(
                              "fas",
                              "fa-envelope",
                              "fa-lg",
                              "me-3",
                              "fa-fw"
                            )}
                          ></i>
                          <div
                            className={cx("form-outline", "flex-fill", "mb-0")}
                          >
                            <input
                              type="text"
                              id="email"
                              className={cx("form-control")}
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            <label className={cx("form-label")} htmlFor="email">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div
                          className={cx(
                            "d-flex",
                            "flex-row",
                            "align-items-center",
                            "mb-4"
                          )}
                        >
                          <i
                            className={cx(
                              "fas",
                              "fa-lock",
                              "fa-lg",
                              "me-3",
                              "fa-fw"
                            )}
                          ></i>
                          <div
                            className={cx("form-outline", "flex-fill", "mb-0")}
                          >
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              className={cx("form-control")}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <label
                              className={cx("form-label")}
                              htmlFor="password"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div
                          className={cx(
                            "d-flex",
                            "flex-row",
                            "align-items-center",
                            "mb-3"
                          )}
                        >
                          <i
                            className={cx(
                              "fas",
                              "fa-key",
                              "fa-lg",
                              "me-3",
                              "fa-fw"
                            )}
                          ></i>
                          <div
                            className={cx("form-outline", "flex-fill", "mb-0")}
                          >
                            <input
                              type={showPassword ? "text" : "password"}
                              id="confirmPassword"
                              className={cx("form-control")}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <div className="d-flex justify-content-between">
                              <label
                                className={cx("form-label")}
                                htmlFor="confirmPassword"
                              >
                                Repeat your password
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
                        </div>

                        <div
                          className={cx(
                            "form-check",
                            "d-flex",
                            "justify-content-center",
                            "mb-4"
                          )}
                        >
                          <input
                            className={cx("form-check-input", "me-2")}
                            type="checkbox"
                            value=""
                            id={cx("form2Example3c")}
                          />
                          <label
                            className={cx("form-check-label")}
                            htmlFor={cx("form2Example3")}
                          >
                            I agree all statements in{" "}
                            <a href="#!" style={{ color: "#393f81" }}>Terms of service</a>
                          </label>
                        </div>

                        <div
                          className={cx(
                            "d-flex",
                            "justify-content-center",
                            "mx-4",
                            "mb-3",
                            "mb-lg-4"
                          )}
                        >
                          <button
                            type="button"
                            className={cx("btn", "btn-success", "btn-lg")}
                            onClick={handleRegister}
                          >
                            Register
                          </button>
                         
                        </div>
                        <div
                          className={cx(
                            "d-flex",
                            "justify-content-center",
                            "mx-4",
                            "mb-3",
                            "mb-lg-4"
                          )}
                        >
                          <label
                            className={cx("form-check-label")}
                            htmlFor={cx("form2Example3")}
                            
                          >
                            Already have an account?{" "}
                          <Link to="/" style={{ color: "#393f81" }}>
                            Login here
                          </Link>
                          </label>
                         
                        </div>
                        
                        
                      </form>
                    </div>
                    <div
                      className={cx(
                        "col-md-10",
                        "col-lg-6",
                        "col-xl-7",
                        "d-flex",
                        "align-items-center",
                        "order-1",
                        "order-lg-2"
                      )}
                    >
                      <img
                        src="https://media.istockphoto.com/id/1212993255/vector/cashbox-with-touch-screen-and-payment-terminal.jpg?s=612x612&w=0&k=20&c=oTH3hJvVB4D6nC3AjPj3Mu5Sz2jVRoyipWDrIaEJonE="
                        className={cx("img-fluid")}
                        alt="Sample drawing"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
