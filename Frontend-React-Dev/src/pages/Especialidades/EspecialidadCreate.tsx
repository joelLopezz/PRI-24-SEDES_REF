import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito


const EspecialidadCreate: React.FC = () => {
  const navigate = useNavigate();

  // Estado del formulario con nombres correctos según el backend
  const [formData, setFormData] = useState({
    nombre: '', // Cambiado de "name" a "nombre"
    descripcion: '', // Cambiado de "description" a "descripcion"
  });

  const [isModalOpen, setModalOpen] = useState(false); // Controlamos la apertura del modal de éxito

  // Al cambiar el valor de un campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Log para verificar datos antes de enviar
      console.log('Enviando datos:', formData);

      // Enviar la solicitud POST con el status=1 por defecto
      await axios.post('http://localhost:3000/specialties', { ...formData, estado: 1 });
      setModalOpen(true); // Abrimos el modal de éxito al completar la creación
    } catch (error) {
      console.error('Error al crear la especialidad:', error);
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

        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descripcion" // Asegúrate de que el name sea "descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
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
