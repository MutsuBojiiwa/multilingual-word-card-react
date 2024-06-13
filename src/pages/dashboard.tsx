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
      <p>{loginUser.id}</p>
      <p>{loginUser.name}</p>
      {/* <p>{decks}</p> */}
      {decks.map(deck => (
        <div
          className='border w-40'
          key={deck.id}>
          {deck.name}
        </div>
      ))}

    </>
  );
};

export default Dashboard;
