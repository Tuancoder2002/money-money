import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function DefaultLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <div className="d-flex" style={{ backgroundColor: "#dbdbdb" }}>
        <Sidebar />
        <div className="flex-grow-1">{children || <Outlet />}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
