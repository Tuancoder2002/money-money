import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home";

//nhung router khong can dang nhap van xem duoc
const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home}
];

// nhung router dang nhap moi xem duoc

export { publicRoutes };
