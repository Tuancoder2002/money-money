import { useEffect, useState } from "react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import { ITransactionsModel } from "../../../models/Transactions/ITransactions";
import transactionsApi from "../../../apis/transactionsApi";

function Transactions() {
  const [viviData, setViviData] = useState<ITransactionsModel[]>([]);

  useEffect(() => {
    transactionsApi.getAll({}).then((res) => {
      setViviData(res.data);
    });
  }, []);
  
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
              <Row>
                <Col>
                <ul className="list-unstyled m-2" style={{ fontSize: "14px" }}>
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
                      <span className="p-1 d-flex justify-content-center text-success">
                        <a
                          className="nav-link"
                          href="/"
                          aria-current="page"
                          style={{ color: "#2db84c", textDecoration: "none" }}
                        >
                          XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                        </a>
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
                  style={{ fontSize: "14px" }}
                >
                  THÁNG NÀY
                </span>
              }
            >
              <Row>
                <Col>
                  <ul className="list-unstyled m-2" style={{ fontSize: "14px" }}>
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
                      <span className="p-1 d-flex justify-content-center text-success">
                        <a
                          className="nav-link"
                          href="/"
                          aria-current="page"
                          style={{ color: "#2db84c", textDecoration: "none" }}
                        >
                          XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                        </a>
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
                <ul className="list-unstyled m-2" style={{ fontSize: "14px" }}>
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
                      <span className="p-1 d-flex justify-content-center text-success">
                        <a
                          className="nav-link"
                          href="/"
                          aria-current="page"
                          style={{ color: "#2db84c", textDecoration: "none" }}
                        >
                          XEM BÁO CÁO CHO GIAI ĐOẠN NÀY
                        </a>
                      </span>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default Transactions;
