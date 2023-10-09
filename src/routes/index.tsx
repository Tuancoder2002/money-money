import { Navigate, RouteObject } from "react-router-dom";
import DefaultLayout from "../component/DefaultLayout";
import Categories from "../page/Categories";
import Chart from "../page/Chart";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import Wallets from "../page/Wallets";

//nhung router khong can dang nhap van xem duoc
const publicRoutes = [
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },

];

// nhung router dang nhap moi xem duoc
const privateRoutes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/chart", component: Chart },
  { path: "/wallet", component: Wallets },
  { path: "/categories", component: Categories },

];

const appRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Navigate to="/" replace />, },
  { path: "/register", element: <Register /> },
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/home", element: <Home />
      },
      { path: "/chart", element: <Chart /> },
      { path: "/wallet", element: <Wallets /> },
      { path: "/categories", element: <Categories /> }]

  }
];

export { appRoutes, privateRoutes, publicRoutes };

