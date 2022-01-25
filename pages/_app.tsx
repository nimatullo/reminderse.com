import "../styles/globals.css";
import { RouteGuard } from "../components/RouteGuard";
import Axios from "axios";
import Cookies from "js-cookie";

import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { CustomMessageProvider } from "../context/error.context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.withCredentials = true;
  Axios.defaults.headers.common["X-CSRF-TOKEN"] =
    Cookies.get("csrf_access_token");

  return (
    <>
      <Head>
        <title>Reminderse</title>
      </Head>
      <UserProvider>
        <CustomMessageProvider>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </CustomMessageProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
