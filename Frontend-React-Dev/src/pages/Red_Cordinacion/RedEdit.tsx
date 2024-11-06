import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';

interface RedCordinacionData {
  nombre: string;
  numeracion: string;
}

const RedEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RedCordinacionData>({
    nombre: '',
    numeracion: '',
  });

  // Estado para controlar el modal de éxito
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRed = async () => {
      try {
        const response = await axios.get<RedCordinacionData>(`http://localhost:3000/red-cordinacion/${id}`);
        const data = response.data as RedCordinacionData; // Aplicar 'type assertion' para especificar el tipo de response.data

        setFormData({
          nombre: data.nombre,
          numeracion: data.numeracion,
        });
      } catch (error) {
        console.error('Error al cargar la red de coordinación:', error);
      }
    };

    fetchRed();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/red-cordinacion/${id}`, {
        ...formData,
        usuario_modificacion: 1, // Temporalmente asignamos el ID del usuario de modificación
      });
      setModalOpen(true); // Abrir el modal de éxito
    } catch (error) {
      console.error('Error al actualizar la red de coordinación:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
    navigate('/red-cordinacion'); // Redirigir a la lista de redes de coordinación
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
          <input
            type="text"
            name="numeracion"
            value={formData.numeracion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar Cambios
          </button>
          <button type="button" onClick={() => navigate('/red-cordinacion')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La red de coordinación ha sido actualizada exitosamente."
      />
    </div>
  );
};

export default RedEdit;
