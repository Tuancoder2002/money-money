import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DefaultLayout() {
  return (
    <div className=""style={{
      background:
        "linear-gradient(rgba(64, 6, 97, 0.4), rgba(64, 6, 97, 0.4)), url('https://khoatranvn00.github.io/travelix/assets/images/bg_header.webp') top center / cover no-repeat",
    }}>
      <Header />
      <div
        className="d-flex"
        
      >
        <Sidebar />
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
