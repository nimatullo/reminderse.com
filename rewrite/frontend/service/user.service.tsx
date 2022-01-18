import axios from "axios";
import { BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";
import Router from "next/router";

const API_URL = "http://localhost:5000";

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);
export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  register,
  logout,
  confirmEmail,
  updateUsername,
  updateEmail,
  updatePassword,
  unsubscribe
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
    .post(`${API_URL}/api/confirm_email_token/${token}`, { withCredentials: true })
    .then((res) => res.status);
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
      console.log(res);
      return res.status;
    });
}

function unsubscribe(): Promise<number> {
  return axios
    .delete(`${API_URL}/api/unsubscribe`, { withCredentials: true })
    .then((res) => res.status);
}

function logout() {
  axios.put(`${API_URL}/api/logout`, {}, { withCredentials: true })
    .then(() => {
      localStorage.removeItem("user");
      userSubject.next(null);
      Router.push("/")
    });
}
