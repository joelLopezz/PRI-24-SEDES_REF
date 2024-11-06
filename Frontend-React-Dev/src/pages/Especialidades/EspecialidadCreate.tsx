import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { validateNombre } from '../../Components/validations/Validations'; // Importar la validación

const EspecialidadCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validar el valor antes de actualizar el estado
    if (validateNombre(value) || value === '') {
      setFormData({ ...formData, [name]: value });
      setError(''); // Limpiar el error si la validación es exitosa
    } else {
      setError('El nombre de la especialidad no es válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Eliminar espacios al final antes de validar
    // const nombreTrimmed = formData.nombre.trimEnd();
    const nombreTrimmed = formData.nombre.trimEnd().toUpperCase(); 

    // Validar el nombre de la especialidad al enviar
    if (!validateNombre(nombreTrimmed)) {
      setError('El nombre de la especialidad no es válido.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/specialties', { ...formData, nombre: nombreTrimmed, estado: 1 });
      setModalOpen(true);
    } catch (error) {
      console.error('Error al crear la especialidad:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/especialidades');
  };

  const handleCancel = () => {
    navigate('/especialidades');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Crear Nueva Especialidad</h1>

      {/* {error && <div className="text-red-500 mb-4">{error}</div>} Mostrar error si existe */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre de la Especialidad</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

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

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La especialidad ha sido creada exitosamente."
      />
    </div>
  );
};

export default EspecialidadCreate;
