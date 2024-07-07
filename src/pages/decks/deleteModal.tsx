import React from 'react';
import { useRouter } from 'next/router';
import type { Deck } from './edit';
import { Api } from '@/api/ApiWrapper';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, deck }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = (values) => {

    console.log(values)
    Api.delete(`/decks/${deck.id}`)
      .then((res) => {
        console.log("delete OK");
        router.push('/dashboard');
        console.log(res);
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
        <p>このデッキ内の単語も削除されます。</p>
        <p>一度削除すると元に戻せません。</p>
        <p>本当にデッキを削除しますか？</p>
        <button
          className="mt-10 w-40 rounded bg-error px-4 py-2 text-white"
          onClick={handleDelete}
        >
          デッキを削除する
        </button>
        <button
          className="mt-10 w-40 rounded bg-gray-400 px-4 py-2 text-white"
          onClick={onClose}
        >
          戻る
        </button>
      </div>
    </div >
  );
};

export default DeleteModal;
