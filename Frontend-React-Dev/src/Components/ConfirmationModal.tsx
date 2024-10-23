import React from 'react';
import warningIcon from '../assets/Images/advertencia.png'; // Importar tu icono personalizado

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-900 border-4 border-white rounded-xl shadow-2xl w-96 p-6 transform transition-transform duration-300 scale-100">
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-4">
          <img src={warningIcon} alt="Warning Icon" className="h-16 w-16" />
        </div>

        {/* Mensaje de confirmación */}
        <h2 className="text-lg font-bold text-white text-center mb-4">{message}</h2>

        {/* Botones de acción */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-xl transform hover:scale-110 hover:shadow-2xl"
          >
            SI
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-900 px-6 py-2 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-xl transform hover:scale-110 hover:shadow-2xl"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
