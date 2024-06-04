import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Polyglot</title>
      </Head>
      <body className="font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
