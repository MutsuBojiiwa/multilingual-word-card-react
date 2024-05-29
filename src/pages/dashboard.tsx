import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: 'http://api.laravel-v10-starter.localhost/api/',
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  // const [loginUser, setLoginUser] = useState("")
  const [token, setToken] = useState("")
  const router = useRouter();

  const clear = () => {
    setUsers([])
    // setLoginUser("")
    setToken("")
  }

  useEffect(() => {
    //ここのロジック見直す
    let token = sessionStorage.getItem('token');
    if (!token) {
      token = Cookies.get('token')
    }
    setToken(token)
    console.log(token)

    let user;
    const userCookie = Cookies.get('user');
    if (userCookie) {
      user = JSON.parse(userCookie);
    } else {
      user = JSON.parse(sessionStorage.getItem('user'));
    }

    console.log(user)

    // setLoginUser(user)


    if (token) {
      http.get('users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setUsers(res.data);
      }).catch((error) => {
        console.log("ユーザー取得失敗", error);
      });
    } else {
      console.log("トークンがありません");
      // ログインページにリダイレクト
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    http.post('logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        clear()
        router.push('/login');
        alert(res.data.message);
      })
      .catch((e) => {
        console.error("ログアウトエラー:", e);
      });

  }

  return (
    <>
      <h1>ダッシュボード</h1>
      {/* <h2>{loginUser.name}</h2> */}
      <button onClick={handleLogout}>ログアウト</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
