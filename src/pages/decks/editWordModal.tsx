import React from 'react';
// import { Api } from '@/api/ApiWrapper';

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditWordModal: React.FC<EditWordModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = (values) => {

    console.log(values)
    // Api.put(`/cards/${card.id}`)
    //   .then((res) => {
    //     console.log("delete OK");
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
        <button
          className="mt-10 w-40 rounded bg-primary px-4 py-2 text-white"
          onClick={handleDelete}
        >
          保存
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

export default EditWordModal;
