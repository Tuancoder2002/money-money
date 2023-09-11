import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const history = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      if (storedUser) {
        // Kiểm tra thông tin đăng nhập
        if (formData.email === storedUser.email && formData.password === storedUser.password) {
          window.alert('Đăng nhập thành công!');
          history('/home');
        } else {
          alert('Email hoặc mật khẩu không đúng!');
        }
      }
    } else {
      alert('Vui lòng điền chính xác tất cả các trường bắt buộc');
    }
  }

  return (
    <div>
      <section className={cx('vh-100')} style={{ backgroundColor: '#9A616D' }}>
        <div className={cx('container', 'py-5', 'h-100')}>
          <div className={cx('row', 'd-flex', 'justify-content-center', 'align-items-center', 'h-100')}>
            <div className={cx('col', 'col-xl-10')}>
              <div className={cx('card', cx('border-1'))}>
                <div className={cx('row', 'g-0')}>
                  <div className={cx('col-md-6', 'col-lg-5', 'd-none', 'd-md-block')}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className={cx('img-fluid')}
                      
                    />
                  </div>
                  <div className={cx('col-md-6', 'col-lg-7', 'd-flex', 'align-items-center')}>
                    <div className={cx('card-body', 'p-4', 'p-lg-5', 'text-black')}>
                      <form>
                        <div className={cx('d-flex', 'align-items-center', 'mb-3', 'pb-1')}>
                          <i
                            className={cx('fas', 'fa-cubes', 'fa-2x', 'me-3')}
                            style={{ color: '#ff6219' }}
                          ></i>
                          <span className={cx('h1', 'fw-bold', 'mb-0')}>Manage Money</span>
                        </div>

                        <h5 className={cx('fw-normal', 'mb-3', 'pb-3')} style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h5>

                        <div className={cx('form-outline', 'mb-4')}>
                          <input
                            type="email"
                            id="form2Example17"
                            className={cx('form-control', 'form-control-lg')}
                            name="email"
                            value={formData.email}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input email
                          />
                          <label className={cx('form-label')} htmlFor="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className={cx('form-outline', 'mb-4')}>
                          <input
                            type="password"
                            id="form2Example27"
                            className={cx('form-control', 'form-control-lg')}
                            name="password"
                            value={formData.password}
                            onChange={handleChange} // Lắng nghe sự thay đổi trên ô input password
                          />
                          <label className={cx('form-label')} htmlFor="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className={cx('pt-1', 'mb-4')}>
                          <button
                            className={cx('btn', 'btn-dark', 'btn-lg', 'btn-block')}
                            type="button"
                            onClick={handleLogin} // Gọi hàm xử lý đăng nhập khi nhấn nút Login
                          >
                            Login
                          </button>
                        </div>

                        <Link className={cx('small', 'text-muted')} to="/home">
                          Forgot password?
                        </Link>
                        <p className={cx('mb-5', 'pb-lg-2')} style={{ color: '#393f81' }}>
                          Don't have an account?{' '}
                          <Link to="/register" style={{ color: '#393f81' }}>
                            Register here
                          </Link>
                        </p>
                        <Link to="#!" className={cx('small', 'text-muted')}>
                          Terms of use.
                        </Link>
                        <Link to="#!" className={cx('small', 'text-muted')}>
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
