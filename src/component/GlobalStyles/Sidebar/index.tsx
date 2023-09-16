import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Modal, Button } from "react-bootstrap";
import TransactionCategories from "../TransactionCategories";
import PaymentAccount from "../PaymentAccount";
import {
  QuestionCircle,
  Shop,
  Calendar,
  Journals,
  ClipboardPulse,
} from "react-bootstrap-icons";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBookOpen, faSquare, faTable, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  const [showModalPaymentAccount, setShowModalPaymentAccount] = useState(false);

  const handleOpenModalPaymentAccount = () => {
    setShowModalPaymentAccount(true);
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
            <div className={cx("mt-4")}>
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
                <li className={cx("nav-item", "my-sm-1", "my-2", "small-text")}>
                  {/* <FontAwesomeIcon icon={faSquare} className={cx('category__heading-icon')} /> */}
                  <a
                    className={cx("nav-link")}
                    href="#"
                    aria-current="page"
                    style={{ color: "#2DB84C" }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Calendar size={20} className={cx("m-2")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Sổ giao dịch
                      </span>
                    </span>
                  </a>
                </li>
                <li className={cx("nav-item", "my-sm-1", "my-2", "small-text")}>
                  <a
                    className={cx("nav-link")}
                    href="/"
                    aria-current="page"
                    style={{ color: "#0000008A" }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Journals size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Báo cáo
                      </span>
                    </span>
                  </a>
                </li>
                <li className={cx("nav-item", "my-sm-1", "my-2", "small-text")}>
                  <div className={cx("dropdown")}>
                    <a
                      className={cx("nav-link")}
                      href="/"
                      role="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#productDropdown"
                      aria-expanded="false"
                      style={{ color: "#0000008A" }}
                    >
                      <span className={cx("icon-below-text")}>
                        <ClipboardPulse
                          size={20}
                          className={cx("m-2", "icon")}
                        />
                        <span className={cx("d-none", "d-sm-inline")}>
                          Ngân sách
                        </span>
                      </span>
                    </a>
                  </div>
                </li>
                <li className={cx("nav-item", "my-sm-1", "my-2", "small-text")}>
                  <a
                    className={cx("nav-link")}
                    href="/"
                    aria-current="page"
                    style={{ color: "#0000008A" }}
                  >
                    <span className={cx("icon-below-text")}>
                      <Shop size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Cửa hàng
                      </span>
                    </span>
                  </a>
                </li>
                <li
                  onClick={handleOpenModalPaymentAccount}
                  className={cx("nav-item", "my-1", "small-text")}
                >
                  <a
                    className={cx("nav-link")}
                    href="#"
                    aria-current="page"
                    style={{ color: "#0000008A" }}
                  >
                    <span className={cx("icon-below-text")}>
                      <QuestionCircle size={20} className={cx("m-2", "icon")} />
                      <span className={cx("d-none", "d-sm-inline")}>
                        Trợ giúp
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PaymentAccount  */}
      <Modal
        show={showModalPaymentAccount}
        onHide={() => setShowModalPaymentAccount(false)}
        dialogClassName="modal-left"
      >
        <Modal.Header closeButton>
          <Modal.Title>Transactions Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentAccount />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalPaymentAccount(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sidebar;
