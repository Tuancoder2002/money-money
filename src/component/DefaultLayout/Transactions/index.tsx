import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Collapse, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import transactionsApi from "../../../apis/transactionsApi";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import { toast } from "react-toastify";
import { IPaymentAccountModel } from "../../../models/PaymentAccounts/IPaymentAccount";
import paymentAccountApi from "../../../apis/paymentAccountApi";


function Transactions() {
  const [transactionData, setTransactionData] = useState<ITransactionsModel[]>(
    []
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransactionsModel | null>(null);
  const [viviData, setViviData] = useState<IPaymentAccountModel[]>([]);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const handleShowDetails = (vivi: ITransactionsModel) => {
    setSelectedTransaction(vivi);
    setShowTransactionDetails(true);
  };

  const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);
  const [modalUpdateTransaction, setModalUpdateTransaction] = useState(false);

  const [editTransactionAmount, setEditTransactionAmount] = useState("");
  const [editFromPaymentAccountId, setFromPaymentAccountId] = useState("");
  const [editTransactionDate, setEditTransactionDate] = useState("");
  const [editTransactionDescription, setEditTransactionDescription] =
    useState("");

  const handleEditTransactionDetails = (vivi: ITransactionsModel) => {
    setFromPaymentAccountId(vivi.fromPaymentAccountName || "");
    setModalUpdateTransaction(true);
  };

  useEffect(() => {
    // Hàm này sẽ gọi API để lấy danh sách ví và cập nhật vào state khi component được render.
    const fetchData = async () => {
      try {
        const response = await paymentAccountApi.getAll({});
        setViviData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ví:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await transactionsApi.getAll({});
        setTransactionData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTransactions = async () => {
    const newVivi = {
      amount: editTransactionAmount,
      transactionDate: editTransactionDate,
      fromPaymentAccountId: editFromPaymentAccountId,
      description: editTransactionDescription,
    };

    try {
      const response = await transactionsApi.create(newVivi);
      if (response.id != null) {
        const updatedViviData = [...transactionData, response];
        setTransactionData(updatedViviData);
        setShowModalAddTransaction(false);
        toast.success("Thêm giao dịch thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Có lỗi khi thêm giao dịch", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error when creating a transaction", error);
      toast.error("Có lỗi khi thêm giao dịch", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSaveViviDetails = async () => {
    if (selectedTransaction && selectedTransaction.id) {
      const updatedTransactionData = [...transactionData];
      const editedTransactionIndex = updatedTransactionData.findIndex(
        (vivi) => vivi.id === selectedTransaction.id
      );
      if (editedTransactionIndex !== -1) {
        updatedTransactionData[editedTransactionIndex].id =
          editFromPaymentAccountId;
        try {
          await transactionsApi.update(
            selectedTransaction.id,
            updatedTransactionData[editedTransactionIndex]
          );
          setTransactionData(updatedTransactionData);
          setModalUpdateTransaction(false);
          toast.success("Thông tin ví đã được cập nhật thành công.", {
            position: toast.POSITION.TOP_RIGHT,
          });
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

  const [collapsedLast, setCollapsedLast] = useState(true);
  const [collapsedNow, setCollapsedNow] = useState(true);

  const toggleTransactionsLast = () => setCollapsedLast(!collapsedLast);
  const toggleTransactionsNow = () => setCollapsedNow(!collapsedNow);

  const positiveAmounts = transactionData.filter(
    (vivi) =>
      vivi.amount !== undefined &&
      vivi.amount !== null &&
      !isNaN(Number(vivi.amount)) &&
      Number(vivi.amount) > 0
  );

  const negativeAmounts = transactionData.filter(
    (vivi) =>
      vivi.amount !== undefined &&
      vivi.amount !== null &&
      !isNaN(Number(vivi.amount)) &&
      Number(vivi.amount) < 0
  );

  const totalMoney = viviData.filter(
    (vivi) =>
      vivi.initialMoney !== undefined &&
      vivi.initialMoney !== null &&
      !isNaN(Number(vivi.initialMoney)) &&
      Number(vivi.initialMoney) > 0
  );

  const moneyUser = totalMoney.reduce(
    (total, vivi) => total + Number(vivi.initialMoney),
    0
  );

  const totalMoneyIn = positiveAmounts.reduce(
    (total, vivi) => total + Number(vivi.amount),
    0
  );

  const totalMoneyOut = negativeAmounts.reduce(
    (total, vivi) => total + Number(vivi.amount),
    0
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
                        style={{ fontSize: "16px", }}
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
                              <span>Tiền vào</span>
                              <span className="text-primary">
                                {moneyUser + totalMoneyIn}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span>Tiền ra</span>
                              <span className="text-danger">
                                {totalMoneyOut}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="p-1 d-flex justify-content-between">
                              <span></span>
                              <span className="" style={{color: "#fff"}}>
                                {moneyUser + totalMoneyOut}
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
                              <span className="" style={{color: "#fff"}}>
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
                              <span className=""style={{color: "#fff"}}>
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
                <Collapse isOpen={!collapsedLast} navbar>
                  <Nav navbar>
                    <NavItem>
                      {transactionData.map((vivi, index) => (
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
                <Collapse isOpen={!collapsedNow} navbar>
                  <Nav navbar>
                    <NavItem>
                      {transactionData.map((vivi, index) => (
                        <NavLink key={vivi.id} style={{ cursor: "pointer" }}>
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
                            <span
                              style={{ color: "#000000", fontSize: "13px" }}
                            >
                              {vivi.amount}
                            </span>
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
      {/* <button onClick={() => setShowModalAddTransaction(true)}>
        Thêm giao dịch
      </button> */}
      <Modal
        show={showModalAddTransaction}
        onHide={() => setShowModalAddTransaction(false)}
        size="lg"
      >
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
              onChange={(e) => setEditTransactionAmount(e.target.value)}
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
          <Button variant="success" onClick={handleAddTransactions}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

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
              onChange={(e) => setEditTransactionAmount(e.target.value)}
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
    </div>
  );
}

export default Transactions;
