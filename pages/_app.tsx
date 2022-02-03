import "../styles/globals.css";
import { RouteGuard } from "../components/RouteGuard";
import Axios from "axios";

import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { CustomMessageProvider } from "../context/error.context";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.withCredentials = true;

  return (
    <>
      <Head>
        <title>Reminderse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
