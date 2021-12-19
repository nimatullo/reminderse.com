import '../styles/globals.css'
import { RouteGuard } from '../components/RouteGuard';
import Axios from "axios";

import type {AppProps} from 'next/app'
import { UserProvider } from '../context/user.context'

function MyApp({ Component, pageProps }: AppProps) {

  Axios.defaults.withCredentials = true;

  return (
    <UserProvider>
      {/* <RouteGuard> */}
        <Component {...pageProps} />
      {/* </RouteGuard> */}
    </UserProvider>
  )
}

export default MyApp
