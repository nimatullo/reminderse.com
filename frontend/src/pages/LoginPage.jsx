import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../components/TextField";
import Button from "../components/Button";
import axios from "axios";
import "../styles/AccountManagement.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const data = {
      email: email,
      password: password,
    };
    axios.post("/api/login", data).then((res) => console.log(res.data));
  }

  return (
    <div className="container">
      <div className="add-page">
        <h1>Reminderse Login</h1>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          type="email"
          label="Email"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Super Secure Password"
          type="password"
          label="Password"
        />
        <Button
          label="Submit"
          color="rgb(80, 40, 125)"
          onClick={handleSubmit}
        />
        <p>
          Don't have an account?{" "}
          <Link className="optional-link" to="/register">
            Sign up today!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
