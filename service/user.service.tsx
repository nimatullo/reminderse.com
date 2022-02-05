import axios from "axios";
import { BehaviorSubject } from "rxjs";
import Router from "next/router";
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
  updateUsername,
  updateEmail,
  updatePassword,
  updateInterval,
  unsubscribe,
  getVersion,
};

export interface LoginResponse {
  email: string;
  username: string;
  id: string;
  interval: number
}

<<<<<<< HEAD
const userApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

userApi.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.common["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token");
    }
    return config;
  });
    

async function login(email: string, password: string): Promise<LoginResponse> {
  return await userApi
=======
async function login(email: string, password: string): Promise<LoginResponse> {
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .post<LoginResponse>(
      `${API_URL}/api/login`,
      { email, password },
      { withCredentials: true }
    )
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user.data));
      userSubject.next(user.data);
      return user.data;
    })
  }


async function register(
  email: string,
  username: string,
  password: string
): Promise<{ message: string }> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .post<{ message: string }>(
      `${API_URL}/api/register`,
      { email, username, password },
      { withCredentials: true }
    )
    .then((res) => res.data);
}

async function confirmEmail(token: string): Promise<number> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .post(`${API_URL}/api/confirm_email_token/${token}`, {
      withCredentials: true,
    })
    .then((res) => res.status);
}

async function isEmailConfirmed(): Promise<boolean> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .get(`${API_URL}/api/confirmed`, { withCredentials: true })
    .then((res) => {
      if (res.data.isConfirmed) {
        return true;
      } else return false;
    });
}

async function updateUsername(username: string): Promise<number> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .put(
      `${API_URL}/api/change/username`,
      { username },
      { withCredentials: true }
    )
    .then((res) => res.status);
}

async function updateEmail(email: string): Promise<number> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .put(`${API_URL}/api/change/email`, { email }, { withCredentials: true })
    .then((res) => res.status);
}

async function updatePassword(
  oldPassword: string,
  newPassword: string
): Promise<number> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
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

async function updateInterval(interval: number) {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .put(
      `${API_URL}/api/change/interval`,
      { interval },
      { withCredentials: true }
    )
    .then((res) => res.status);
}

async function unsubscribe(): Promise<number> {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .delete(`${API_URL}/api/unsubscribe`, { withCredentials: true })
    .then((res) => res.status);
}

function logout() {
  userApi
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

async function getVersion() {
<<<<<<< HEAD
  return await userApi
=======
  return await axios
>>>>>>> 3fa8c5a167037f9604602107b6452efda101f66b
    .get(`${API_URL}/api/version`, { withCredentials: true })
    .then((res) => res.data);
}