"use client";

// axios service file.

import axios from "axios";
import { ENV_VARIABLES } from "./constants";

export const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.baseURL,
});

// interceptors => request
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptors => reponse
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
