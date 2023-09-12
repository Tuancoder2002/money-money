
import Sidebar from "../../component/GlobalStyles/Sidebar";
import Header from "../../component/GlobalStyles/Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";


const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("app__container")}>
      <Header />
      <div className={cx("app__wrapper")}>
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
