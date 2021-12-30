import '../styles/globals.css'
import { RouteGuard } from '../components/RouteGuard';
import Axios from "axios";
import Cookies from "js-cookie";

import type {AppProps} from 'next/app'
import { UserProvider } from '../context/user.context'
import { ErrorProvider } from '../context/error.context';

function MyApp({ Component, pageProps }: AppProps) {

  Axios.defaults.withCredentials = true;
  Axios.defaults.headers.common["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token");

  return (
    <UserProvider>
      <ErrorProvider>
        {/* <RouteGuard> */}
          <Component {...pageProps} />
        {/* </RouteGuard> */}
      </ErrorProvider>
    </UserProvider>
  )
}

export default MyApp
