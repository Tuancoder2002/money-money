// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import modalReducer from "./modalSlice";
import listUserReducer from "./listUserSlice"; // Thêm đoạn import này
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
  listUser: listUserReducer, // Sử dụng listUserReducer cho listUser
  transaction: transactionReducer,
});

export default rootReducer;
