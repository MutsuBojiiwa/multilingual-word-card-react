import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Api } from '@/api/ApiWrapper';
import Cookies from 'js-cookie';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  // const [loginUser, setLoginUser] = useState("")
  const router = useRouter();

  const clear = () => {
    setUsers([])
    // setLoginUser("")
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
  }

  useEffect(() => {
    // Api.get('/users')
    //   .then((res) => {
    //     setUsers(res.data);
    //     console.log(res)
    //   }).catch((error) => {
    //     console.log("ユーザー取得失敗", error);
    //   });
  }, [router]);

  const handleLogout = () => {
    Api.post('/logout', null, {
    })
      .then((res) => {
        clear()
        router.push('/login');
        alert(res.data.message);
      })
      .catch((e) => {
        console.log("ログアウトエラー:");
        console.log(e);
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

