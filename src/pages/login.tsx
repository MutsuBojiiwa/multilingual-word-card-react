import axios from "axios"

import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'

interface FormValues {
  email: string
  password: string
}

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'メールアドレスは必須です'
    })
    .max(255, '255字以内です')
    .email('メールアドレスを入力してください'),
  password: z
    .string({
      required_error: 'パスワードは必須です'
    })
    .max(255, '255字以内です')
})

const Login = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  const http = axios.create({
    baseURL: 'http://api.laravel-v10-starter.localhost/api/',
  });

  const onSubmit = (values: FormValues) => {
    http.post('login', {
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if(res){
          console.log(res.data)
        }
        sessionStorage.setItem('token', res.data.authorization.token)
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        Cookies.set('token', res.data.authorization.token)
        Cookies.set('user', JSON.stringify(res.data.user))
        router.push('/dashboard')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const handleGuestLoginClicked = () => {
    const values: FormValues = {
      email: "user@example.com",
      password: "password"
    };
    onSubmit(values)
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="mb-4 flex flex-col">
              <span className="mb-1">メールアドレス</span>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                className="rounded-md border border-gray-400 p-2 focus:border-red-500"
                placeholder="example@test.com"
                required
              />
              {errors.email && <div className="mt-2 text-sm text-error">{errors.email.message}</div>}
            </label>
            <label className="mb-12 flex flex-col">
              <span className="mb-1">パスワード</span>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                id="password"
                className="rounded-md border border-gray-400 p-2"
                placeholder="パスワードを入力..."
                required
              />
              {errors.email && <div className="mt-2 text-sm text-error">{errors.email.message}</div>}
            </label>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-white"
              disabled={!isDirty}
            >
              ログイン
            </button>
          </form>
          <div className="mt-12 flex flex-col">
            <button
              onClick={handleGuestLoginClicked}
              className="rounded-md bg-secondary px-4 py-2 text-gray-800">
              ゲストログイン
            </button>
            <button onClick={handleSignInClicked} className="mx-auto mt-6 w-20 text-center">新規登録</button>
          </div>
        </div>
      </div>
    </>


  )
}

export default Login