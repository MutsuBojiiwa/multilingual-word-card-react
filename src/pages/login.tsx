import axios from "axios"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/router';

const Login = () => {
  const { register, handleSubmit } = useForm()
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let token = ""

  const http = axios.create({
    baseURL: 'http://api.laravel-v10-starter.localhost/api/',
  });

  const handleFormSubmit = () => {
    const email = 'user2@example.com'
    const password = 'password'
      http.post('login', { email, password }).then((res) => {
        console.log("ログインOK");
        console.log(res);
        token = res.data.authorization.token
        localStorage.setItem('token', token);
        router.push('/dashboard');
      })
  }

  const handleGuestLoginClicked = () => {
    http.get('users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleSignInClicked = () => {
    // alert("新規登録クリック")
    http.get('/api/health').then((res) => {
      console.log(res);
    })
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-base">
        <div className="w-96 rounded-lg bg-white p-10 shadow-md">
          <p className="mb-10 text-center text-xl ">ログイン</p>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col">
            <label className="mb-4 flex flex-col">
              <span className="mb-1">メールアドレス</span>
              <input type="text" {...register("email")} className="rounded-md border border-gray-400 p-2 focus:border-red-500" />
            </label>
            <label className="mb-12 flex flex-col">
              <span className="mb-1">パスワード</span>
              <input type="password" {...register("password")} className="rounded-md border border-gray-400 p-2" />
            </label>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white">ログイン</button>
          </form>
          <div className="mt-12 flex flex-col">
            <button onClick={handleGuestLoginClicked}
              className="rounded-md bg-secondary px-4 py-2 text-gray-800">ゲストログイン</button>
            <button onClick={handleSignInClicked} className="mx-auto mt-6 w-20 text-center">新規登録</button>
          </div>
        </div>
      </div>
    </>


  )
}

export default Login