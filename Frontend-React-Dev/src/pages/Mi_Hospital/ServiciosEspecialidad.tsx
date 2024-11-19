/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Asegúrate de importar correctamente el modal
import { useAuth } from '../../Context/AuthContext'; // Importa el contexto de autenticación


interface Servicio {
  id: number;
  servicio: {
    codigo: string;
    nombre: string;
  };
}

const ServiciosEspecialidad: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const { especialidadNombre } = state as { especialidadNombre: string };
  const navigate = useNavigate();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

  // Obtén el establecimientoID del contexto de autenticación
  const { establecimientoID } = useAuth();

  useEffect(() => {
    const fetchServicios = async () => {
      if (!establecimientoID) {
        setError('Establecimiento no encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Servicio[]>(
          `${API_BASE_URL}/estab-servicio/establecimiento/${establecimientoID}/especialidad/${especialidadId}/servicios`
        );
        setServicios(response.data);
      } catch (err) {
        setError('Error al cargar los servicios de la especialidad');
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, [especialidadId, establecimientoID]);

  const handleAgregarServicios = () => {
    navigate(`/miHospital/especialidad/${especialidadId}/agregar-servicios`, { state: { especialidadNombre } });
  };

  const handleEstablecerDisponibilidad = () => {
    navigate(`/miHospital/especialidad/${especialidadId}/establecer-disponibilidad`, { state: { especialidadNombre } });
  };

  const openDeleteModal = (id: number) => {
    setServiceToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setServiceToDelete(null);
  };

  const handleDeleteService = async () => {
    if (serviceToDelete !== null) {
      try {
        await axios.delete(`${API_BASE_URL}/estab-servicio/${serviceToDelete}`);
        setServicios((prevServicios) => prevServicios.filter((servicio) => servicio.id !== serviceToDelete));
        closeDeleteModal();
      } catch (err) {
        setError('Error al eliminar el servicio');
      }
    }
  };

  const handleVerDisponibilidad = () => {
    navigate(`/miHospital/especialidad/${especialidadId}/ver-disponibilidad`, { state: { especialidadNombre } });
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando servicios...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Servicios de la Especialidad {especialidadNombre}</h1>
        <button
          onClick={handleVerDisponibilidad}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Ver Disponibles por mes
        </button>
        <button
          onClick={handleEstablecerDisponibilidad}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Establecer Disponibilidad
        </button>
      </div>

      {error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : servicios.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Código</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td className="py-2 px-4 border-b">{servicio.servicio.codigo}</td>
                <td className="py-2 px-4 border-b">{servicio.servicio.nombre}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => openDeleteModal(servicio.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Aún no hay servicios seleccionados para esta especialidad.</p>
      )}

      <div className="mt-8">
        <button
          onClick={handleAgregarServicios}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Agregar Servicios
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteService}
        message="¿Está seguro de que desea eliminar este servicio?"
      />
    </div>
  );
};

export default ServiciosEspecialidad;
