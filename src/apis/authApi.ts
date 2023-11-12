import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormLoginData, IRegisterRequest } from "../models/Auths";
import axiosClient from "./axiosClient";

const authApi = {
  login: createAsyncThunk("auth/login", async (formLoginData: FormLoginData): Promise<string> => {
    const url = "/auth/login";
    formLoginData.username = formLoginData.email;
    return axiosClient().post(url, formLoginData);
  }),

  getUserInfo: createAsyncThunk("auth/getUserInfo", async () => {
    const url = "/auth";
    return axiosClient().get(url);
  }),

  register: createAsyncThunk("auth/register", async (input: IRegisterRequest, { dispatch }) => {
    // Dispatch the register request
    const response = await axiosClient().post('/auth/register', input);

    // If registration is successful, dispatch the getUserInfo action to get user information
    if (response.status === 200) {
      dispatch(authApi.getUserInfo());
    }

    return response.data; // You can return any relevant data if needed
  }),
};

export default authApi;
