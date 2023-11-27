import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountUser from "../AccountUser";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Building,
  CalendarDateFill,
  CaretDownFill,
  ChevronRight,
  EmojiFrown,
  EyeFill,
  List,
  PersonFill,
  Search,
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
// import { useAppDispatch } from "../../../redux/hooks";

import classNames from "classnames";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import { showModal } from "../../../redux/modalSlice";
import PaymentAccountsHeaderComponent from "../PaymentAccountsHeaderComponent";
import { IPaymentAccountView } from "../../../models/PaymentAccounts/IPaymentAccountView";
import { selectPaymentAccountViews, selectSelectedPaymentAccountView } from "../../../redux/paymentAccountReducer";
import { selectSelectedVivi, setSelectedVivi } from "../../../redux/listUserSlice";

const cx = classNames.bind(styles);

function Header() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [viviData, setViviData] = useState<ITransactionsModel[]>([]);
  const navigate = useNavigate();
  const [showModalListUser, setShowModalListUser] = useState(false);
  const [showModalAccountUser, setShowModalAccountUser] = useState(false);
  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [headerData, setHeaderData] = useState<IPaymentAccountView>();
  const selectedVivi = useSelector(selectSelectedVivi);
  const paymentAccountViews = useSelector(selectPaymentAccountViews);

  useEffect(() =>{
    setHeaderData(paymentAccountViews.find(e => e.id === selectedVivi?.id));
  },[selectedVivi,paymentAccountViews])

  const handleIconClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
    setShowDatePicker(false);
  };
  // const updateHeaderData = (vivi: IPaymentAccountView) => {
  //   const updatedHeaderData = { ...headerData };
  //   updatedHeaderData.cash = vivi.currentMoney ?? vivi.initialMoney;
  //   updatedHeaderData.nameVi = vivi.name;
  //   updatedHeaderData.imgVi = vivi.icon;
  //   setHeaderData(updatedHeaderData);
  // };

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
          
          src={headerData?.icon || 'icon.png'}
          alt="Avatar"
          className={cx("avatar", "m-2")}
          style={{ borderRadius: "50%", height: "35px", width: "35px" }}
        />
        <NavbarBrand
          className="me-auto"
          style={{ fontSize: "12px", color: "#fff",  cursor: "pointer", }}
          onClick={openModalListUser}
        >
        
          {headerData?.name || 'Chưa chọn ví'}
          
          <CaretDownFill
            size={10}
            className={cx("m-2", "icon")}
            
          />
          <div
            style={{
              fontSize: "13px",
              marginLeft: "1px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {headerData?.currentMoney || headerData?.initialMoney || 'Hãy chọn ví'}
          </div>
        </NavbarBrand>
        <CalendarDateFill
          size={20}
          className={cx("m-2", "icon")}
          onClick={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <div className="calendar-container">
            <DatePicker
              inline
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              showMonthDropdown
            />
            <div className="current-date">
              {startDate && format(startDate, "dd/MM/yyyy", { locale: vi })}
            </div>
            <button onClick={() => setShowDatePicker(false)}>Đóng</button>
          </div>
        )}

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
      <PaymentAccountsHeaderComponent
        closeModal={closeModalListUser}
        isShow={showModalListUser}
      />
    </div>
  );
}

export default Header;
