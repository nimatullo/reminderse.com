import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/AccountManagement.css";
import { RiInformationLine } from "react-icons/ri";
import Axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordLengthError, setPasswordLengthError] = useState(false);
  const [showPasswordMatchError, setPasswordMatchError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  function isFormValid() {
    let validForm = true;
    if (!isEmail(email)) {
      setIsValidEmail(false);
      validForm = false;
    } else {
      setIsValidEmail(true);
    }
    if (password.length < 8) {
      validForm = false;
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(true);
    }
    if (password != passwordConfirm) {
      validForm = false;
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(true);
    }
    return validForm;
  }

  function handleSubmit() {
    if (isFormValid()) {
      Axios.post(`/api/register`, {
        username: username,
        email: email,
        password: password,
      }).then((res) => console.log(res.data));
    }
  }

  function isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  return (
    <div className="container">
      <div className="add-page" style={{ maxHeight: "620px" }}>
        <h1>Create your Reminderse account</h1>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="tip">
          {!isValidEmail && (
            <small>Please provide a valid email address.</small>
          )}
        </div>
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordLengthError(false);
          }}
        />
        <div className={`tip ${showPasswordLengthError ? "error" : null}`}>
          <small className="password-length">
            <RiInformationLine /> Password must be atleast 8 characters.
          </small>
          <br />
          {showPasswordMatchError && <small>Passwords must match.</small>}
        </div>
        <TextField
          type="password"
          label="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button label="Create your account" onClick={handleSubmit} />
        <p>
          Already have an account?{" "}
          <Link className="optional-link" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
