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

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Servicios</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este servicio?"
      />

      {/* Botón para agregar un nuevo servicio */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Nuevo Servicio
        </button>
      </div>

      {/* Tabla de servicios */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="py-2 px-4 text-left hidden">ID</th> {/* Ocultar la columna ID */}
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Costo</th>
            <th className="py-2 px-4 text-left">Tipo</th> {/* Nueva columna para el nombre del tipo */}
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.servicio_ID} className="border-t">
              <td className="py-2 px-4 hidden">{servicio.servicio_ID}</td> {/* Ocultar la celda de ID */}
              <td className="py-2 px-4">{servicio.nombre}</td>
              <td className="py-2 px-4">{servicio.descripcion || 'Sin descripción'}</td>
              <td className="py-2 px-4">
                {servicio.costo ? `Bs. ${Number(servicio.costo).toFixed(2)}` : 'Costo no disponible'}
              </td>
              <td className="py-2 px-4">
                {servicio.tipo?.nombre || 'Tipo no disponible'} {/* Mostrar el nombre del tipo */}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(servicio.servicio_ID)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(servicio.servicio_ID)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
