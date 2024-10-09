import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Importamos el modal

// Definir la interfaz para los servicios
interface Tipo {
  tipo_ID: number;
  nombre: string;
}

interface Servicio {
  servicio_ID: number;
  nombre: string;
  descripcion: string;
  costo: number | null;
  tipo: Tipo; // Incluimos el tipo
}

const ServiceList: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]); // Estado para almacenar los servicios
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando
  const [error, setError] = useState<string | null>(null); // Estado para errores
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de confirmación
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null); // Guardar el ID del servicio seleccionado
  const navigate = useNavigate(); // Hook para redirigir

  // Efecto para obtener los servicios al montar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/servicio');
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
      const response = await fetch(`http://localhost:3000/servicio/${selectedServiceId}`, {
        method: 'DELETE',
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
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Descripción</th>
              <th className="py-4 px-6 text-left font-semibold">Costo</th>
              <th className="py-4 px-6 text-left font-semibold">Tipo</th>
              <th className="py-4 px-6 text-left font-semibold">Acciones</th>
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
                <td className="py-4 px-6">{servicio.nombre}</td>
                <td className="py-4 px-6">{servicio.descripcion || 'Sin descripción'}</td>
                <td className="py-4 px-6">
                  {servicio.costo ? `Bs. ${Number(servicio.costo).toFixed(2)}` : 'Costo no disponible'}
                </td>
                <td className="py-4 px-6">{servicio.tipo?.nombre || 'Tipo no disponible'}</td>
                <td className="py-4 px-6 flex space-x-4">
                  <button
                    onClick={() => handleEdit(servicio.servicio_ID)}
                    className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(servicio.servicio_ID)}
                    className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
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
