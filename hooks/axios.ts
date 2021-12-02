import _axios from "axios";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

export const useAxios = () => {
  const { token, handleLogout } = useBackendAuthManager();

  const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axios.interceptors.request.use((req) => {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    };
    return req;
  });

  axios.interceptors.response.use(
    (req) => req,
    (error) => {
      if (error.response.status === 401) handleLogout();
      return Promise.reject(error);
    }
  );

  return axios;
};
