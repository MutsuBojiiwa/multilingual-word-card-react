import { Api } from '@/api/ApiWrapper'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  const handleClick = () => {

    Api.get('/health')
    .then((res) => {
      console.log(res)
    })
  }

  return (
    <>
      <Head>
        <title>Polyglot</title>
      </Head>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <button onClick={handleClick}>かくにん</button>
        </li>
      </ul>
    </>
  )
}
