import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { validateNombre, validateNumeracion, toRoman } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext';

const romanToNumber = (roman: string): number => {
  const romanNumerals: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  
  let sum = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanNumerals[roman[i]];
    const next = romanNumerals[roman[i + 1]];

    if (next && current < next) {
      sum -= current;
    } else {
      sum += current;
    }
  }
  return sum;
};

interface RedCordinacionData {
  nombre: string;
  numeracion: string;
}

const RedEdit: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RedCordinacionData>({
    nombre: '',
    numeracion: '',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRed = async () => {
      try {
        const response = await axios.get<RedCordinacionData>(`${API_BASE_URL}/red-cordinacion/${id}`);
        const data = response.data;

        setFormData({
          nombre: data.nombre,
          numeracion: String(romanToNumber(data.numeracion)), // Convertir a número normal
        });
      } catch (error) {
        console.error('Error al cargar la red de coordinación:', error);
      }
    };

    fetchRed();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nombre") {
      if (validateNombre(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
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
        numeracion: toRoman(parseInt(formData.numeracion, 10)), // Convertimos el número a romano
        usuario_modificacion: usuarioID, 
      };

      await axios.patch(`${API_BASE_URL}/red-cordinacion/${id}`, formDataWithRomanNumeration);
      setModalOpen(true);
    } catch (error) {
      console.error('Error al actualizar la red de coordinación:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/red-coordinacion');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Red de Coordinación</h1>
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
          <p className="text-sm text-gray-500 mb-2">
            Número original en romano, convertido a número normal. Modifíquelo en número normal y se guardará como romano.
          </p>
          <input
            type="text"
            name="numeracion"
            value={formData.numeracion}
            onChange={handleChange}
            placeholder="Escribe un número y será convertido a romano"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar Cambios
          </button>
          <button type="button" onClick={() => navigate('/red-coordinacion')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La red de coordinación ha sido actualizada exitosamente."
      />
    </div>
  );
};

export default RedEdit;
