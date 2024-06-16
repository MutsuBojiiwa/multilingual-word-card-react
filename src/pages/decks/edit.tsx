import { Api } from "@/api/ApiWrapper"
import CustomHead from "@/components/customHead"
import Header from "@/components/header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Deck = {
  id: number,
  name: string,
  isFavorite: boolean,
  isPublic: boolean
}

const initialDeck: Deck = {
  id: 0,
  name: "",
  isFavorite: false,
  isPublic: false
}

const DeckEditPage = () => {
  const [deck, setDeck] = useState(initialDeck)
  const [cards, setCards] = useState([])
  const [locales, setLocales] = useState([])
  const router = useRouter();


  useEffect(() => {
    const { deckId, deckName, isFavorite, isPublic, } = router.query
    const deck: Deck = {
      id: Number(deckId),
      name: String(deckName),
      isFavorite: isFavorite === "1",
      isPublic: isPublic === "1",
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
  };

  const handlePublicChange = () => {
    const newDeck: Deck = {
      ...deck,
      isPublic: !deck.isPublic
    }
    setDeck(newDeck);
  };

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
          <div className="w-main bg-red-100">
            <table>
              <thead>
                <tr>{locales.map(locale => (
                  <td key={locale.id}>{locale.key}</td>
                ))}
                </tr>
              </thead>
              <tbody>{cards.map(card => (
                <tr key={card.id}>{card.details.map(detail => (
                  <td key={detail.id}>{detail.word}</td>
                ))}</tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeckEditPage