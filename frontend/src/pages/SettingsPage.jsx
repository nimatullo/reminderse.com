import React, { useState, useEffect } from "react";
import Axios from "axios";
import TextField from "../components/TextField";
import Button from "../components/Button";
import "../styles/SettingsPage.css";
import Dialog from "../components/Dialog";
import { useHistory } from "react-router-dom";
import { API_ROOT_URL } from "../constants";



const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Axios.get(`${API_ROOT_URL}/api/current+user`, { withCredentials: true }).then((res) => {
      setUsername(res.data.username);
      setEmail(res.data.email);
    });
  }, []);

  function changeEmail() {
    const data = {
      email: newEmail,
    };

    Axios.put(`${API_ROOT_URL}/api/change/email`, data, { withCredentials: true }).then((res) => {
      setEmail(newEmail);
      setEmailEdit(false);
    });
  }

  function changeUsername() {
    const data = {
      username: newUsername,
    };

    Axios.put(`${API_ROOT_URL}/api/change/username`, data, { withCredentials: true }).then((res) => {
      setUsername(newUsername);
      setUsernameEdit(false);
    });
  }

  function unsubscribe() {
    Axios.delete(`${API_ROOT_URL}/api/unsubscribe`, { withCredentials: true });
    history.push("/logout");
  }

  function changePassword() {
    if (newPassword.length < 8) {
      setPasswordError("Password must have atleast 8 characters.");
      return;
    } else if (newPassword !== passwordConfirmation) {
      setPasswordError("Passwords don't match.");
      return;
    }
    const data = {
      current_password: password,
      new_password: newPassword,
    };

    Axios.put(`${API_ROOT_URL}/api/change/password`, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setPassword(newPassword);
          setPasswordEdit(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setPasswordError("Wrong credentials");
        }
      });
  }

  return (
    <div className="container">
      <div className="settings-container">
        <h3>Account Settings</h3>
        <div className="settings-content">
          <div className="row">
            {usernameEdit ? (
              <div className="textFieldContainer">
                <TextField
                  label="Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Button
                  onClick={() => changeUsername()}
                  label="Confirm Changes"
                />
                <Button
                  label="Cancel"
                  onClick={() => {
                    setNewUsername("");
                    setUsernameEdit(false);
                  }}
                />
              </div>
            ) : (
                <>
                  <div className="username-info">
                    <small>Username</small>
                    <p>{username}</p>
                  </div>
                  <div className="edit">
                    <span onClick={() => setUsernameEdit(true)}>Edit</span>
                  </div>
                </>
              )}
          </div>
          <div className="row">
            {emailEdit ? (
              <div className="textFieldContainer">
                <TextField
                  label="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button label="Confirm Changes" onClick={() => changeEmail()} />
                <Button
                  label="Cancel"
                  onClick={() => {
                    setNewEmail("");
                    setEmailEdit(false);
                  }}
                />
              </div>
            ) : (
                <>
                  <div className="email-info">
                    <small>Email</small>
                    <p>{email}</p>
                  </div>
                  <div className="edit">
                    <span onClick={() => setEmailEdit(true)}>Edit</span>
                  </div>
                </>
              )}
          </div>
          <div className="row">
            {passwordEdit ? (
              <div className="textFieldContainer">
                <TextField
                  label="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <TextField
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                />
                <TextField
                  label="Confirm New Password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                />
                <small style={{ color: "red" }}>{passwordError}</small>
                <Button
                  label="Confirm Changes"
                  onClick={() => changePassword()}
                />
                <Button
                  label="Cancel"
                  onClick={() => {
                    setNewPassword("");
                    setPasswordEdit(false);
                  }}
                />
              </div>
            ) : (
                <div className="password-info">
                  <small>Password</small>
                  <div>
                    <span onClick={() => setPasswordEdit(true)}>
                      Change Password
                  </span>
                  </div>
                </div>
              )}
          </div>
          <div className="row">
            <div className="password-info">
              <small>Danger Zone</small>
              <div>
                <span onClick={() => setOpen(true)}>Unsubscribe</span>
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            hide={() => setOpen(false)}
            headerTitle={"Are you sure you want to unsubscribe?"}
            content={
              <div className="unsubscribe-dialog">
                <Button
                  label="Yes"
                  className="negative-button"
                  onClick={() => unsubscribe()}
                />
                <Button label="Nevermind" onClick={() => setOpen(false)} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
