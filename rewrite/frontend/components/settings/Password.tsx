import React, { useState } from "react";
import useMessage from "../../context/customMessageHook";
import { userService } from "../../service/user.service";
import Snackbar from "../Snackbar";
import Fade from "react-reveal/Fade";

export default function Password() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFieldDisabled, setIsPasswordFieldDisabled] = useState(true);

  const { setMessage } = useMessage();

  function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (passwordIsValid()) {
      userService
        .updatePassword(password, newPassword)
        .then((status) => {
          if (status === 200) {
            setMessage({
              message: "Password updated successfully",
              show: true,
              type: "success",
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setMessage({
              message: "Invalid password",
              show: true,
              type: "error",
            });
          }
        });
    }
  }

  function passwordIsValid() {
    if (newPassword.length < 8) {
      setMessage({
        show: true,
        message: "New password must be at least 8 characters long",
        type: "error",
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      setMessage({
        show: true,
        message: "Passwords do not match",
        type: "error",
      });
      return false;
    }
    return true;
  }

  return (
    <Fade>
      <div className="my-5 space-y-5">
        <h2 className="text-xl">Change password</h2>
        <Snackbar />
        {isPasswordFieldDisabled ? (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current password</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full pr-16 input input-primary input-bordered"
                disabled={isPasswordFieldDisabled}
                value="********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() =>
                  setIsPasswordFieldDisabled(!isPasswordFieldDisabled)
                }
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasswordChange}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current password</span>
              </label>
              <input
                type="password"
                placeholder="Current password"
                className="w-full pr-16 input input-primary input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New password</span>
              </label>
              <input
                type="password"
                placeholder="New password"
                className="w-full pr-16 input input-primary input-bordered"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm new password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full pr-16 input input-primary input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full my-7">
              Update password
            </button>
          </form>
        )}
      </div>
    </Fade>
  );
}
