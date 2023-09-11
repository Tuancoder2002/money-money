import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar, faChevronDown, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("wraper-header")}>
      <header
        className={cx("header", "bg-dark", "vh-15", "shadow", "border")}
        style={{ minHeight: "65px" }}
      >
        <div className={cx("container", "h-100")}>
          <div className={cx("row", "h-100", "align-items-center")}>
            <div className={cx("col")}>
              <div
                className={cx(
                  "d-flex",
                  "justify-content-start",
                  "align-items-center",
                  "h-100"
                )}
              >
                {/* Thẻ account bên góc trái */}
                <div
                  className={cx(
                    "dropdown-open",
                    "d-flex",
                    "align-items-center"
                  )}
                >
                  <a
                    className={cx(
                      "btn",
                      "border-none",
                      "outline-none",
                      "text-white",
                      "d-flex",
                      "align-items-center"
                    )}
                    type="button"
                    id="triggerId2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    href="/"
                  >
                    <img
                      src="job.png" // Thay thế bằng đường dẫn hình ảnh của bạn
                      alt="Avatar"
                      className={cx("rounded-circle", "me-2")} // Sử dụng 'rounded-circle' để làm hình tròn
                      style={{ width: "40px", height: "40px" }} // Điều chỉnh kích thước của avatar theo ý muốn
                    />
                    <div
                      className={cx(
                        "d-flex",
                        "flex-column",
                        "align-items-start"
                      )}
                    >
                      <span className={cx("fs-5", "text-white", "mb-0")}>
                        Tuấn Trần
                      </span>
                      <span className={cx("text-white", "fs-6", "mb-0")}>
                        5.000.000đ
                      </span>
                    </div>
                    {/* <FontAwesomeIcon icon={faChevronDown} className={cx('text-white', 'ms-2')} /> */}
                  </a>
                  <div
                    className={cx("dropdown-menu")}
                    aria-labelledby="triggerId2"
                  >
                    <a className={cx("dropdown-item", "my-1")} href="/">
                      Ví 1 - Tiền mặt
                    </a>
                    <a className={cx("dropdown-item")} href="/">
                      Ví 2 - Thẻ tín dụng
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-auto")}>
              <div
                className={cx(
                  "d-flex",
                  "justify-content-end",
                  "align-items-center"
                )}
              >
                {/* Ba thẻ icon bên góc phải */}
                <div className={cx("icon")}>
                  {/* <FontAwesomeIcon icon={faCalendar} className={cx('text-white', 'ms-4')} /> */}
                </div>
                <div className={cx("icon")}>
                  {/* <FontAwesomeIcon icon={faEye} className={cx('text-white', 'ms-4')} /> */}
                </div>
                <div className={cx("icon")}></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
