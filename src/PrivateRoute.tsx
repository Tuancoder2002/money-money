import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Khai báo kiểu dữ liệu cho Redux state
interface RootState {
  auth: {
    isAuthenticated: boolean;
    // Thêm các thuộc tính khác của auth state nếu cần
  };
  // Khai báo các state khác của ứng dụng nếu có
}

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Sử dụng kiểu dữ liệu RootState cho useSelector
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
