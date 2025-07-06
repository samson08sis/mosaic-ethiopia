// utils/authApi.js
import { headers } from "next/headers";
import fetchAPI from "./apiClient";

export async function registerUser(userData: object) {
  return fetchAPI({
    endpoint: "/auth/register",
    options: {
      method: "POST",
      body: `${userData}`,
      headers: {},
    },
  });
}

export async function loginUser(credentials: object) {
  return fetchAPI({
    endpoint: "/auth/login",
    options: {
      method: "POST",
      body: `${credentials}`,
      headers: {},
    },
  });
}

export async function logoutUser() {
  return fetchAPI({
    endpoint: "/auth/logout",
    options: {
      method: "POST",
      body: `{}`,
      headers: {},
    },
  });
}

export async function getCurrentUser() {
  return fetchAPI({
    endpoint: "/auth/me",
    options: { method: "GET", body: `{}`, headers: {} },
  });
}
