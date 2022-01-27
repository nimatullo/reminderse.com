import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { userService } from "../service/user.service";
import Link from "next/link";
import useMessage from "../context/customMessageHook";
import Snackbar from "../components/Snackbar";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage } = useMessage();

  useEffect(() => {
    if (userService.userValue) {
      router.push("/dashboard");
    }
  }, []);

  function loginUser(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    return userService
      .login(email, password)
      .then((res) => {
        const returnUrl = router.query.returnUrl || "/dashboard";
        router.push(returnUrl as string);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setMessage({
            message: "Incorrect username or password.",
            type: "error",
            show: true,
          });
        } else {
          setMessage({
            message: "Something went wrong. Please try again.",
            type: "error",
            show: true,
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
    <Head>
      <meta name="theme-color" content="#50287d"/>
      <title>Sign into Reminderse</title>
    </Head>
      <Navbar />
      <div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-4 max-w-md w-full space-y-5">
          <div>
            <div className="flex justify-center items-center">
              <img
                src="/reminderse.png"
                height="100"
                width="100"
                className="mx-auto h-12 w-auto"
                alt="Reminderse"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <div className="divider">or</div>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link href="/register">
                <a className="mt-2 text-center text-sm text-primary hover:underline">
                  create a new account
                </a>
              </Link>
            </p>
          </div>
          <Snackbar />
          <form onSubmit={loginUser} className="space-y-5">
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
                  placeholder="Super secure password"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="divider" />
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Remember me</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
            <button
              type="submit"
              className={`${
                isLoading ? "loading" : ""
              } btn btn-primary w-full shadow-primary/50 shadow-sm`}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
