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





  useEffect(() => {
    // ユーザーデータの取得と設定
    const userData = JSON.parse(sessionStorage.getItem('user')) ?? JSON.parse(Cookies.get('user')) ?? initialUser
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

  const handleDeckEdit = (deckId) => {
    router.push({
      pathname: '/decks/edit',
      query: { deckId }
    })
  }



  return (
    <>
      <CustomHead />
      <Header />
      <div className="flex flex-col items-center">
        <div className='mt-16 grid h-96 w-main grid-cols-3 grid-rows-2 gap-8 p-4'>
          <div className='col-span-2 grid grid-cols-4 bg-white'>
            <div className='col-span-2 flex items-center'>
              {/* <div className='size-20 border border-black'>アイコン</div> */}
              <p className='ml-20'>{loginUser.name}</p>
            </div>
            {/* <div className='flex flex-col items-center justify-center'>
              <p>256</p>
              <p>総回答カード数</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p>12</p>
              <p>修了デッキ数</p>
            </div> */}
          </div>
          {/* <div className='col-span-1 flex bg-white'>
            <p>連続学習日数</p>
          </div>
          <div className='col-span-2 flex bg-white '>
            <p>前回の続き</p>
          </div>
          <div className='col-span-1 flex bg-white '>
            <p>学習カレンダー</p>
          </div> */}
        </div>

        <div className='mb-8 mt-16 w-main border-b-4 border-primary-light px-8 py-4 text-4xl'>デッキ</div>
        <div className='mb-40 grid w-main grid-cols-4 p-4'>
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
                  onClick={() => { handleDeckEdit(deck.id) }}
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
        {/* <button
          className="mb-40 mt-16 w-96 rounded-md bg-secondary px-4 py-2"
        >
          デッキ一覧
        </button> */}
      </div>
    </>
  );
};

export default Dashboard;
