import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AccountUser from "../AccountUser";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListUser from "../ListUser"

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
  PersonFill,
  Wallet2,
  Building,
  ChevronRight,
} from "react-bootstrap-icons";

import AddTransaction from "../AddTransaction";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
// Định kiểu cho props của Header


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar, faChevronDown, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
  
  const [showModalListUser, setShowModalListUser] = useState(false);
  const [showModalAccountUser, setShowModalAccountUser] = useState(false);

  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [headerData, setHeaderData] = useState<any>({
    // Khởi tạo dữ liệu ban đầu
    imgVi:"logo192.png",
    nameVi:"Chưa chọn ví",
    cash: "Hãy chọn ví",
    // Các trường dữ liệu khác của thẻ tiền mặt
  });
  const updateHeaderData = (vivi: IPaymentAccountModel) => {
    // Tạo một bản sao của dữ liệu hiện tại
    const updatedHeaderData = { ...headerData };
    // Cập nhật các trường dữ liệu của thẻ tiền mặt dựa trên dữ liệu của ví được truyền vào
    updatedHeaderData.cash = vivi.initialMoney; // Sử dụng trường initialMoney của ví
    updatedHeaderData.nameVi = vivi.name;
    updatedHeaderData.imgVi = vivi.icon;
    // Các trường dữ liệu khác tương tự
  
    // Cập nhật state để hiển thị dữ liệu mới
    setHeaderData(updatedHeaderData);
  };
    
  
  const openModalListUser = () => {
    setShowModalListUser(true);
  };

  const closeModalListUser = () => {
    setShowModalListUser(false);
  };
  const handleOpenModalAddTransaction = () => {
    setShowModalAddTransaction(true);
  };
  

  const handleOpenModalAccountUser = () => {
    setShowModalAccountUser(true);
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="wraper-header">
      <Navbar
        color="#fff"
     
        style={{
          
          borderRadius: "1px",
          boxShadow: "0 0 5px #ccc",
        }}
        className="d-flex"
      >
        <List onClick={toggleNavbar} size={24} className={cx("m-2", "icon")} />
        <img
          src={headerData.imgVi} // Thay thế bằng đường dẫn của hình ảnh avatar
          alt="Avatar"
          className={cx("avatar", "m-2")}
        />
        <NavbarBrand className="me-auto" style={{ fontSize: "12px" }}>
        {headerData.nameVi}
          <CaretDownFill size={10} className={cx("m-2", "icon")} onClick={openModalListUser}/>
          <div
            style={{
              fontSize: "13px",
              marginLeft: "1px",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
          {headerData.cash} {/* Hiển thị số tiền từ headerData */}
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
              <NavLink
                onClick={handleOpenModalAccountUser}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <PersonFill size={25} className={cx("icon")} />

                    <span>Quản lý tài khoản</span>
                  </div>
                  <ChevronRight size={20} className={cx("icon")} />
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }}>
                <Link to="/wallet" className="nav-link">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Wallet2 size={22} className={cx("icon", "mr-1")} />

                      <span>Ví của tôi</span>
                    </div>
                    <ChevronRight size={20} className={cx("icon")} />
                  </div>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                
                style={{ cursor: "pointer" }}
              >
                <Link to="/categories" className="nav-link">

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <Building size={22} className={cx("icon")} />

                    <span>Nhóm</span>
                  </div>
                  <ChevronRight size={20} className={cx("icon")} />
                </div>
                </Link>

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

      {showModalListUser && <ListUser closeModal={closeModalListUser} updateHeaderData={updateHeaderData} />}

    </div>
  );
}

export default Header;
