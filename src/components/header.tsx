

const Header = (props) => {

  const handleLogout = props.onLogout
  
  return (
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
  )
}

export default Header