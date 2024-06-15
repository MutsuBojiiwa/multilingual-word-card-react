import { Api } from '@/api/ApiWrapper';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const Header = () => {
  const router = useRouter();


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

  const clearUserData = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
  }
  
  return (
    <nav className="w-full bg-white">
        <div className="mx-auto flex w-main justify-between">
          <div className="">
            <img src="/polyglot_logo.png" />
          </div>
          <div className="flex items-center">
            <ul className='mr-12 flex gap-12'>
              {/* <li>デッキ</li> */}
              {/* <li>記録</li>
              <li>バッジ</li>
              <li>バトル</li>
              <li>フレンド</li> */}
            </ul>
            {/* <a className='mx-4'>
              <div>アイコン</div>
            </a> */}
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        </div>
      </nav>
  )
}

export default Header