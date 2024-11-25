import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../Components/SuccessModal';
import { validateNombre, validateNumeracion } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext';
import axios, { AxiosError } from 'axios';


const toRoman = (num: number): string => {
  const romanNumerals: { [key: number]: string } = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };
  let roman = "";
  for (const value of Object.keys(romanNumerals).map(Number).sort((a, b) => b - a)) {
    while (num >= value) {
      roman += romanNumerals[value];
      num -= value;
    }
  }
  return roman;
};

const RedCreate: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    numeracion: '',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nombre") {
      const upperCaseValue = value.toUpperCase();
      if (validateNombre(upperCaseValue) || upperCaseValue === '') {
        setFormData({
          ...formData,
          [name]: upperCaseValue,
        });
      } else {
        alert("El nombre solo debe contener letras, sin espacios al inicio y solo un espacio entre palabras.");
      }
    } else if (name === "numeracion") {
      if (validateNumeracion(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        alert("La numeración debe ser solo números, sin espacios al inicio o al final.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataWithRomanNumeration = {
        ...formData,
        nombre: formData.nombre.toUpperCase(), // Convertir a mayúsculas
        numeracion: toRoman(parseInt(formData.numeracion, 10)),
        estado: 1,
        usuario_ID: usuarioID,
      };

      await axios.post(`${API_BASE_URL}/red-cordinacion`, formDataWithRomanNumeration);
      setModalOpen(true);
    } catch (error: unknown) {
      console.error('Error al crear la red de coordinación:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string | string[] }>;
        const errorMessage =
          axiosError.response?.data?.message ||
          'Ocurrió un error al crear la red de coordinación. Por favor, inténtalo de nuevo.';

        alert(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      } else {
        alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/red-coordinacion');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nueva Red de Coordinación</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Numeración</label>
          <input
            type="text"
            name="numeracion"
            value={formData.numeracion}
            onChange={handleChange}
            placeholder="Escribe un número y será convertido a romano para su guardado"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar
          </button>
          <button type="button" onClick={() => navigate('/red-coordinacion')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La red de coordinación ha sido creada exitosamente."
      />
    </div>
  );
};

export default RedCreate;
