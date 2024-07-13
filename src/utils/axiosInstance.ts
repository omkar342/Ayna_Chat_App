import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { baseURL } from "../utils/urls";

interface ApiResponse {
  data: any; // Ideally, you would define a more specific type or generic type here
  status: number;
  success: boolean;
  message: string;
}

const Axios = axios.create({
  baseURL: baseURL,
});

export const api = async (
  url: string,
  type: Method, // Utilizing Axios' Method type which includes 'get', 'post', 'put', 'delete'
  data?: object, // Specify more precise type if possible
  headers?: object, // Specify more precise type if possible
  options: AxiosRequestConfig = {}
): Promise<ApiResponse> => {
  const requestTypes: Method[] = ['get', 'post', 'put', 'delete'];
  const requestType = requestTypes.find((reqType) => reqType === type);

  if (requestType) {
    try {
      const response: AxiosResponse<ApiResponse> = await Axios({
        method: requestType,
        url: url,
        data: data,
        headers: {
          ...headers,
          'x-access-token': localStorage.getItem('accessToken') || ''
        },
        ...options
      });
      return {
        data: response.data,
        status: response.status,
        success: response.data.success,
        message: response.data.message
      };
    } catch (e: any) { // This still uses 'any'; consider using AxiosError for more specific error handling
      if (e?.response?.status === 404 || e?.response?.status === 403) {
        console.log("Error with status:", e.response.status);
      }

      if (e?.response?.status === 403) {
        try {
          const refreshResponse = await Axios.get('/token/refresh', {
            headers: {
              'x-refresh-token': localStorage.getItem('refreshToken') || ''
            }
          });

          if (refreshResponse?.data?.access_token) {
            localStorage.setItem('accessToken', refreshResponse.data.access_token);
            return await api(url, type, data, headers, options);
          } else {
            // expired refresh token
            toast.error("Please login first");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            if (document.location.pathname !== '/login') {
              document.location.href = '/login';
            }
            return Promise.reject(new Error("Refresh token expired"));
          }
        } catch (error) {
          toast.error("Session expired, please login again");
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          if (document.location.pathname !== '/login') {
            document.location.href = '/login';
          }
          return Promise.reject(new Error("Failed to refresh token"));
        }
      } else {
        return Promise.reject(new Error(`API Error: ${e.message}`));
      }
    }
  } else {
    return Promise.reject(new Error("Invalid request type"));
  }
};
