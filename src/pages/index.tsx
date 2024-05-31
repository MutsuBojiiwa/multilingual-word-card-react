import { API_URL } from '@/env';
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  const handleClick = () => {
    let http;

    console.log(`API_URL = ${API_URL}`)

    if (API_URL) {
      console.log("うえ")

      http = axios.create({
        baseURL: API_URL,
      });
    } else {
      console.log("した")

      http = axios.create({
        baseURL: 'http://api.laravel-v10-starter.localhost/api',
      });
    }

    http.get('/health')
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
