import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Api } from '@/api/ApiWrapper';
import Cookies from 'js-cookie';
import CustomHead from '@/components/customHead';
import Header from '@/components/header';

type User = {
  id: number,
  name: string,
}

const initialUser: User = {
  id: 0,
  name: ""
}

const Dashboard = () => {
  const [decks, setDecks] = useState([]);
  const [loginUser, setLoginUser] = useState(initialUser);
  const router = useRouter();

  const clearUserData = () => {
    setDecks([]);
    setLoginUser(initialUser);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
  }

  const handleLogout = () => {
    Api.post('/auth/logout', null)
      .then((res) => {
        clearUserData();
        router.push('/login');
        alert(res.data.message);
      })
      .catch((error) => {
        console.log("ログアウトエラー:", error);
      });
  }

  useEffect(() => {
    // ユーザーデータの取得と設定
    const userData = JSON.parse(sessionStorage.getItem('user')) ?? JSON.parse(Cookies.get('user'));
    const user: User = {
      id: userData.id,
      name: userData.name,
    };
    setLoginUser(user);

    // デッキのデータ取得
    Api.get(`/decks/${user.id}`)
      .then((res) => {
        console.log(res.data)
        setDecks(res.data);
      })
      .catch((error) => {
        console.error('Error fetching deck:', error);
      });
  }, [router]);



  return (
    <>
      <CustomHead />
      <Header
        onLogout={handleLogout}
      />
      <div className="flex flex-col items-center">

        <p>{loginUser.id}</p>
        <p>{loginUser.name}</p>
        <div className='grid w-main grid-cols-4'>
          {/* <p>{decks}</p> */}
          {decks.map(deck => (
            <div
              className='flex h-96 w-60 flex-col items-center justify-between rounded-md bg-white p-4'
              key={deck.id}
            >
              <p className='mt-4'>{deck.name}</p>
              <div className='w-full'>
                <button
                  className="mb-4 w-full rounded-md bg-primary-light px-4 py-2"
                >
                  編集
                </button>
                <button
                  className="w-full rounded-md bg-primary px-4 py-2 text-white"
                >
                  テスト
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
