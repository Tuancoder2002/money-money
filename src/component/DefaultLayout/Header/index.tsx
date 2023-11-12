import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountUser from "../AccountUser";
import ListUser from "../ListUser";
import styles from "./Header.module.scss";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

import {
  Building,
  CalendarDateFill,
  CaretDownFill,
  ChevronRight,
  EyeFill,
  List,
  PersonFill,
  Search,
  Wallet2,
} from "react-bootstrap-icons";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
} from "reactstrap";

import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import { authActions } from "../../../redux/authReducer";
import { useAppDispatch } from "../../../redux/hooks";

import classNames from "classnames";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import { showModal } from "../../../redux/modalSlice";

const cx = classNames.bind(styles);

function Header() {
  const [viviData, setViviData] = useState<ITransactionsModel[]>([]);
  const navigate = useNavigate();
  const [showModalListUser, setShowModalListUser] = useState(false);
  const [showModalAccountUser, setShowModalAccountUser] = useState(false);
  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [headerData, setHeaderData] = useState<any>({
    imgVi: "icon.png",
    nameVi: "Chưa chọn ví",
    cash: "Hãy chọn ví",
  });
  const updateHeaderData = (vivi: IPaymentAccountModel) => {
    const updatedHeaderData = { ...headerData };
    updatedHeaderData.cash = vivi.initialMoney;
    updatedHeaderData.nameVi = vivi.name;
    updatedHeaderData.imgVi = vivi.icon;
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

  const handleLogout = (event: any) => {
    setShowModalAccountUser(false);
    dispatch(authActions.logout());
    event.preventDefault();
    navigate("/logout");
  };

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(showModal());
  };

  return (
    <div className="wraper-header">
      <Navbar
        style={{
          borderRadius: "1px",
          boxShadow: "0 0 3px #6074b3",
          backgroundColor: "rgba(54, 19, 84, 0.8)",
          color: "#fff",
        }}
        className="d-flex justify-content-evenly"
      >
        <List onClick={toggleNavbar} size={24} className={cx("m-2", "icon")} />
        <img
          src={headerData.imgVi}
          alt="Avatar"
          className={cx("avatar", "m-2")}
          style={{ borderRadius: "50%", height: "35px", width: "35px" }}
        />
        <NavbarBrand
          className="me-auto"
          style={{ fontSize: "12px", color: "#fff" }}
        >
          {headerData.nameVi}
          <CaretDownFill
            size={10}
            className={cx("m-2", "icon")}
            onClick={openModalListUser}
          />
          <div
            style={{
              fontSize: "13px",
              marginLeft: "1px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {headerData.cash}
          </div>
        </NavbarBrand>
        <CalendarDateFill size={20} className={cx("m-2", "icon")} />
        <EyeFill size={20} className={cx("m-2", "icon")} />
        <Search size={20} className={cx("m-2", "icon")} />
        <Button onClick={handleButtonClick} variant="success" className="m-2">
          Thêm giao dịch
        </Button>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }}>
                <Link
                  to="/wallet"
                  className="nav-link"
                  style={{ color: "#fff" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <Wallet2 size={20} className={cx("icon", "mr-1")} />
                      <span>Ví</span>
                    </div>
                    <ChevronRight size={20} className={cx("icon")} />
                  </div>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ cursor: "pointer" }}>
                <Link
                  to="/categories"
                  className="nav-link"
                  style={{ color: "#fff" }}
                >
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
            <NavItem>
              <NavLink
                onClick={handleOpenModalAccountUser}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ color: "#fff" }}
                >
                  <div className="d-flex">
                    <PersonFill size={25} className={cx("icon")} />
                    <span>Quản lý tài khoản</span>
                  </div>
                  <ChevronRight size={20} className={cx("icon")} />
                </div>
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
            <Button variant="secondary" onClick={(e) => handleLogout(e)}>
              Đăng xuất
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      {showModalListUser && (
        <ListUser
          closeModal={closeModalListUser}
          updateHeaderData={updateHeaderData}
        />
      )}
    </div>
  );
}

export default Header;
