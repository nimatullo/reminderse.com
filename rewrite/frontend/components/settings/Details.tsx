import Router from "next/router";
import { useEffect, useState } from "react";
import useMessage from "../../context/customMessageHook";
import { LoginResponse, userService } from "../../service/user.service";
import Snackbar from "../Snackbar";
import Fade from "react-reveal/Fade";

export default function MyDetails() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isUsernameFieldDisabled, setIsUsernameFieldDisabled] = useState(true);
  const [isEmailFieldDisabled, setIsEmailFieldDisabled] = useState(true);

  const { setMessage } = useMessage();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: LoginResponse = JSON.parse(user);
      setUsername(userData.username);
      setEmail(userData.email);
    }
  }, []);

  const handleEmailUpdate = () => {
    const user = localStorage.getItem("user");
    let userData: LoginResponse;
    if (user) {
      userData = JSON.parse(user);
    } else {
      Router.push("/login");
    }
    userService
      .updateEmail(email)
      .then((status) => {
        if (status === 200) {
          setMessage({
            show: true,
            message: "Email updated successfully",
            type: "success",
          });
          localStorage.setItem("user", JSON.stringify({ ...userData, email }));
          setIsEmailFieldDisabled(true);
        }
      })
      .catch((err) => {
        setMessage({
          show: true,
          message: err.response.data.message,
          type: "error",
        });
      });
  };

  const handleUsernameUpdate = () => {
    const user = localStorage.getItem("user");
    let userData: LoginResponse;
    if (user) {
      userData = JSON.parse(user);
    } else {
      Router.push("/login");
    }
    userService
      .updateUsername(username)
      .then((status) => {
        if (status === 200) {
          setMessage({
            show: true,
            message: "Username updated successfully",
            type: "success",
          });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userData, username })
          );
          setIsUsernameFieldDisabled(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setMessage({
            show: true,
            message: err.response.data.message,
            type: "error",
          });
        }
      });
  };

  return (
    <Fade>
      <div className="my-5 space-y-5">
        <h2 className="text-xl">Change account details</h2>
        <Snackbar />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full pr-16 input input-primary input-bordered"
              disabled={isUsernameFieldDisabled}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isUsernameFieldDisabled ? (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() =>
                  setIsUsernameFieldDisabled(!isUsernameFieldDisabled)
                }
              >
                Edit
              </button>
            ) : (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={handleUsernameUpdate}
              >
                Update
              </button>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full pr-16 input input-primary input-bordered"
                disabled={isEmailFieldDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEmailFieldDisabled ? (
                <button
                  className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                  onClick={() => setIsEmailFieldDisabled(!isEmailFieldDisabled)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                  onClick={handleEmailUpdate}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
