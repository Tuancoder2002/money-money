import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Collapse, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import transactionsApi from "../../../apis/transactionsApi";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import { toast } from "react-toastify";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { hideModal } from "../../../redux/modalSlice";
import UncontrolledExample from "../Carousel";
import { selectSelectedVivi } from "../../../redux/listUserSlice";
import {
  selectMoneyLastMonth,
  selectMoneyNowMonth,
  selectTotalMoney,
  selectTransactions,
  transactionActions,
} from "../../../redux/transactionReducer";
import { IFilterBodyRequest } from "../../../models/Bases/IFilterBodyRequest";
import { useAppDispatch } from "../../../redux/hooks";
import {
  paymentAccountActions,
  selectPaymentAccountViews,
} from "../../../redux/paymentAccountReducer";

const Transactions: React.FC = () => {
  const currentDate = new Date().toISOString().slice(0, 16);
  const transactionData = useSelector(selectTransactions);
  const moneyLastMonth = useSelector(selectMoneyLastMonth);
  const moneyNowMonth = useSelector(selectMoneyNowMonth);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransactionsModel | null>(null);
  const viviData = useSelector(selectPaymentAccountViews);
  // const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  // const handleShowDetails = (vivi: ITransactionsModel) => {
  //   setSelectedTransaction(vivi);
  //   setShowTransactionDetails(true);
  // };

  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [modalUpdateTransaction, setModalUpdateTransaction] = useState(false);

  const [editTransactionAmount, setEditTransactionAmount] = useState(0);
  const [editFromPaymentAccountId, setFromPaymentAccountId] = useState("");
  const [editTransactionDate, setEditTransactionDate] = useState("");
  const [editTransactionDescription, setEditTransactionDescription] =
    useState("");
  const [collapsedLast, setCollapsedLast] = useState(true);
  const [collapsedNow, setCollapsedNow] = useState(true);

  const toggleTransactionsLast = () => setCollapsedLast(!collapsedLast);
  const toggleTransactionsNow = () => setCollapsedNow(!collapsedNow);

  const accountIdToFilter = useSelector(selectSelectedVivi);
  const totalMoney = useSelector(selectTotalMoney);

  useEffect(() => {
    const { moneyLastMonthInByAccount, moneyLastMonthOutByAccount } =
      transactionData.reduce(
        (totals, vivi) => {
          if (
            vivi.fromPaymentAccountId === accountIdToFilter &&
            vivi.transactionDate
          ) {
            const transactionDate = new Date(vivi.transactionDate);
            const isSameMonth =
              transactionDate.getMonth() + 1 === currentMonth - 1;
            const isSameYear = transactionDate.getFullYear() === currentYear;

            if (isSameMonth && isSameYear) {
              const amount = Number(vivi.amount);
              if (!isNaN(amount)) {
                if (amount > 0) {
                  totals.moneyLastMonthInByAccount += amount;
                } else {
                  totals.moneyLastMonthOutByAccount += amount;
                }
              }
            }
          }
          return totals;
        },
        { moneyLastMonthInByAccount: 0, moneyLastMonthOutByAccount: 0 }
      );
    dispatch(
      transactionActions.setMoneyLastMonth({
        in: moneyLastMonthInByAccount,
        out: moneyLastMonthOutByAccount,
      })
    );

    const { moneyNowMonthInByAccount, moneyNowMonthOutByAccount } =
      transactionData.reduce(
        (totals, vivi) => {
          if (
            vivi.fromPaymentAccountId === accountIdToFilter &&
            vivi.transactionDate
          ) {
            const transactionDate = new Date(vivi.transactionDate);
            const isSameMonth = transactionDate.getMonth() + 1 === currentMonth;
            const isSameYear = transactionDate.getFullYear() === currentYear;

            if (isSameMonth && isSameYear) {
              const amount = Number(vivi.amount);
              if (!isNaN(amount)) {
                if (amount > 0) {
                  totals.moneyNowMonthInByAccount += amount;
                } else {
                  totals.moneyNowMonthOutByAccount += amount;
                }
              }
            }
          }
          return totals;
        },
        { moneyNowMonthInByAccount: 0, moneyNowMonthOutByAccount: 0 }
      );
    dispatch(
      transactionActions.setMoneyNowMonth({
        in: moneyNowMonthInByAccount,
        out: moneyNowMonthOutByAccount,
      })
    );
    dispatch(
      transactionActions.setTotalMoney(
        initialMoney + moneyLastMonthInByAccount + moneyLastMonthOutByAccount
      )
    );
  }, [accountIdToFilter]);

  // const handleEditTransactionDetails = (vivi: ITransactionsModel) => {
  //   setFromPaymentAccountId(vivi.fromPaymentAccountName || "");
  //   setModalUpdateTransaction(true);
  // };

  const fetchTransactionData = async () => {
    try {
      const request: IFilterBodyRequest = {};
      const response = await dispatch(transactionsApi.getAll(request));

      if (transactionsApi.getAll.fulfilled.match(response)) {
        const responseData = response.payload.data; // Lấy mảng dữ liệu từ IBasePaging

        dispatch(transactionActions.setTransactions(responseData));

        const tongChiTieu = responseData.reduce(function (current, next) {
          return current + next.amount;
        }, 0);

        // Todo: Lấy tài khoản thanh toán hiện tại dựa trên logic cụ thể
        let currentPaymentAccount = viviData.find((v) => v.id === accountIdToFilter);
        console.log("hello",currentPaymentAccount)
        if (currentPaymentAccount != null) {
          currentPaymentAccount.currentMoney =
            currentPaymentAccount.initialMoney + tongChiTieu;
        }
        dispatch(paymentAccountActions.setOrUpdatePaymentAccountView);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  };

  // Hàm này sẽ gọi API để lấy danh sách ví và cập nhật vào state khi component được render.
  const fetchViviData = async () => {
    try {
      dispatch(paymentAccountApi.getAll({}))
        .unwrap()
        .then((response) => {
          dispatch(paymentAccountActions.setPaymentAccountViews(response.data));
        })
        .catch((error) => {});
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ví:", error);
    }
  };
  useEffect(() => {
    fetchViviData();
    fetchTransactionData();
  }, []);

  const handleAddTransactions = async () => {
    const newVivi = {
      amount: editTransactionAmount,
      transactionDate: editTransactionDate,
      fromPaymentAccountId: editFromPaymentAccountId,
      description: editTransactionDescription,
    };

    try {
      const response = await dispatch(transactionsApi.create(newVivi));

      if (transactionsApi.create.fulfilled.match(response)) {
        const responseData = response.payload; // Dữ liệu phản hồi từ createAsyncThunk

        if (responseData.id != null) {
          const updatedViviData = [...transactionData, responseData];
          dispatch(transactionActions.setTransactions(updatedViviData));
          setShowModalAddTransaction(false);
        }
      }
    } catch (error) {
    }
  };

  const handleSaveViviDetails = async () => {
    if (selectedTransaction && selectedTransaction.id) {
      const updatedTransactionData = [...transactionData];
      const editedTransactionIndex = updatedTransactionData.findIndex(
        (vivi) => vivi.id === selectedTransaction.id
      );

      if (editedTransactionIndex !== -1) {
        // Đừng thay đổi giá trị của 'id' của giao dịch khi cập nhật
        // updatedTransactionData[editedTransactionIndex].id = editFromPaymentAccountId;

        try {
          const response = await dispatch(
            transactionsApi.update({
              id: selectedTransaction.id,
              data: updatedTransactionData[editedTransactionIndex],
            })
          );

          if (transactionsApi.update.fulfilled.match(response)) {
            const responseData = response.payload; // Dữ liệu phản hồi từ createAsyncThunk

            dispatch(
              transactionActions.setTransactions(updatedTransactionData)
            );
            setModalUpdateTransaction(false);
            toast.success("Thông tin ví đã được cập nhật thành công.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error("Không thể cập nhật thông tin ví.", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          toast.error("Không thể cập nhật thông tin ví.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("Không thể cập nhật thông tin ví.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  console.log("accountIdToFilter:", accountIdToFilter);
  // Lấy tháng và năm hiện tại
  const currentMonth = new Date().getMonth() + 1; // T``háng bắt đầu từ 0
  const currentYear = new Date().getFullYear();

  const isModalVisible = useSelector(
    (state: RootState) => state.modal.isModalVisible
  );
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(hideModal());
  };
  const initialMoney = useSelector(
    (state: RootState) => state.listUser.selectedVivi?.initialMoney ?? 0
  );

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <Row>
              <Col
                style={{
                  borderRadius: "30px",
                  boxShadow: "0 0 5px #6074b3",
                  backgroundColor: "rgba(54, 19, 84, 0.8)",
                  color: "#fff",
                  margin: "10px",
                }}
              >
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                  <Tab
                    eventKey={1}
                    title={
                      <span
                        className={`${"custom-tab-title"} custom-active-tab`}
                        style={{ fontSize: "16px" }}
                      >
                        THÁNG TRƯỚC
                      </span>
                    }
                  >
                    <Row>
                      <Col>
                        <ul
                          className="list-unstyled m-2"
                          style={{ fontSize: "14px" }}
                        >
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền vào:</span>
                              <span className="text-success">
                                + {initialMoney ? moneyLastMonth.in : 0}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền ra:</span>
                              <span className="text-danger">
                                {initialMoney ? moneyLastMonth.out : 0}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tổng tiền của tháng:</span>
                              <span className="" style={{ color: "#fff" }}>
                                {/* {(initialMoney ? moneyLastMonthInByAccount : 0) +
                                  (initialMoney ? moneyLastMonthOutByAccount : 0) +
                                  (initialMoney ?? 0)} */}
                                {totalMoney}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              className="p-1 d-flex justify-content-center text-success"
                              onClick={toggleTransactionsLast}
                            >
                              <span
                                className="nav-link"
                                style={{
                                  color: "#2db84c",
                                  cursor: "pointer",
                                }}
                              >
                                XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                              </span>
                            </span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab
                    eventKey={2}
                    title={
                      <span
                        className={`${"custom-tab-title"} custom-active-tab`}
                        style={{ fontSize: "16px" }}
                      >
                        THÁNG NÀY
                      </span>
                    }
                  >
                    <Row>
                      <Col>
                        <ul
                          className="list-unstyled m-2"
                          style={{ fontSize: "14px" }}
                        >
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền vào:</span>
                              <span className="text-success">
                                + {initialMoney ? moneyNowMonth.in : 0}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền ra:</span>
                              <span className="text-danger">
                                {initialMoney ? moneyNowMonth.out : 0}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tổng tiền của tháng:</span>
                              <span className="" style={{ color: "#fff" }}>
                                {/* {(initialMoney ? moneyNowMonthInByAccount : 0) +
                                  (initialMoney ? moneyNowMonthOutByAccount : 0) +
                                  (initialMoney ?? 0)} */}
                                {totalMoney +
                                  moneyNowMonth.in +
                                  moneyNowMonth.out}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              className="p-1 d-flex justify-content-center text-success"
                              onClick={toggleTransactionsNow}
                            >
                              <span
                                className="nav-link"
                                style={{
                                  color: "#2db84c",
                                  cursor: "pointer",
                                }}
                              >
                                XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                              </span>
                            </span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab
                    eventKey={3}
                    title={
                      <span
                        className={`${"custom-tab-title"} custom-active-tab`}
                        style={{ fontSize: "16px" }}
                      >
                        TƯƠNG LAI
                      </span>
                    }
                  >
                    <Row>
                      <Col>
                        <ul
                          className="list-unstyled m-2"
                          style={{ fontSize: "14px" }}
                        >
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền vào</span>
                              <span className="text-primary">3.000.000</span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền ra</span>
                              <span className="text-danger">300.000</span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span></span>
                              <span className="" style={{ color: "#fff" }}>
                                + 2.700.000
                              </span>
                            </span>
                          </li>
                          <li>
                            <span
                              className="p-1 d-flex justify-content-center text-success"
                              onClick={toggleTransactionsNow}
                            >
                              <span
                                className="nav-link"
                                style={{ color: "#2db84c", cursor: "pointer" }}
                              >
                                XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                              </span>
                            </span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
                {/* ******************************************************************************************************** */}
                <Collapse isOpen={!collapsedLast} navbar>
                  <Nav navbar>
                    <NavItem>
                      {transactionData
                        .filter(
                          (vivi) =>
                            vivi.fromPaymentAccountId === accountIdToFilter &&
                            vivi.transactionDate && // Check if transactionDate is defined
                            new Date(vivi.transactionDate).getMonth() + 1 ===
                              currentMonth - 1 &&
                            new Date(vivi.transactionDate).getFullYear() ===
                              currentYear
                        )
                        .map((vivi, index) => (
                          <NavLink
                            key={vivi.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => setModalUpdateTransaction(true)}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="d-flex">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6913/6913041.png" // Thay thế bằng đường dẫn của hình ảnh avatar
                                  alt="Avatar"
                                  style={{ width: "30px", height: "30px" }}
                                  className="m-1"
                                />
                                <NavbarBrand
                                  className="me-auto"
                                  style={{ fontSize: "12px" }}
                                >
                                  {vivi.fromPaymentAccountName}
                                  <div
                                    style={{
                                      fontSize: "13px",
                                      marginLeft: "1px",
                                    }}
                                  >
                                    {vivi.transactionDate}
                                  </div>
                                </NavbarBrand>
                              </div>
                              <div className="d-flex flex-column">
                                <span
                                  style={{ color: "#fff", fontSize: "14px" }}
                                >
                                  {vivi.amount}
                                </span>
                                <span
                                  style={{ color: "#e94b4b", fontSize: "14px" }}
                                >
                                  {vivi.description}
                                </span>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                    </NavItem>
                  </Nav>
                </Collapse>

                {/* ******************************************************************************************************** */}
                <Collapse isOpen={!collapsedNow} navbar>
                  <Nav navbar>
                    <NavItem>
                      {transactionData
                        .filter(
                          (vivi) =>
                            vivi.fromPaymentAccountId === accountIdToFilter &&
                            vivi.transactionDate && // Check if transactionDate is defined
                            new Date(vivi.transactionDate).getMonth() + 1 ===
                              currentMonth &&
                            new Date(vivi.transactionDate).getFullYear() ===
                              currentYear
                        )
                        .map((vivi, index) => (
                          <NavLink
                            key={vivi.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => setModalUpdateTransaction(true)}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="d-flex">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6913/6913041.png" // Thay thế bằng đường dẫn của hình ảnh avatar
                                  alt="Avatar"
                                  style={{ width: "30px", height: "30px" }}
                                  className="m-1"
                                />
                                <NavbarBrand
                                  className="me-auto"
                                  style={{ fontSize: "12px" }}
                                >
                                  {vivi.fromPaymentAccountName}
                                  <div
                                    style={{
                                      fontSize: "13px",
                                      marginLeft: "1px",
                                    }}
                                  >
                                    {vivi.transactionDate}
                                  </div>
                                </NavbarBrand>
                              </div>
                              <div className="d-flex flex-column">
                                <span
                                  style={{ color: "#fff", fontSize: "14px" }}
                                >
                                  {vivi.amount}
                                </span>
                                <span
                                  style={{ color: "#e94b4b", fontSize: "14px" }}
                                >
                                  {vivi.description}
                                </span>
                              </div>
                            </div>
                          </NavLink>
                        ))}
                    </NavItem>
                  </Nav>
                </Collapse>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <UncontrolledExample />
      {/* ******************************************************************************************************** */}
      <Modal show={isModalVisible} onHide={() => handleCloseModal()} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm giao dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around align-items-center">
            <Form.Select
              size="lg"
              aria-label="Default select example"
              className="m-2"
              value={editFromPaymentAccountId}
              onChange={(e) => setFromPaymentAccountId(e.target.value)}
            >
              <option>Ví</option>
              {viviData.map((vivi, index) => (
                <option value={vivi.id} key={vivi.id}>
                  {vivi.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              size="lg"
              aria-label="Default select example"
              className="m-2"
            >
              <option>Nhóm</option>

              <option value="1"></option>
            </Form.Select>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Số tiền"
              size="lg"
              className="m-2"
              value={editTransactionAmount}
              onChange={(e) => setEditTransactionAmount(+e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <Form.Control
              type="datetime-local"
              placeholder="Ngày giao dịch"
              size="lg"
              className="m-2"
              value={editTransactionDate}
              // defaultValue={currentDate}
              onChange={(e) => setEditTransactionDate(e.target.value)}
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ghi chú"
              value={editTransactionDescription}
              onChange={(e) => setEditTransactionDescription(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hideModal())}>
            Huỷ
          </Button>
          <Button variant="success" onClick={handleAddTransactions}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ******************************************************************************************************** */}

      <Modal
        show={modalUpdateTransaction}
        onHide={() => setModalUpdateTransaction(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật giao dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around align-items-center">
            <Form.Select
              size="lg"
              aria-label="Default select example"
              className="m-2"
              value={editFromPaymentAccountId}
              onChange={(e) => setFromPaymentAccountId(e.target.value)}
            >
              <option>Ví</option>
              {viviData.map((vivi, index) => (
                <option value={vivi.id} key={vivi.id}>
                  {vivi.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              size="lg"
              aria-label="Default select example"
              className="m-2"
            >
              <option>Nhóm</option>

              <option value="1"></option>
            </Form.Select>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Số tiền"
              size="lg"
              className="m-2"
              value={editTransactionAmount}
              onChange={(e) => setEditTransactionAmount(+e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <Form.Control
              type="date"
              placeholder="Ngày giao dịch"
              size="lg"
              className="m-2"
              value={editTransactionDate}
              onChange={(e) => setEditTransactionDate(e.target.value)}
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ghi chú"
              value={editTransactionDescription}
              onChange={(e) => setEditTransactionDescription(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalAddTransaction(false)}
          >
            Huỷ
          </Button>
          <Button variant="success" onClick={handleSaveViviDetails}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ******************************************************************************************************** */}
    </div>
  );
};

export default Transactions;
