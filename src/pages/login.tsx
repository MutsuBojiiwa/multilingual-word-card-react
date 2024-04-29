import { useForm } from "react-hook-form"

const Login = () => {
  const { register, handleSubmit } = useForm()

  const handleFormSubmit = (d) => {
    alert(JSON.stringify(d))
  }

  return (
<>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-red-200 p-8 rounded-lg shadow-md">
      <p className="text-xl font-semibold mb-4">ログイン</p>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="mb-1">メールアドレス</span>
          <input type="text" {...register("email")} className="border border-gray-400 p-2 rounded-md" />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">パスワード</span>
          <input type="password" {...register("password")} className="border border-gray-400 p-2 rounded-md" />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">ログイン</button>
      </form>
      <div className="flex flex-col space-y-2 mt-4">
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">ゲストログイン</button>
        <a className="">新規登録</a>
      </div>
    </div>
  </div>
</>


  )
}

export default Login