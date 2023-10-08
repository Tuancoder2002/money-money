import { FC, useEffect } from "react";

import classNames from "classnames/bind";
import authApi from "../../apis/authApi";
import Transactions from "../../component/DefaultLayout/Transactions";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Home:FC = () => {
  useEffect(() => {
    authApi
      .getUserInfo()
      .then((res) => {
        console.log(res.json());
      })
      .catch((errr) => {
        console.error(errr);
      });
  }, []);
  return (
    // <div className={cx("app__container")}>
    //   <Header />
    //   <div className={cx("app__wrapper")}>
    //     <Sidebar />
    //     <div className="container mt-5">
    //       <div className="row">
    //         <div className="col-md-6 mx-auto">
    //           <table
    //             className="table table-bordered mx-auto"
    //             style={{ width: "450px" }}
    //           >
    //             <Transactions />
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="">
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
  );
}

export default Home;
