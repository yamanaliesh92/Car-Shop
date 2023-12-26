"use client";

import { getCookie, getRefreshCookie, setCookie } from "@/utils/cookie";
import * as jwt from "jwt-decode";
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8001",
});

const HEADER_NAME = "auth";

http.interceptors.request.use((config) => {
  const Token = getCookie("MyToken");

  return {
    ...config,
    headers: {
      [HEADER_NAME]: Token,
    },
  } as any;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("orginerror",)

    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;

      try {
        const refreshToken = getRefreshCookie("MyRefreshToken");

        setCookie("MyToken", refreshToken as string);

        const decode = jwt.jwtDecode(refreshToken as string);
        const id: number = decode.id as number;

        const response = await http.post("/auth/re/ref", {
          id,
        });
        console.log("responde", response);
        const data = response.data;
        setCookie("MyToken", data.accessToken);
        setCookie("MyToken", data.refreshToken);

        // localStorage.setItem("token", token);

        // Retry the original request with the new token
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        // return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export {};
