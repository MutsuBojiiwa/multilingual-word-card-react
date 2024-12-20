import CustomHead from "@/components/customHead"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";


const ExamResult = () => {
  const [results, setResults] = useState(null);
  const router = useRouter();
  let totalResult
  useEffect(() => {
    const storedData = sessionStorage.getItem('results');
    if (storedData) {
      setResults(JSON.parse(storedData));
    }
  }, [])

  if (results !== null) {
    totalResult = results.find((result) => result.locale_id === 0);
  }

  const handleAgain = () => {
    router.back()
  }
  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }
  

  return (
    <>
      <CustomHead />
      <Header />
      <div className="flex h-auto flex-col items-center">
        <div className="mt-20 flex w-main flex-wrap items-center rounded-md bg-white p-6">
          {results === null ? (
            <div>読込中</div>
          ) : (
            <>
              <div className="mb-12 mt-6 flex w-main flex-col items-center p-6">
                <p className="mb-6 text-4xl">{totalResult.locale_name}</p>
                <p className="mb-2 text-4xl">{Math.round(totalResult.correctCount / totalResult.questionCount * 100)}%</p>
                <p>{totalResult.correctCount}/{totalResult.questionCount}</p>
              </div>
              <div className="flex w-main flex-wrap">
                {results.filter((result) => result.locale_id !== 0)
                  .map((result, index) => (
                    <div key={index} className="m-auto flex w-96 flex-col items-center p-6">
                      <p className="mb-6 text-4xl">{result.locale_name}</p>
                      <p className="mb-2 text-4xl">{Math.round(result.correctCount / result.questionCount * 100)}%</p>
                      <p>{result.correctCount}/{result.questionCount}</p>
                    </div>
                  ))}
              </div>
              <div className="mt-6 flex w-main flex-col items-center p-6">
                <div>
                  <button className="m-4 w-40 rounded-md bg-primary-light px-4 py-2" onClick={handleBackToDashboard}>
                    デッキ選択に戻る
                  </button>
                  <button className="m-4 w-40 rounded-md bg-primary-light px-4 py-2" onClick={handleAgain}>
                    もう一度
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div >
    </>
  )
}

export default ExamResult
