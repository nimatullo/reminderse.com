import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { userService } from "../service/user.service";
import Image from "next/image";
import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import useMessage from "../context/customMessageHook";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage } = useMessage();

  useEffect(() => {
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  function registerUser() {
    setIsLoading(true);
    console.log(email, username, password, passwordConfirmation);

    if (password !== passwordConfirmation) {
      setMessage({
        message: "Passwords do not match!",
        type: "error",
        show: true,
      });
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setMessage({
        message: "Password must be at least 8 characters long!",
        type: "error",
        show: true,
      });
      setIsLoading(false);
      return;
    }

    return userService
      .register(email, username, password)
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        setMessage({
          message: "Something went wrong. Please try again.",
          type: "error",
          show: true,
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Navbar />
      <div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-4 max-w-md w-full space-y-5">
          <div>
            <div className="flex justify-center items-center">
              <Image
                src="/reminderse.png"
                height="100"
                width="100"
                className="mx-auto h-12 w-auto"
                alt="Reminderse"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
            <div className="divider">or</div>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link href="/login">
                <a className="mt-2 text-center text-sm text-primary hover:underline">
                  log in to an existing one
                </a>
              </Link>
            </p>
          </div>
          <div className="form-control">
            <label
              htmlFor="username"
              className="input-group input-group-vertical input-group-md"
            >
              <span className="bg bg-secondary" style={{ color: "white" }}>
                Username
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label
              htmlFor="email"
              className="input-group input-group-vertical input-group-md"
            >
              <span className="bg bg-secondary" style={{ color: "white" }}>
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@reminderse.com"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label
              htmlFor="password"
              className="input-group input-group-vertical input-group-md"
            >
              <span
                className="bg bg-secondary flex justify-between"
                style={{ color: "white" }}
              >
                <p>Password</p>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 8 characters"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label
              htmlFor="password"
              className="input-group input-group-vertical input-group-md"
            >
              <span
                className="bg bg-secondary flex justify-between"
                style={{ color: "white" }}
              >
                <p>Confirm password</p>
              </span>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                placeholder="Confirm password"
                className="input input-bordered"
              />
            </label>
          </div>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">
              I agree to the{" "}
              <Link href="/terms">
                <a className="text-primary hover:underline">
                  terms and conditions
                </a>
              </Link>
            </span>
          </label>
          <button
            onClick={registerUser}
            className={`${
              isLoading ? "loading" : ""
            } btn btn-primary w-full shadow-primary/50 shadow-sm`}
          >
            Create new account
          </button>
        </div>
      </div>
    </>
  );
}
