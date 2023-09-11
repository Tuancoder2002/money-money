import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
export const contentTypeFormData = "multipart/form-data";
const axiosClient = (contentType: any = "application/json") => {
  const axiosClient = axios.create({
    baseURL: "https://f3c0-14-174-14-215.ngrok-free.app/api",
    headers: {
      "Content-Type": contentType,
    },
  });

  // Add a request interceptor
  axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig<any>) {
      // Do something before request is sent
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
      return response.data;
    },
    function (error: any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return axiosClient;
};

export default axiosClient;
