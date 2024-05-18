import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const http = axios.create({
  baseURL: 'http://api.laravel-v10-starter.localhost/api/',
});

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
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
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;