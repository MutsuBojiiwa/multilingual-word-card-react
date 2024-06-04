import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieToken = context.req.cookies.token

  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
};

export default function Home() {
  return null
}

