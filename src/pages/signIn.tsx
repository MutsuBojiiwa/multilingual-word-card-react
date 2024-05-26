import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const FormSchema = z.object({
  name: z
    .string({
      required_error: '名前は必須です'
    })
    .max(255, '255字以内です'),
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
    .max(255, '255字以内です'),
  confirmPassword: z
    .string({
      required_error: '確認用パスワードは必須です'
    })
    .max(255, '255字以内です')
})


const SignIn = () => {


  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })



  const onSubmit = () => {
    console.log("submit")
    router.push('/dashboard')
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-base">
        <div className="w-96 rounded-lg bg-white p-10 shadow-md">
          <p className="mb-10 text-center text-xl ">新規登録</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="mb-4 flex flex-col">
              <span className="mb-1">ユーザー名</span>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                className="rounded-md border border-gray-400 p-2 focus:border-red-500"
                placeholder="ユーザー名を入力..."
                required
              />
              {errors.name && <div className="mt-2 text-sm text-error">{errors.name.message}</div>}
            </label>
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
            <label className="mb-4 flex flex-col">
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
            <label className="mb-12 flex flex-col">
              <span className="mb-1">パスワード（確認）</span>
              <input
                {...register('confirmPassword', { required: 'confirmPassword is required' })}
                type="password"
                id="confirmPassword"
                className="rounded-md border border-gray-400 p-2"
                placeholder="パスワードを再入力..."
                required
              />
              {errors.confirmPassword && <div className="mt-2 text-sm text-error">{errors.confirmPassword.message}</div>}
            </label>
            <button
              type="submit"
              className="mb-6 rounded-md bg-primary px-4 py-2 text-white"
              disabled={!isDirty}
            >
              登録
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn