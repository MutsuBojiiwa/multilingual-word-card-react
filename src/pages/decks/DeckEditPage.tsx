import { Api } from "@/api/ApiWrapper";
import CustomHead from "@/components/customHead";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Deck } from "./edit";
import { initialDeck } from "./edit";

export const DeckEditPage = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [cards, setCards] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const { deckId, deckName, isFavorite, isPublic, } = router.query;
    const deck: Deck = {
      id: Number(deckId),
      name: String(deckName),
      isFavorite: isFavorite === "1",
      isPublic: isPublic === "1",
    };
    console.log(deck);
    setDeck(deck);

    Api.get(`/cards/${deck.id}`)
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      });
  }, [router.query]);

  return (
    <>
      <CustomHead />
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex w-main flex-col items-center">
          <div className="my-10 flex w-96 flex-col items-center rounded-md bg-white p-4">
            <div>{deck.isFavorite ? "⚪︎" : "x"}</div>
            <div className="text-4xl">{deck.name}</div>
            <div className="flex items-center">
              <div>
                <input type="radio" name="publicness" id="isPublic" value="true" />
                <label htmlFor="isPublic" className="ml-2 mr-8">公開</label>
              </div>
              <div>
                <input type="radio" name="publicness" id="isNotPublic" value="false" />
                <label htmlFor="isPublic" className="ml-2">非公開</label>
              </div>
            </div>
            <div>{deck.isPublic ? "true" : "false"}</div>
          </div>
          <div className="w-main bg-red-100">
            <div>{cards.map(card => (
              <div key={card.id}>{card.word}</div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
