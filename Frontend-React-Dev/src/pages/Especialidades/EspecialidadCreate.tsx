 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito
import { validateNombre } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext'; // Importar useAuth
import axios, { AxiosError } from 'axios';

interface AxiosErrorResponse {
  statusCode: number;
  message: string | string[]; // Puede ser una cadena o un arreglo de cadenas
  error: string;
}


const EspecialidadCreate: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth(); // Extraer usuarioID del contexto de autenticación
  const navigate = useNavigate();

  // Estado del formulario con nombres correctos según el backend
  const [formData, setFormData] = useState({
    nombre: '', // Solo el campo "nombre"
  });

  const [isModalOpen, setModalOpen] = useState(false); // Controlamos la apertura del modal de éxito

  // Al cambiar el valor de un campo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Aplicar la validación y convertir a mayúsculas si es válido
    if (name === "nombre") {
      const upperCaseValue = value.toUpperCase();
  
      if (validateNombre(upperCaseValue) || upperCaseValue === '') {
        setFormData({
          ...formData,
          [name]: upperCaseValue, // Actualizar en mayúsculas
        });
      } else {
        alert('El nombre no debe comenzar con un espacio ni contener múltiples espacios consecutivos.');
      }
    }
  };
  

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convertir el nombre a mayúsculas antes de enviar
      const upperCaseData = {
        ...formData,
        nombre: formData.nombre.toUpperCase(),
        estado: 1,
        usuario_creacion: usuarioID,
      };
  
      console.log('Enviando datos:', upperCaseData);
  
      await axios.post(`${API_BASE_URL}/specialties`, upperCaseData);
      setModalOpen(true);
    } catch (error: unknown) {
      console.error('Error al crear la especialidad:', error);
  
      // Manejar errores de Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message ||
          'Ocurrió un error al crear la especialidad. Por favor, inténtalo de nuevo.';
  
        // Si el mensaje es un arreglo, unirlo en una cadena
        alert(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      } else {
        alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      }
    }
  };
  
  


  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/especialidades'); // Redirigimos después de cerrar el modal
  };

  // Cancelar la operación
  const handleCancel = () => {
    navigate('/especialidades'); // Redirigir a la lista si se cancela
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Crear Nueva Especialidad</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre de la Especialidad</label>
          <input
            type="text"
            name="nombre" // Asegúrate de que el name sea "nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Botones */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Crear Especialidad
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La especialidad ha sido creada exitosamente."
      />
    </div>
  );
};

export default EspecialidadCreate;
