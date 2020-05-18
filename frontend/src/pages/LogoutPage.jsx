import React, { useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../context/Auth";
import { useHistory } from "react-router-dom";

const LogoutPage = () => {
  const { setCurrentUser } = useAuth();
  const history = useHistory();
  useEffect(() => {
    Axios.put(`/api/logout`);
    localStorage.removeItem("user");
    setCurrentUser(null);
    history.push("/");
  }, []);
  return <div>Thanks for visiting!</div>;
};

export default LogoutPage;
