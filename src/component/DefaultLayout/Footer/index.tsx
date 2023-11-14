import React from "react";

const Footer = (): JSX.Element => (
  <footer
    className="page-footer font-small blue pt-4"
    style={{ backgroundColor: "rgba(27, 12, 40, 0.8)" }}
  >
    <div
      className="container-fluid text-center text-md-left"
      style={{ color: "#757575 " }}
    >
      <div className="row">
        <div className="col-md-6 col-xs-12 mt-md-0 mt-3">
          <h5 className="text-uppercase">MANAGE MONEY</h5>
          <p>
          "Định hình Tương lai, Kiểm soát Hiện tại: Manage Money - Nền tảng quản lý tài chính giúp bạn xây dựng tương lai mà bạn muốn."
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 col-xs-12 mt-md-0 mt-3">
          <h5 className="text-uppercase" style={{ fontSize: "12px" }}>
            Chăm sóc khách hàng
          </h5>
          <ul className="list-unstyled" style={{ fontSize: "12px" }}>
            <li>
              <a href="https://chat.openai.com/"className="text-decoration-none"style={{ color: "#757575 " }}>Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=new"className="text-decoration-none"style={{ color: "#757575 " }}>Hỗ trợ qua mail</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 col-xs-12 mt-md-0 mt-3" >
          <h5 className="text-uppercase" style={{ fontSize: "12px" }}>
            Theo dõi
          </h5>
          <ul className="list-unstyled" style={{ fontSize: "12px" }}>
            <li>
              <a href="https://www.facebook.com/tuancodedao" className="text-decoration-none" style={{ color: "#757575 " }}>Facebook</a>
            </li>
            <li>
              <a href="https://github.com/Tuancoder2002"className="text-decoration-none" style={{ color: "#757575 " }}>Github</a>
            </li>
          </ul>
        </div>

        
        
      </div>
    </div>
  </footer>
);

export default Footer;
