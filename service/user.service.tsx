import axios from "axios";
import { BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";
import Router from "next/router";

const API_URL = "https://api.reminderse.com";
// const API_URL = "https://reminderse-testing.herokuapp.com";
// const API_URL = "http://localhost:5000";

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
  updateUsername,
  updateEmail,
  updatePassword,
  unsubscribe,
  getVersion,
};

export interface LoginResponse {
  email: string;
  username: string;
  id: string;
}

function login(email: string, password: string): Promise<LoginResponse> {
  return axios
    .post<LoginResponse>(
      `${API_URL}/api/login`,
      { email, password },
      { withCredentials: true }
    )
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user.data));
      userSubject.next(user.data);
      return user.data;
    });
}

function register(
  email: string,
  username: string,
  password: string
): Promise<{ message: string }> {
  return axios
    .post<{ message: string }>(
      `${API_URL}/api/register`,
      { email, username, password },
      { withCredentials: true }
    )
    .then((res) => res.data);
}

function confirmEmail(token: string): Promise<number> {
  return axios
    .post(`${API_URL}/api/confirm_email_token/${token}`, {
      withCredentials: true,
    })
    .then((res) => res.status);
}

function isEmailConfirmed(): Promise<boolean> {
  return axios
    .get(`${API_URL}/api/confirmed`, { withCredentials: true })
    .then((res) => {
      if (res.data.isConfirmed) {
        return true;
      } else return false;
    });
}

function updateUsername(username: string): Promise<number> {
  return axios
    .put(
      `${API_URL}/api/change/username`,
      { username },
      { withCredentials: true }
    )
    .then((res) => res.status);
}

function updateEmail(email: string): Promise<number> {
  return axios
    .put(`${API_URL}/api/change/email`, { email }, { withCredentials: true })
    .then((res) => res.status);
}

function updatePassword(
  oldPassword: string,
  newPassword: string
): Promise<number> {
  return axios
    .put(
      `${API_URL}/api/change/password`,
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

function unsubscribe(): Promise<number> {
  return axios
    .delete(`${API_URL}/api/unsubscribe`, { withCredentials: true })
    .then((res) => res.status);
}

function logout() {
  axios
    .put(`${API_URL}/api/logout`, {}, { withCredentials: true })
    .finally(() => {
      clearUserInformation();
      Router.push("/");
    });
}

function clearUserInformation() {
  localStorage.removeItem("user");
  userSubject.next(null);
}

function getVersion() {
  return axios
    .get(`${API_URL}/api/version`, { withCredentials: true })
    .then((res) => res.data);
}