import Head from 'next/head'
import { Login } from './login'

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
