import CustomHead from "@/components/customHead"
import Header from "@/components/header"


const ExamSelect = () => {
  return (
    <>
      <CustomHead />
      <Header />
      <div>[デッキ名]のテストモード選択</div>
      <div>
        <div>出題</div>
        <button>日本語</button>
        <button>英語</button>
        <button>フランス語</button>
      </div>
      <div>
        <div>回答</div>
        <button>日本語</button>
        <button>英語</button>
        <button>フランス語</button>
      </div>
      <button>テスト開始</button>
    </>
  )
}

export default ExamSelect
