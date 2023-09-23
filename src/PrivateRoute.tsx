import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

// Khai báo kiểu dữ liệu cho Redux state
interface RootState {
    auth: {
      isAuthenticated: boolean;
      // Thêm các thuộc tính khác của auth state nếu cần
    };
    // Khai báo các state khác của ứng dụng nếu có
  }
  

  const PrivateRoute = ({ element, ...rest }: { element: ReactNode }) => {
    // Sử dụng kiểu dữ liệu RootState cho useSelector
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
