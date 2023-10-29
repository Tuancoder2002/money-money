import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormLoginData, IRegisterRequest } from "../models/Auths";
import axiosClient from "./axiosClient";

const authApi = {
  login: createAsyncThunk("auth/login", async (formLoginData: FormLoginData): Promise<string> => {
    const url = "/auth/login";
    formLoginData.username = formLoginData.email;
    return axiosClient().post(url, formLoginData);
  }),
  getUserInfo(): Promise<any> {
    const url = "/auth";
    return axiosClient().get(url);
  },
  register: createAsyncThunk("auth/register", async (input: IRegisterRequest) => {
    return axiosClient().post('/auth/register', input);
  })
};

export default authApi;
