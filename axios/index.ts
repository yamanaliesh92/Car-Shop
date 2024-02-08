"use client";

import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8001",
});

http.interceptors.request.use((config) => {
  const token = getCookie("MyToken");
  const refreshToken = getCookie("MyRefreshToken");

  token && config.headers.setAuthorization(token);
  refreshToken && refreshToken && config.headers.set("ref", refreshToken);

  return config;
});

http.interceptors.response.use((response) => {
  if (response.headers.get && response.headers.get instanceof Function) {
    const token = response.headers.get("new_token");
  }

  if (response.headers["new_token"]) {
    setCookie("MyToken", response.headers["new_token"]);
  }

  if (response.headers["new_refresh_token"]) {
    setCookie("MyRefreshToken", response.headers["new_refresh_token"]);
  }

  return response;
});

export {};
