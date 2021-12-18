import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <div>Hello world</div>
    </div>
  )
}
