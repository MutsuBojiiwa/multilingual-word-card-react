import React from 'react';
import { Api } from '@/api/ApiWrapper';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface CardDetail {
  id: number
  word: string
}

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardDetail: CardDetail;
}

interface FormValues {
  word: string
}

const FormSchema = z.object({
  word: z
    .string({
      required_error: '単語を入力してください'
    })
})

const EditWordModal: React.FC<EditWordModalProps> = ({ isOpen, onClose, cardDetail }) => {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })

  if (!isOpen) return null;

  const onSubmit = (values: FormValues) => {
    const newDetail = {
      ...cardDetail,
      word: values.word
    }
    
    console.log(newDetail)
    Api.put(`/cards/details/update/${newDetail.id}`, newDetail)
      .then((res) => {
        console.log("put OK");
        console.log(res);
        // setDeck(newDeck)
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
      <div className="relative flex h-96 w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-1 text-2xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <p>単語編集</p>
        <form className='mb-4 flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('word', { required: 'Word is required' })}
            type="text"
            id="word"
            className='w-full p-2'
            placeholder="単語を入力..."
            defaultValue={cardDetail.word}
            required
          />
            {errors.word && <div className="mt-2 text-sm text-error">{errors.word.message}</div>}

          <button
            className="w-40 rounded bg-primary px-4 py-2 text-white"
            type="submit"
            disabled={!isDirty}
          >
            保存
          </button>
        </form>
        <button
          className="mt-10 w-40 rounded bg-gray-400 px-4 py-2 text-white"
          onClick={onClose}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default EditWordModal;
