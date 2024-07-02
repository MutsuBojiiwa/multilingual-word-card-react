import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Deck } from './edit';
import { Api } from '@/api/ApiWrapper';
import DeleteModal from './deleteModal';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck,
  setDeck: React.Dispatch<React.SetStateAction<Deck>>
}

interface FormValues {
  name: string
}

const FormSchema = z.object({
  name: z
    .string({
      required_error: '名前は必須です'
    })
    .max(255, '255字以内で入力してください')
});

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, deck, setDeck }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = (values: FormValues) => {
    const newDeck: Deck = {
      ...deck,
      name: values.name,
    };
    Api.put(`/decks/update/${newDeck.id}`, newDeck)
      .then((res) => {
        console.log("put OK");
        console.log(res);
        setDeck(newDeck)
        onClose()
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
      onClick={handleOverlayClick}
    >
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} deck={deck}/>
      <div className="relative flex w-full max-w-lg flex-col items-center rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-1 text-2xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <form className='mb-4 flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-10 border-b-2 border-primary-light text-4xl '>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className='w-full p-2'
              placeholder="デッキ名を入力..."
              defaultValue={deck.name}
              required
            />
            {errors.name && <div className="mt-2 text-sm text-error">{errors.name.message}</div>}
          </div>
          <button
            className="w-40 rounded bg-primary px-4 py-2 text-white"
            type="submit"
            disabled={!isDirty}
          >
            保存
          </button>
        </form>
        <button
            className="w-40 rounded bg-error px-4 py-2 text-white"
            onClick={openDeleteModal}
          >
            デッキを削除する
          </button>
      </div>
    </div >
  );
};

export default EditModal;
