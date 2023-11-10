import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
export const contentTypeFormData = "multipart/form-data";
const axiosClient = (contentType: any = "application/json") => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": contentType
    },
  });

  // Add a request interceptor
  axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig<any>) {
      let tokenStr = localStorage.getItem("access_token");
      if (tokenStr != '' && tokenStr)
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${tokenStr}`;

      return config;
    },
    function (error: any) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log("axios 1", response.status)
      return response.data;
    },
    function (error: AxiosError) {
      console.log("axios error", error);
      if (error.response?.status === 401 && !error.request.responseURL.includes('auth'))
        window.location.href = '/login';
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return axiosClient;
};

export default axiosClient;
