import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import axios from "axios";

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
    <div
      style={{
        width: "80%",
        height: "50vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        padding: "1em",
        backgroundColor: "#50287D",
      }}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="some text"
        type="email"
        label="Email"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        label="Password"
      />
      <Button label="Submit" color="rgb(80, 40, 125)" onClick={handleSubmit} />
    </div>
  );
};

export default LoginPage;
