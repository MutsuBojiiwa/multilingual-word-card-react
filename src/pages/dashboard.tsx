import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Api } from '@/api/ApiWrapper';
import Cookies from 'js-cookie';
import CustomHead from '@/components/customHead';

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

  return (
    <>
      <CustomHead />
      <nav className="w-full bg-gray-100">
        <div className="mx-auto flex w-main justify-between">
          <div className="">
            <img src="/polyglot_logo.png" />
          </div>
          <div className="flex items-center">
            <ul className='mr-12 flex gap-12'>
              <li>デッキ</li>
              {/* <li>記録</li>
              <li>バッジ</li>
              <li>バトル</li>
              <li>フレンド</li> */}
            </ul>
            <a className='mx-4'>
              <div>アイコン</div>
            </a>
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        </div>
      </nav>
      <p>{loginUser.id}</p>
      <p>{loginUser.name}</p>
      {/* <p>{decks}</p> */}
      <ul>
        {decks.map(deck => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
