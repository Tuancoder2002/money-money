import { FormLoginData } from "../models/Auths/FormLoginData";
import axiosClient from "./axiosClient";

const authApi = {
  login(formLoginData: FormLoginData): Promise<string> {
    const url = "/auth/login";
    formLoginData.username = formLoginData.email;
    return axiosClient().post(url, formLoginData);
  },
  getUserInfo(): Promise<any> {
    const url = "/auth";
    return axiosClient().get(url);
  },
};

export default authApi;
