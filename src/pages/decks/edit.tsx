/* eslint-disable max-lines */
import { Api } from "@/api/ApiWrapper"
import CustomHead from "@/components/customHead"
import Header from "@/components/header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Deck = {
  id: number,
  userId: number,
  name: string,
  isFavorite: boolean,
  isPublic: boolean
}

const initialDeck: Deck = {
  id: 0,
  name: "",
  userId: 0,
  isFavorite: false,
  isPublic: false
}

interface FormValues {
  word: string
}

const FormSchema = z.object({
  word: z
    .string({
      required_error: '単語を入力してください'
    })
    .max(255, '255字以内で入力してください'),
})

const DeckEditPage = () => {
  const [deck, setDeck] = useState(initialDeck)
  const [cards, setCards] = useState([])
  const [locales, setLocales] = useState([])
  const router = useRouter();


  useEffect(() => {
    const { id, name, userId, isFavorite, isPublic, } = router.query
    const deck: Deck = {
      id: Number(id),
      userId: Number(userId),
      name: String(name),
      isFavorite: isFavorite === "true",
      isPublic: isPublic === "true",
    }
    setDeck(deck)

    Api.get(`/cards/${deck.id}`)
      .then((res) => {
        console.log(res.data)
        setCards(res.data.cards)
        setLocales(res.data.locales)
      })
  }, [router.query])

  const handleFavoriteChange = () => {
    const newDeck: Deck = {
      ...deck,
      isFavorite: !deck.isFavorite
    }
    setDeck(newDeck);
    console.log("newDeck")
    console.log(newDeck)

    Api.put(`/decks/update/${newDeck.id}`, newDeck)
      .then((res) => {
        console.log("put OK")
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })

  };

  const handlePublicChange = () => {
    const newDeck: Deck = {
      ...deck,
      isPublic: !deck.isPublic
    }
    setDeck(newDeck);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
    // Api.post('/auth/register', {
    //   name: values.name,
    //   email: values.email,
    //   password: values.password,
    // })
    //   .then(() => {
    //     handleLogin(values, router)
    //   })
    //   .catch((e) => {
    //     if (e.response.status === 422) {
    //       alert(e.response.data.message)
    //     }else{
    //       alert("ユーザーの登録に失敗しました")
    //     }
    //     console.log(e)
    //   })
  }

  return (
    <>
      <CustomHead />
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex w-main flex-col items-center">
          <div className="my-10 w-96 rounded-md bg-white p-4">
            <button
              className=""
              onClick={handleFavoriteChange}>
              {deck.isFavorite ?
                (<img className="size-8" src="/isFavorite_true.svg" alt="" />) :
                (<img className="size-8" src="/isFavorite_false.svg" alt="" />)
              }</button>
            <div className="flex flex-col items-center ">
              <div className="mb-4 text-4xl">{deck.name}</div>
              <div className="flex items-center">
                <div>
                  <input type="radio" name="publicness" id="isPublic" value="true" checked={deck.isPublic} onChange={handlePublicChange} />
                  <label htmlFor="isPublic" className="ml-2 mr-8">公開</label>
                </div>
                <div>
                  <input type="radio" name="publicness" id="isNotPublic" value="false" checked={!deck.isPublic} onChange={handlePublicChange} />
                  <label htmlFor="isNotPublic" className="ml-2">非公開</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-40 flex w-main flex-col items-center">
            <form className="flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}>
              <table className="">
                <thead>
                  <tr>
                    {locales.map(locale => (
                      <th className="border-b border-primary-light p-4"
                        key={locale.id}>
                        {locale.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cards.map(card => (
                    <tr key={card.id}>
                      {card.details.map(detail => (
                        <td className="border-b border-primary-light px-10 py-4"
                          key={detail.id}>
                          {detail.word}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    {locales.map(locale => (
                      <td className="border-b border-primary-light px-10"
                        key={locale.id}>
                        <textarea className="p-2"
                        {...register('word')}
                          name="" id="word" />
                          {errors.word && <div className="mt-2 text-sm text-error">{errors.word.message}</div>}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className="m-8 w-40 rounded-md bg-primary px-4 py-2 text-white"
                disabled={!isDirty}
              >
                登録
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeckEditPage