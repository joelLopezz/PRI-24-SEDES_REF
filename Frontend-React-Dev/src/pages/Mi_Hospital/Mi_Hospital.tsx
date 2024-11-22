/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../Components/ConfirmationModal';

interface Especialidad {
  id: number; // ID de la relación
  especialidad_ID: number; // ID de la especialidad
  especialidad: {
    nombre: string;
  };
}

const MiHospital: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { establecimientoID } = useAuth();
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [especialidadAEliminar, setEspecialidadAEliminar] = useState<Especialidad | null>(null);

  useEffect(() => {
    if (establecimientoID === null) return;

    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get<Especialidad[]>(
          `${API_BASE_URL}/estab-especialidad/especialidades/${establecimientoID}`
        );
        setEspecialidades(response.data);
      } catch (err) {
        setError('Error al cargar las especialidades del hospital');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [establecimientoID]);

  const handleAgregarEspecialidades = () => {
    navigate('/miHospital/agregar-especialidades');
  };

  const handleVerDisponibilidad = () => {
    navigate('/miHospital/ver-disponibilidad', { state: { especialidades } });
  };

  const handleVerServicios = (especialidadId: number, especialidadNombre: string) => {
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, { state: { especialidadNombre } });
  };

  // Función para manejar el clic en el ícono de eliminación
  const handleDeleteClick = (especialidad: Especialidad) => {
    setEspecialidadAEliminar(especialidad);
    setIsModalOpen(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (especialidadAEliminar) {
      console.log("ID enviado para eliminación:", especialidadAEliminar.id); // Log para verificar el ID
      try {
        await axios.delete(`${API_BASE_URL}/estab-especialidad/${especialidadAEliminar.id}`);
        setEspecialidades((prevEspecialidades) =>
          prevEspecialidades.filter((esp) => esp.id !== especialidadAEliminar.id)
        );
        setIsModalOpen(false);
        setEspecialidadAEliminar(null);
      } catch (err) {
        console.error('Error al eliminar la especialidad:', err);
      }
    }
  };
  

  // Función para cerrar el modal sin eliminar
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEspecialidadAEliminar(null);
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando especialidades...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Especialidades de Mi Hospital</h1>
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleVerDisponibilidad}
          className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Ver Disponibilidad
        </button>
        <button
          onClick={handleAgregarEspecialidades}
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Agregar Especialidades
        </button>
      </div>

      {error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : especialidades.length > 0 ? (
        <ul className="space-y-4 mt-6">
          {especialidades.map((especialidad) => (
            <li
              key={especialidad.id}
              className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
            >
              <span>{especialidad.especialidad.nombre}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleVerServicios(especialidad.id, especialidad.especialidad.nombre)}
                  className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Ver Servicios
                </button>
                <button
                  onClick={() => handleDeleteClick(especialidad)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">Aún no hay especialidades seleccionadas.</p>
      )}

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que deseas eliminar esta especialidad?"
      />
    </div>
  );
};

export default MiHospital;
