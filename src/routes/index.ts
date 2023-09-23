import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home";
import Chart from "../page/Chart";

//nhung router khong can dang nhap van xem duoc
const publicRoutes = [
  { path: "/", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/home", component: Home },
  { path: "/chart", component: Chart },

];

// nhung router dang nhap moi xem duoc
const privateRoutes = [
  
];

export { publicRoutes};
