import React from "react";
import Sidebar from "../../component/GlobalStyles/Sidebar";
import Header from "../../component/GlobalStyles/Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Transactions from "../../component/GlobalStyles/Transactions";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("app__container")}>
      <Header />
      <div className={cx("app__wrapper")}>
        <Sidebar />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <table
                className="table table-bordered mx-auto"
                style={{ width: "450px" }}
              >
                <Transactions />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
