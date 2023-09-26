import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import {
  QuestionCircle,
  Shop,
  Calendar,
  Journals,
  ClipboardPulse,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBookOpen, faSquare, faTable, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  const [activeLink, setActiveLink] = useState(""); // State để lưu trạng thái của li đang được chọn

  const handleLiClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className={cx("wraper-sidebar")}>
      <div className={cx("")}>
        <div className={cx("")}>
          <div
            className={cx(
              "d-flex",
              "flex-column",
              "justify-content-between",
              "col-auto",
              "bg-white",
              "vh-100",
              "height"
            )}
          >
            <div className={cx("mt-2")}>
              <ul
                className={cx(
                  "nav",
                  "text-muted",
                  "flex-column",
                  "mt-4",
                  "mt-sm-0"
                )}
                id="menu"
              >
                <li
                  className={cx("nav-item", "my-sm-1", "my-2", "small-text")}
                  onClick={() => handleLiClick("/home")}
                >
                  <Link
                    to="/home"
                    className="nav-link"
                    style={{
                      color: activeLink === "/home" ? "#2DB84C" : "#0000008A",
                    }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Calendar size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Sổ giao dịch
                      </span>
                    </span>
                  </Link>
                </li>
                <li
                  className={cx("nav-item", "my-sm-1", "my-2", "small-text")}
                  onClick={() => handleLiClick("/chart")}
                >
                  <Link
                    to="/chart"
                    className="nav-link"
                    style={{
                      color: activeLink === "/chart" ? "#2DB84C" : "#0000008A",
                    }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Journals size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Báo cáo
                      </span>
                    </span>
                  </Link>
                </li>
                <li
                  className={cx("nav-item", "my-sm-1", "my-2", "small-text")}
                  onClick={() => handleLiClick("/buget")}
                >
                  <Link
                    to="/wallet"
                    className="nav-link"
                    style={{
                      color: activeLink === "/buget" ? "#2DB84C" : "#0000008A",
                    }}
                  >
                    <span className={cx("icon-below-text")}>
                      <ClipboardPulse size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Ngân sách
                      </span>
                    </span>
                  </Link>
                </li>
                <li
                  className={cx("nav-item", "my-sm-1", "my-2", "small-text")}
                  onClick={() => handleLiClick("/shop")}
                >
                  <Link
                    to="/chart"
                    className="nav-link"
                    style={{
                      color: activeLink === "/shop" ? "#2DB84C" : "#0000008A",
                    }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Shop size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Cửa hàng
                      </span>
                    </span>
                  </Link>
                </li>
                <li
                  className={cx("nav-item", "my-sm-1", "my-2", "small-text")}
                  onClick={() => handleLiClick("/QuestionCircle")}
                >
                  <Link
                    to="/chart"
                    className="nav-link"
                    style={{
                      color:
                        activeLink === "/QuestionCircle"
                          ? "#2DB84C"
                          : "#0000008A",
                    }}
                  >
                    <span className={cx("icon-below-text")}>
                      <QuestionCircle size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Trợ giúp
                      </span>
                    </span>
                  </Link>
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
