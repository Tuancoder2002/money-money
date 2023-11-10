import React, { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../apis/authApi";
import { FormLoginData } from "../../models/Auths/FormLoginData";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
      dispatch(authApi.login(formData));
    } else {
      toast.warning("Vui lòng điền chính xác tất cả các trường bắt buộc.", {
        position: toast.POSITION.TOP_RIGHT, // Vị trí hiển thị thông báo (có nhiều tùy chọn khác)
      });
    }
  }
  // Kiểm tra trạng thái đăng nhập

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f3e0e2" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card border-1">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="picture-login.png"
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Login</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input email
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          ></label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input password
                            onKeyUp={(e) => e.key === 'Enter' && handleLogin()}
                          />
                          <div className="d-flex justify-content-between">
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                            <label
                              className="form-label"
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

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-success btn-lg btn-block"
                            type="button"
                            onClick={handleLogin} // Gọi hàm xử lý đăng nhập khi nhấn nút Login
                          >
                            Login
                          </button>
                        </div>

                        <Link className="small text-muted" to="/home">
                          Forgot password?
                        </Link>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                        <Link to="#!" className="small text-muted">
                          Terms of use.
                        </Link>
                        <Link to="#!" className="small text-muted">
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
    </div>
  );
}

export default Login;
