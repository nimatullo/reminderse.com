import Head from "next/head";
import { useEffect } from "react";
import { userService } from "../service/user.service";

export default function Logout() {
  useEffect(() => {
    userService.logout();
  }, []);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#50287d" />
        <title>Logging out of Reminderse...</title>
      </Head>
      <div>
        <h1>Logging out...</h1>
      </div>
    </>
  );
}
