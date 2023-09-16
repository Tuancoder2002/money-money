import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
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
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/370268855_1695003577662262_8933963674553939351_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=6e0f69&_nc_ohc=K1Gv9wIxRg8AX80NJ_r&_nc_oc=AQkV1tQ3XPMkq4s9aYSjnCo50j-HC1ejy7gX12_wV-NQx0Wp8k5386seA4TYj8c15iNe77X8y36UyYeSaL1Yai-5&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfDkZhTAhnx1WUNWFkuJZHU6o2i0-ZFIbr-FvhNgqYU7hQ&oe=650826F4" // Thay thế bằng đường dẫn của hình ảnh avatar
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
