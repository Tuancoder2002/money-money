import React from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBookOpen, faSquare, faTable, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx("wraper-sidebar")}>
      <div className={cx("container-fluid")}>
        <div className={cx("row")}>
          <div
            className={cx(
              "d-flex",
              "flex-column",
              "justify-content-between",
              "col-auto",
              "bg-dark",
              "vh-100",
              "height"
            )}
          >
            <div className={cx("mt-4")}>
              <a
                className={cx(
                  "text-white",
                  "text-decoration-none",
                  "d-flex",
                  "align-items-center",
                  "ms-4",
                  "d-none",
                  "d-sm-inline"
                )}
                role="button"
                href="/"
              >
                {/* <FontAwesomeIcon icon={faBars} className={cx('category__heading-icon')} /> */}
                <span className={cx("fs-5", "text-center", "ms-2")}>
                  Make Money
                </span>
              </a>
              <hr className={cx("text-white", "d-none", "d-sm-block")} />
              <ul
                className={cx(
                  "nav",
                  "nav-pills",
                  "flex-column",
                  "mt-4",
                  "mt-sm-0"
                )}
                id="menu"
              >
                <li className={cx("nav-item", "my-sm-1", "my-2")}>
                  <a
                    className={cx("nav-link", "text-white")}
                    href="/"
                    aria-current="page"
                  >
                    {/* <FontAwesomeIcon icon={faSquare} className={cx('category__heading-icon')} /> */}
                    <span className={cx("ms-2", "d-none", "d-sm-inline")}>
                      Transactions
                    </span>
                  </a>
                </li>
                <li className={cx("nav-item", "my-sm-1", "my-2")}>
                  <a
                    className={cx("nav-link", "text-white")}
                    href="/"
                    aria-current="page"
                  >
                    {/* <FontAwesomeIcon icon={faBookOpen} className={cx('category__heading-icon')} /> */}
                    <span className={cx("ms-2", "d-none", "d-sm-inline")}>
                      Report
                    </span>
                  </a>
                </li>
                <li className={cx("nav-item", "my-sm-1", "my-2")}>
                  <div className={cx("dropdown")}>
                    <a
                      className={cx(
                        "nav-link",
                        "text-white",
                        "dropdown-toggle"
                      )}
                      href="/"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#productDropdown"
                      aria-expanded="false"
                    >
                      {/* <FontAwesomeIcon icon={faTable} className={cx('category__heading-icon')} /> */}
                      <span className={cx("ms-2", "d-none", "d-sm-inline")}>
                        Budget
                      </span>
                    </a>
                    <div className={cx("collapse")} id="productDropdown">
                      <ul
                        className={cx(
                          "nav",
                          "flex-column",
                          "d-none",
                          "d-sm-inline"
                        )}
                      >
                        <li>
                          <a className={cx("nav-link", "text-white")} href="/">
                            Item 1
                          </a>
                        </li>
                        <li>
                          <a className={cx("nav-link", "text-white")} href="/">
                            Item 2
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className={cx("nav-item", "my-1")}>
                  <a
                    className={cx("nav-link", "text-white")}
                    href="/"
                    aria-current="page"
                  >
                    {/* <FontAwesomeIcon icon={faWallet} className={cx('category__heading-icon')} /> */}
                    <span className={cx("ms-2", "d-none", "d-sm-inline")}>
                      Categories
                    </span>
                  </a>
                </li>
                <li className={cx("nav-item", "my-1")}>
                  <div className={cx("dropdown-open")}>
                    <a
                      className={cx(
                        "btn",
                        "border-none",
                        "outline-none",
                        "dropdown-toggle",
                        "text-white"
                      )}
                      type="button"
                      id="triggerId2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      href="/"
                    >
                      {/* <FontAwesomeIcon icon={faUser} /> */}
                      <span className={cx("ms-1", "d-none", "d-sm-inline")}>
                        Yourself
                      </span>
                    </a>
                    <div
                      className={cx("dropdown-menu")}
                      aria-labelledby="triggerId2"
                    >
                      <a className={cx("dropdown-item", "my-1")} href="/">
                        My Account
                      </a>
                      <a className={cx("dropdown-item")} href="/">
                        Sign out
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
