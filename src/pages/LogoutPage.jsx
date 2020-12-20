import React, { useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../context/Auth";
import { useHistory } from "react-router-dom";
import { API_ROOT_URL } from "../constants";

const LogoutPage = () => {
  const { setCurrentUser } = useAuth();
  const history = useHistory();
  useEffect(() => {
    Axios.put(`${API_ROOT_URL}/api/logout`, {}, { withCredentials: true });
    localStorage.removeItem("user");
    setCurrentUser(null);
    history.push("/login");
  }, []);
  return <div>Thanks for visiting!</div>;
};

export default LogoutPage;
