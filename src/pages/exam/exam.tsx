import { Api } from "@/api/ApiWrapper";
import CustomHead from "@/components/customHead"
import Header from "@/components/header"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export type Exam = {
  question: {
    card_id: number;
    id: number;
    locale_id: number;
    locale_name: string;
    word: string;
  },
  answer: {
    card_id: number;
    id: number;
    locale_id: number;
    locale_name: string;
    word: string;
  }
};

const initialExam: Exam = {
  question: {
    card_id: 0,
    id: 0,
    locale_id: 0,
    locale_name: "",
    word: "読み込み中..."
  },
  answer: {
    card_id: 0,
    id: 0,
    locale_id: 0,
    locale_name: "",
    word: "loading..."
  }
};

export type Result = {
  locale_id: number;
  locale_name: string;
  correctCount: number;
  questionCount: number;
};

const Exam = () => {
  const router = useRouter();
  const deckId = router.query.deckId;
  const [exams, setExams] = useState<Exam[]>([initialExam])
  const [isHidden, setIsHidden] = useState(true)
  const [questionId, setQuestion] = useState(0)
  const [results, setResults] = useState<Result[]>()

  useEffect(() => {

    Api.post(`/exam/exam`, { deckId })
      .then((res) => {
        console.log(res)
        setExams(res.data.exams)
        setResults(res.data.results)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [deckId]);

  const handleFlip = () => {
    setIsHidden(!isHidden)
  }

  const handleAnswer = (isCorrect, localeId) => {
    let newResults = results
    if (isCorrect) {
      newResults = results.map((result) =>
        result.locale_id === localeId || result.locale_id === 0
          ? { ...result, correctCount: result.correctCount + 1 }
          : result
      )
      setResults(newResults)
    }
    if (questionId < exams.length - 1) {
      handleFlip()
      setQuestion(questionId + 1)
    } else {
      finishExam(newResults)
    }
  }

  const finishExam = (newResults) => {
    sessionStorage.setItem('results', JSON.stringify(newResults));
    router.push({
      pathname: '/exam/examResult'
    })
    console.log(newResults)
  }




  return (
    <>
      <CustomHead />
      <Header />
      <div className="flex h-auto flex-col items-center">
        {/* <button className="m-4 w-40 rounded-md bg-primary-light px-4 py-2">中断する</button> */}
        <div className="mt-20 flex h-96 w-main gap-4">
          <div className="flex flex-1 flex-col items-center rounded-md bg-white p-6">
            <div className="text-xl"><p>{exams[questionId].question.locale_name}</p></div>
            <div className="flex h-full items-center text-6xl">
              <p className="flex-col">{exams[questionId].question.word}</p>
            </div>
          </div>
          {isHidden ? (
            <div className="flex flex-1 flex-col items-center rounded-md bg-white p-6" onClick={handleFlip} >
              <div className="text-xl"><p>{exams[questionId].answer.locale_name}</p></div>
              <div className="flex h-full items-center text-3xl text-gray-400">
                <p className="flex-col">クリックして答えを確認</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center rounded-md bg-white p-6">
              <div className="text-xl"><p>{exams[questionId].answer.locale_name}</p></div>
              <div className="flex h-full items-center text-6xl">
                <p className="flex-col">{exams[questionId].answer.word}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="h-10 w-20 rounded-md bg-primary-light"
                  onClick={() => handleAnswer(true, exams[questionId].answer.locale_id)}>
                  ◯
                </button>
                <button
                  className="h-10 w-20 rounded-md bg-secondary"
                  onClick={() => handleAnswer(false, exams[questionId].answer.locale_id)}>
                  X

                </button>
              </div>
            </div>)}
        </div>
      </div >
    </>
  )
}

export default Exam
