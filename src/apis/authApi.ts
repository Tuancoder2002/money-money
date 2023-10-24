import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormLoginData } from "../models/Auths/FormLoginData";
import axiosClient from "./axiosClient";
import FormRegisterData from "../models/Auths/FormRegisterData";

const authApi = {
  login: createAsyncThunk(
    "auth/login",
    async (formLoginData: FormLoginData): Promise<string> => {
      const url = "/auth/login";
      formLoginData.username = formLoginData.email;
      return axiosClient().post(url, formLoginData);
    }
  ),
  register: createAsyncThunk(
    "auth/register",
    async (formRegisterData: FormRegisterData): Promise<string> => {
      const url = "/auth/register";
      // Gửi yêu cầu POST để đăng ký người dùng và trả về thông báo hoặc mã trạng thái tương ứng từ API
      return axiosClient().post(url, formRegisterData);
    }
  ),
  getUserInfo(): Promise<any> {
    const url = "/auth";
    return axiosClient().get(url);
  },
};

export default authApi;
