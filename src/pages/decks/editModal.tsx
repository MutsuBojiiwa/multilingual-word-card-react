// src/EditModal.tsx
import React from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-2 text-xl font-semibold">Edit Modal Content</h2>
        <p className="mb-4">This is the content of the edit modal.</p>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
