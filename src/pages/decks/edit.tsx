import { Api } from "@/api/ApiWrapper"
import CustomHead from "@/components/customHead"
import Header from "@/components/header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DeckEditPage = () => {
  const [cards, setCards] = useState([])
  const router = useRouter();
  const { deckId } = router.query;

  useEffect(() => {
    Api.get(`/cards/${deckId}`)
    .then((res)=>{
      console.log(res.data)
      setCards(res.data)
    })
  },[deckId])

  return (
    <>
      <CustomHead />
      <Header />
      <div>edit page</div>
      <div>{cards.map(card => (
        <div key={card.id}>{card.deck_id}</div>
      ))}
      </div>
    </>
  )
}

export default DeckEditPage