import axios from "axios";
import { getSession } from "next-auth/react";
import { ENV_VARIABLES } from "./constants"; // Assuming you have a constants file

export const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.baseURL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    console.log("aaaaaaaaaaaaaaa", session);
    if (session && session?.user?.token) {
      config.headers.Authorization = `Bearer ${session?.user?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
