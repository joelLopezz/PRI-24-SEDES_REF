import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Importamos el modal
import { useAuth } from './../../Context/AuthContext';

// Definir la interfaz para los servicios
interface Especialidad {
  nombre: string; // Asegúrate de tener el nombre de la especialidad

}

interface Servicio {
  servicio_ID: number;
  codigo: string; // Añadimos el campo código
  nombre: string;
  especialidad: Especialidad; // Relación con la entidad Especialidad
}

const ServiceList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const [servicios, setServicios] = useState<Servicio[]>([]); // Estado para almacenar los servicios
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando
  const [error, setError] = useState<string | null>(null); // Estado para errores
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de confirmación
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null); // Guardar el ID del servicio seleccionado
  const navigate = useNavigate(); // Hook para redirigir

  const { hasPermission } = useAuth();

  // Efecto para obtener los servicios al montar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/servicio`);
        if (!response.ok) {
          throw new Error('Error al obtener los servicios');
        }
        const data: Servicio[] = await response.json();
        setServicios(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar los servicios');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Abrir el modal de confirmación de eliminación
  const handleDeleteClick = (id: number) => {
    setSelectedServiceId(id); // Guardamos el id del servicio seleccionado
    setModalOpen(true); // Abrimos el modal
  };

  // Confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (!selectedServiceId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/servicio/${selectedServiceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario_ID: usuarioID }), // Enviar usuario_ID en el cuerpo
      });

      if (response.ok) {
        // Actualizar el estado en el frontend después de eliminar
        const nuevosServicios = servicios.filter((servicio) => servicio.servicio_ID !== selectedServiceId);
        setServicios(nuevosServicios);
      } else {
        throw new Error('Error al eliminar el servicio');
      }
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      setError('Error al eliminar el servicio');
    } finally {
      setModalOpen(false); // Cerrar el modal después de la acción
    }
  };

  // Cerrar el modal de confirmación
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Redirigir a la página de creación de servicios
  const handleCreate = () => {
    navigate('/servicios/crear');
  };

  // Redirigir a la página de edición de servicios
  const handleEdit = (id: number) => {
    navigate(`/servicios/editar/${id}`);
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Cargando servicios...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Servicios</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este servicio?"
      />

      {/* Botón para agregar un nuevo servicio */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Agregar Nuevo Servicio
        </button>
      </div>

      {/* Tabla de servicios */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="py-4 px-6 text-left font-semibold hidden">ID</th> {/* Ocultar la columna ID */}
              <th className="py-4 px-6 text-left font-semibold">Código</th> {/* Mostrar el código */}
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Especialidad</th> {/* Mostrar el nombre de la especialidad */}
              {hasPermission(['Admin Sedes', 'Admin Hospital']) && <th>Acciones</th>}
            </tr>
          </thead>
          
          <tbody>
            {servicios.map((servicio, index) => (
              <tr
                key={servicio.servicio_ID}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-white'
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <td className="py-4 px-6 hidden">{servicio.servicio_ID}</td>
                <td className="py-4 px-6">{servicio.codigo}</td> {/* Código */}
                <td className="py-4 px-6">{servicio.nombre}</td> {/* Nombre */}
                <td className="py-4 px-6">
                  {servicio.especialidad?.nombre || 'Especialidad no disponible'}
                </td>
                {/* Nombre de la especialidad */}
                <td className="py-4 px-6">
                  {hasPermission(['Admin Sedes', 'Admin Hospital']) ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(servicio.servicio_ID)}
                        className="w-8 h-8 inline-flex items-center justify-center text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(servicio.servicio_ID)}
                        className="w-8 h-8 inline-flex items-center justify-center text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;
