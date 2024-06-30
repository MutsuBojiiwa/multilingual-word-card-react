// src/EditModal.tsx
import React from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">Edit Modal Content</h2>
        <p className="mb-4">This is the content of the edit modal.</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
