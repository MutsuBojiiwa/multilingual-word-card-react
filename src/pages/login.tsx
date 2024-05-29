import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import axios from "axios";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { API_URL } from '@/env';

interface FormValues {
  email: string;
  password: string;
}

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'メールアドレスは必須です'
    })
    .max(255, '255字以内で入力してください')
    .email('メールアドレスを入力してください'),
  password: z
    .string({
      required_error: 'パスワードは必須です'
    })
    .max(255, '255字以内で入力してください')
});

export const handleLogin = async (values: FormValues, router) => {
  let http;

  if (API_URL) {
    http = axios.create({
      baseURL: API_URL,
    });
  } else {
    http = axios.create({
      baseURL: 'http://api.laravel-v10-starter.localhost/api',
    });
  }


  try {
    const res = await http.post('/login', {
      email: values.email,
      password: values.password,
    });

    sessionStorage.setItem('token', res.data.authorization.token);
    sessionStorage.setItem('user', JSON.stringify(res.data.user));
    Cookies.set('token', res.data.authorization.token);
    Cookies.set('user', JSON.stringify(res.data.user));
    router.push('/dashboard');
  } catch (e) {
    const error = e as AxiosError;
    // eslint-disable-next-line max-depth
    if (error.response && error.response.status === 401) {
      alert('ログイン情報が正しくありません。もう一度お試しください。');
    } else {
      console.error(e);
      alert('ログイン処理時に予期しないエラーが発生しました。後でもう一度お試しください。');
    }
  }
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleGuestLoginClicked = () => {
    const values: FormValues = {
      email: "user@example.com",
      password: "password"
    };
    handleLogin(values, router);
  };

  const handleSignInClicked = () => {
    // alert("新規登録クリック")
    router.push('/signIn');
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-base">
        <div className="w-96 rounded-lg bg-white p-10 shadow-md">
          <p className="mb-10 text-center text-xl ">ログイン</p>
          <form onSubmit={handleSubmit(data => handleLogin(data, router))} className="flex flex-col">
            <label className="mb-4 flex flex-col">
              <span className="mb-1">メールアドレス</span>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                className="rounded-md border border-gray-400 p-2 focus:border-red-500"
                placeholder="user@example.com"
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
              {errors.password && <div className="mt-2 text-sm text-error">{errors.password.message}</div>}
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
  );
};

export default Login;
