import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Collapse, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import transactionsApi from "../../../apis/transactionsApi";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";

function Transactions() {
  const [viviData, setViviData] = useState<ITransactionsModel[]>([]);

  useEffect(() => {
    transactionsApi.getAll({}).then((res) => {
      setViviData(res.data);
    }).catch(err => {
      
    });
  }, []);

  const [collapsed, setCollapsed] = useState(true);

  const toggleTransactions = () => setCollapsed(!collapsed);

  return (
    <div>
      {/* Hàng 1: Các tab */}
      <Row>
        <Col
          style={{
            background: "#fff",
            borderRadius: "5px",
            boxShadow: "0 0 5px #ccc",
          }}
        >
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab
              eventKey={1}
              title={
                <span
                  className={`${"custom-tab-title"} custom-active-tab`}
                  style={{ fontSize: "14px" }}
                >
                  THÁNG TRƯỚC
                </span>
              }
            >
              {viviData.map((vivi, index) => (
                <Row key={vivi.id}>
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
                          <span className="text-danger">{vivi.amount}</span>
                        </span>
                      </li>
                      <li>
                        <span className="p-1 d-flex justify-content-between">
                          <span></span>
                          <span className="text-secondary">+ 2.700.000</span>
                        </span>
                      </li>
                      <li>
                        <span
                          className="p-1 d-flex justify-content-center text-success"
                          onClick={toggleTransactions}
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
              ))}
            </Tab>

            <Tab
              eventKey={2}
              title={
                <span
                  className={`${"custom-tab-title"} custom-active-tab`}
                  style={{ fontSize: "14px" }}
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
                        <span className="text-secondary">+ 2.700.000</span>
                      </span>
                    </li>
                    <li>
                      <span
                        className="p-1 d-flex justify-content-center text-success"
                        onClick={toggleTransactions}
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
                  style={{ fontSize: "14px" }}
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
                        <span className="text-secondary">+ 2.700.000</span>
                      </span>
                    </li>
                    <li>
                      <span
                        className="p-1 d-flex justify-content-center text-success"
                        onClick={toggleTransactions}
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
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink style={{ cursor: "pointer" }}>
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
                        Thứ Năm
                        <div
                          style={{
                            fontSize: "13px",
                            marginLeft: "1px",
                          }}
                        >
                          Tháng Sáu 2019
                        </div>
                      </NavbarBrand>
                    </div>
                    <span style={{ color: "#000000", fontSize: "13px" }}>
                      -200.000
                    </span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ cursor: "pointer" }}>
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
                        Thứ Năm
                        <div
                          style={{
                            fontSize: "13px",
                            marginLeft: "1px",
                          }}
                        >
                          Tháng Sáu 2019
                        </div>
                      </NavbarBrand>
                    </div>
                    <span style={{ color: "#000000", fontSize: "13px" }}>
                      -200.000
                    </span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ cursor: "pointer" }}>
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
                        Thứ Năm
                        <div
                          style={{
                            fontSize: "13px",
                            marginLeft: "1px",
                          }}
                        >
                          Tháng Sáu 2019
                        </div>
                      </NavbarBrand>
                    </div>
                    <span style={{ color: "#000000", fontSize: "13px" }}>
                      -200.000
                    </span>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
