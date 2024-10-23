import React from 'react';
import successIcon from '../assets/Images/exito.png'; // Importar el icono de éxito

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string; // El mensaje que será dinámico
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-green-600 via-blueGray-600 to-teal-700 border-4 border-white rounded-xl shadow-2xl w-96 p-6 transform transition-transform duration-300 scale-100">




        {/* Icono de éxito */}
        <div className="flex justify-center mb-4">
          <img src={successIcon} alt="Success Icon" className="h-16 w-16" />
        </div>

        {/* Mensaje de éxito */}
        <h2 className="text-2xl font-bold text-white text-center mb-4">¡Éxito!</h2>
        <p className="text-lg text-gray-100 text-center mb-6">{message}</p>

        {/* Botón de confirmación */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
