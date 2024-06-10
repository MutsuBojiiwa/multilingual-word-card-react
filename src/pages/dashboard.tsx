import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Api } from '@/api/ApiWrapper';
import Cookies from 'js-cookie';
import CustomHead from '@/components/customHead';


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
      {/* <h2>{loginUser.name}</h2> */}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;

