import Head from 'next/head'
import { Login } from './Login'

export default function Home() {
  return (
    <>
      <Head>
        <title>Polyglot</title>
      </Head>
      <Login />
    </>
  )
}
