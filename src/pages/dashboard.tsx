import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: 'http://api.laravel-v10-starter.localhost/api/',
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("")
  const router = useRouter();

  useEffect(() => {
    //ここのロジック見直す
    let token = sessionStorage.getItem('token');
    if (!token) {
      token = Cookies.get('token')
    }
    let user;
    const userCookie = Cookies.get('user');
    if (userCookie) {
      user = JSON.parse(userCookie);
    } else {
      user = JSON.parse(sessionStorage.getItem('user'));
    }

    console.log(user)

    setUser(user)


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

  return (
    <div>
      <h1>ダッシュボード</h1>
      <h2>{user.name}</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
