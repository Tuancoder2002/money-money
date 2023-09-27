import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import DefaultLayout from "./component/DefaultLayout";
import { Fragment } from "react";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute


// Định nghĩa kiểu dữ liệu cho đối tượng route
interface RouteType {
  path: string;
  layout?: React.ComponentType | null;
  component: React.ComponentType;
}

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route: RouteType, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          
          {privateRoutes.map((route: RouteType, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
