import '../styles/globals.css'
import { RouteGuard } from '../components/RouteGuard';

import type {AppProps} from 'next/app'
import { UserProvider } from '../context/user.context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      {/* <RouteGuard> */}
        <Component {...pageProps} />
      {/* </RouteGuard> */}
    </UserProvider>
  )
}

export default MyApp
