import axios from "axios";
import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import Cookies from "js-cookie";
import { API_URL } from "../models/constants";

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user") as string)
);
export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  register,
  logout,
  clearUserInformation,
  confirmEmail,
  isEmailConfirmed,
  sendConfirmationEmail,
  updateUsername,
  updateEmail,
  updatePassword,
  updateInterval,
  unsubscribe,
  healthCheck,
};

export interface LoginResponse {
  email: string;
  username: string;
  id: string;
  interval: number;
}

const userApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

userApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.common["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token");
  }
  return config;
});

async function login(email: string, password: string): Promise<LoginResponse> {
  return await userApi
    .post<LoginResponse>(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    )
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user.data));
      userSubject.next(user.data);
      return user.data;
    });
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<{ message: string }> {
  return await userApi
    .post<{ message: string }>(
      `${API_URL}/auth/signup`,
      { email, username, password },
      { withCredentials: true }
    )
    .then((res) => res.data);
}

async function confirmEmail(token: string): Promise<number> {
  return await userApi
    .post(`${API_URL}/api/confirm_email_token/${token}`, {
      withCredentials: true,
    })
    .then((res) => res.status);
}

async function isEmailConfirmed(): Promise<boolean> {
  return await userApi
    .get(`${API_URL}/me/confirmed`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => false);
}

async function updateUsername(username: string): Promise<number> {
  return await userApi
    .put(`${API_URL}/me/username`, { username }, { withCredentials: true })
    .then((res) => res.status);
}

async function updateEmail(email: string): Promise<number> {
  return await userApi
    .put(`${API_URL}/me/email`, { email }, { withCredentials: true })
    .then((res) => res.status);
}

async function updatePassword(
  oldPassword: string,
  newPassword: string
): Promise<number> {
  return await userApi
    .put(
      `${API_URL}/me/password`,
      {
        current_password: oldPassword,
        new_password: newPassword,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.status;
    });
}

async function updateInterval(interval: number) {
  return await userApi
    .put(`${API_URL}/me/interval`, { interval }, { withCredentials: true })
    .then((res) => res.status);
}

async function sendConfirmationEmail() {
  return await userApi
    .get(`${API_URL}/me/send-confirmation-email`)
    .then((res) => res.status);
}

async function unsubscribe(): Promise<number> {
  return await userApi
    .delete(`${API_URL}/api/unsubscribe`, { withCredentials: true })
    .then((res) => res.status);
}

function logout() {
  userApi
    .delete(`${API_URL}/auth/logout`, { withCredentials: true })
    .then(() => {
      clearUserInformation();
      Router.push("/");
    });
}

function clearUserInformation() {
  localStorage.removeItem("user");
  userSubject.next(null);
}

async function healthCheck() {
  return await userApi.get(`${API_URL}/health`).then((res) => res.data);
}
