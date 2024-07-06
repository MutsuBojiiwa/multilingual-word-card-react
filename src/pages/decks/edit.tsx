/* eslint-disable max-lines */
import { Api } from "@/api/ApiWrapper";
import CustomHead from "@/components/customHead";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditModal from './editModal';
import LocaleSelectModal from "./localeSelectModal";

export type Deck = {
  id: number;
  userId: number;
  name: string;
  isFavorite: boolean;
  isPublic: boolean;
};

export type Locale = {
  id: number
  code: string
  name: string
};

const initialDeck: Deck = {
  id: 0,
  name: "",
  userId: 0,
  isFavorite: false,
  isPublic: false,
};

interface FormValues {
  words: { word: string }[];
}

const FormSchema = z.object({
  words: z
    .array(
      z.object({
        word: z.string().max(255, "255字以内で入力してください"),
      })
    )
});

function generateDetails(locales, words) {
  const details = words.map((word, index) => ({
    locale_id: locales[index].id,
    word: word.word
  }));

  return details
}

const DeckEditPage = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [cards, setCards] = useState([]);
  const [locales, setLocales] = useState([]);
  // const [isEdit, setIsEdit] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFirst, setIsFirst] = useState(false)

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      words: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "words",
  });

  useEffect(() => {
    const { id, name, userId, isFavorite, isPublic } = router.query;
    const deck: Deck = {
      id: Number(id),
      userId: Number(userId),
      name: String(name),
      isFavorite: isFavorite === "true",
      isPublic: isPublic === "true",
    };
    setDeck(deck);

    Api.get(`/cards/${deck.id}`).then((res) => {
      console.log("get")
      setCards(res.data.cards)

      if (!locales.length) {
        // eslint-disable-next-line max-depth
        if (res.data.locales.length) {
          setLocales(res.data.locales)
          reset({
            words: res.data.locales.map(() => ({ word: "" }))
          });
        }else{
          setIsFirst(true)
        }
      }
      reset({
        words: locales.map(() => ({ word: "" }))
      });

    });
  }, [router.query, reset, locales]);

  const handleFavoriteChange = () => {
    const newDeck: Deck = {
      ...deck,
      isFavorite: !deck.isFavorite,
    };
    setDeck(newDeck);

    Api.put(`/decks/update/${newDeck.id}`, newDeck)
      .then(() => {
        console.log("update OK");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePublicChange = () => {
    const newDeck: Deck = {
      ...deck,
      isPublic: !deck.isPublic,
    };
    setDeck(newDeck);
  };

  const onSubmit = (values: FormValues) => {
    const details = generateDetails(locales, values.words)
    console.log(details);

    const data = {
      deck_id: deck.id,
      details
    }

    Api.post(`/cards/store`, data)
      .then(() => {
        console.log("create OK")
        Api.get(`/cards/${deck.id}`).then((res) => {
          setCards(res.data.cards);
          setLocales(res.data.locales);

          reset({
            words: res.data.locales.map(() => ({ word: "" })),
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (cardId, event) => {
    event.preventDefault();
    Api.delete(`/cards/${cardId}`)
      .then(() => {
        console.log("delete OK")
        Api.get(`/cards/${deck.id}`).then((res) => {

          setCards(res.data.cards);
          setLocales(res.data.locales);


          reset({
            words: res.data.locales.map(() => ({ word: "" })),
          });
        });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const handleEdit = (cardId, event) => {
    event.preventDefault()
    console.log(cardId)

  };

  return (
    <>
      <CustomHead />
      <Header />
      <EditModal isOpen={isEditModalOpen} onClose={closeEditModal} deck={deck} setDeck={setDeck} />
      <LocaleSelectModal isOpen={isFirst} onClose={() => setIsFirst(false)} setLocales={setLocales} />

      <div className="flex flex-col items-center">
        <div className="flex w-main flex-col items-center">
          <div className="my-10 w-96 rounded-md bg-white p-4">
            <button className="" onClick={handleFavoriteChange}>
              {deck.isFavorite ? (
                <img className="size-8" src="/isFavorite_true.svg" alt="" />
              ) : (
                <img className="size-8" src="/isFavorite_false.svg" alt="" />
              )}
            </button>
            <div className="flex flex-col items-center ">
              <button onClick={openEditModal}>
                <div className="mb-4 text-4xl">{deck.name}</div>
              </button>
              <div className="flex items-center">
                <div>
                  <input
                    type="radio"
                    name="publicness"
                    id="isPublic"
                    value="true"
                    checked={deck.isPublic}
                    onChange={handlePublicChange}
                  />
                  <label htmlFor="isPublic" className="ml-2 mr-8">
                    公開
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="publicness"
                    id="isNotPublic"
                    value="false"
                    checked={!deck.isPublic}
                    onChange={handlePublicChange}
                  />
                  <label htmlFor="isNotPublic" className="ml-2">
                    非公開
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-40 flex w-main flex-col items-center">
            <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
              <table className="">
                <thead>
                  <tr>
                    <th className="border-b border-primary-light p-4" />
                    {locales.map((locale) => (
                      <th className="border-b border-primary-light p-4" key={locale.id}>
                        {locale.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.id}>
                      <td className="border-b border-primary-light px-10 py-4" >
                        <button type="button" onClick={(event) => handleDelete(card.id, event)}>
                          <img className="size-6" src="/delete.svg" alt="" />
                        </button>
                        <button type="button" onClick={(event) => handleEdit(card.id, event)}>
                          <img className="ml-6 size-6" src="/edit.svg" alt="" />
                        </button>
                      </td>
                      {card.details.map((detail) => (
                        <td className="border-b border-primary-light px-10 py-4" key={detail.id}>
                          {detail.word}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="border-b border-primary-light px-10" />
                    {fields.map((field, index) => (
                      <td className="border-b border-primary-light px-10" key={field.id}>
                        <textarea
                          className="p-2"
                          {...register(`words.${index}.word` as const, { required: 'This field is required' })}
                        />
                        {errors.words?.[index]?.word && (
                          <div className="mt-2 text-sm text-error">
                            {errors.words[index].word?.message}
                          </div>
                        )}
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
  );
};

export default DeckEditPage;
