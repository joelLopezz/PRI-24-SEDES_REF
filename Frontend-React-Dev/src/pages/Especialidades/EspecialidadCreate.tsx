import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EspecialidadCreate: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 1, // Por defecto activo (1)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/specialties', formData); // Cambia la URL si es necesario
      navigate('/especialidades'); // Redirigir a la lista de especialidades después de crear
    } catch (error) {
      console.error('Error al crear la especialidad:', error);
    }
  };

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
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
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
    </div>
  );
};

export default EspecialidadCreate;
