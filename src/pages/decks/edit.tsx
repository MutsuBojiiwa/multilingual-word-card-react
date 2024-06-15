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
  const router = useRouter();


  useEffect(() => {
    const { deckId, deckName, isFavorite, isPublic, } = router.query
    const deck: Deck = {
      id: Number(deckId),
      name: String(deckName),
      isFavorite: isFavorite === "1",
      isPublic: isPublic === "1",
    }
    console.log(deck)
    setDeck(deck)

    Api.get(`/cards/${deck.id}`)
      .then((res) => {
        console.log(res.data)
        setCards(res.data)
      })
  }, [router.query])

  return (
    <>
      <CustomHead />
      <Header />
      <div>{deck.id}</div>
      <div>{deck.name}</div>
      <div>{deck.isFavorite ? "true" : "false"}</div>
      <div>{deck.isPublic ? "true" : "false"}</div>
      <div>{cards.map(card => (
        <div key={card.id}>{card.word}</div>
      ))}
      </div>
    </>
  )
}

export default DeckEditPage