import React from 'react';
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Deck } from './edit';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck
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

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, deck }) => {

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

  const handleDelete = () => {
    
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
      onClick={handleOverlayClick}
    >
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
            onClick={handleDelete}
          >
            デッキを削除する
          </button>
      </div>
    </div >
  );
};

export default EditModal;
