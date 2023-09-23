import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AccountUser from "../AccountUser";
import WalletsUser from "../WalletsUser";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import {
  Search,
  EyeFill,
  CalendarDateFill,
  List,
  CaretDownFill,
} from "react-bootstrap-icons";
import TransactionCategories from "../TransactionCategories";
import AddTransaction from "../AddTransaction";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar, faChevronDown, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
  const [showModalAccountUser, setShowModalAccountUser] = useState(false);
  const [showModalWalletsUser, setShowModalWalletsUser] = useState(false);
  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [showModalTransactionCategories, setShowModalTransactionCategories] =
    useState(false);

  const handleOpenModalAddTransaction = () => {
    setShowModalAddTransaction(true);
  };
  const handleOpenModalTransactionCategories = () => {
    setShowModalTransactionCategories(true);
  };

  const handleOpenModalAccountUser = () => {
    setShowModalAccountUser(true);
  };
  const handleOpenModalWalletsUser = () => {
    setShowModalWalletsUser(true);
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar
        color="light"
        light
        style={{
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 5px #ccc",
        }}
      >
        <List onClick={toggleNavbar} size={24} className={cx("m-2", "icon")} />
        <img
          src="logo192.png" // Thay thế bằng đường dẫn của hình ảnh avatar
          alt="Avatar"
          className={cx("avatar", "m-2")}
        />
        <NavbarBrand href="/" className="me-auto" style={{ fontSize: "12px" }}>
          Tiền mặt
          <CaretDownFill size={10} className={cx("m-2", "icon")} />
          <div
            style={{
              fontSize: "13px",
              marginLeft: "1px",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            5.000.000.00
          </div>
        </NavbarBrand>
        <CalendarDateFill size={20} className={cx("m-2", "icon")} />
        <EyeFill size={20} className={cx("m-2", "icon")} />
        <Search size={20} className={cx("m-2", "icon")} />
        <Button
          onClick={handleOpenModalAddTransaction}
          variant="success"
          className="m-2"
        >
          Thêm giao dịch
        </Button>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={handleOpenModalAccountUser}>
                Quản lý tài khoản
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleOpenModalWalletsUser}>Ví của tôi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleOpenModalTransactionCategories}>
                Nhóm
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Modal
        show={showModalAccountUser}
        onHide={() => setShowModalAccountUser(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quản lý tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountUser />
        </Modal.Body>

        <Modal.Footer>
          <Link to="/">
            <Button
              variant="secondary"
              // onClick={() => setShowModalAccountUser(false)}
            >
              Đăng xuất
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalWalletsUser}
        onHide={() => setShowModalWalletsUser(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quản lý ví</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WalletsUser />
        </Modal.Body>

        <Modal.Footer>
          <Link to="/">
            <Button
              variant="secondary"
              // onClick={() => setShowModalAccountUser(false)}
            >
              Thêm ví
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalTransactionCategories}
        onHide={() => setShowModalTransactionCategories(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhóm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionCategories />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalTransactionCategories(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalAddTransaction}
        onHide={() => setShowModalAddTransaction(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm giao dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTransaction />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalAddTransaction(false)}
          >
            Huỷ
          </Button>
          <Button
            variant="success"
            onClick={() => setShowModalAddTransaction(false)}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
