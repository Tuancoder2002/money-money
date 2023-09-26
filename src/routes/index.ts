import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home";
import Chart from "../page/Chart";
import Wallets from "../page/Wallets";
import Categories from "../page/Categories";

//nhung router khong can dang nhap van xem duoc
const publicRoutes = [
  { path: "/", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },

];

// nhung router dang nhap moi xem duoc
const privateRoutes = [
  { path: "/home", component: Home },
  { path: "/chart", component: Chart },
  { path: "/wallet", component: Wallets },
  { path: "/categories", component: Categories },

];

export { publicRoutes, privateRoutes};
