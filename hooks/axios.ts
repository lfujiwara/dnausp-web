import _axios from "axios";
import { useBackendAuthManager } from "@auth/backend/use-backend-auth-manager";

export const useAxios = () => {
  const { token } = useBackendAuthManager();

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

  return axios;
};
