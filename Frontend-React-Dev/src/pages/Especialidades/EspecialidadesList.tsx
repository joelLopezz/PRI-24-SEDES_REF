import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Importamos el modal

interface Especialidad {
  id: number;
  nombre: string;
  descripcion: string;
}

const EspecialidadesList: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); // Controlar si el modal está abierto
  const [selectedEspecialidadId, setSelectedEspecialidadId] = useState<number | null>(null); // Guardar la especialidad seleccionada
  const navigate = useNavigate();

  // Efecto para obtener las especialidades al montar el componente
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch('http://localhost:3000/specialties');
        if (!response.ok) {
          throw new Error('Error al obtener las especialidades');
        }
        const data: Especialidad[] = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar las especialidades');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  // Abrir el modal de confirmación
  const handleDeleteClick = (id: number) => {
    setSelectedEspecialidadId(id); // Guardamos el id de la especialidad seleccionada
    setModalOpen(true); // Abrimos el modal
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!selectedEspecialidadId) return;

    try {
      const response = await fetch(`http://localhost:3000/specialties/${selectedEspecialidadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualizar el estado en el frontend después de la eliminación lógica
        const nuevasEspecialidades = especialidades.filter((especialidad) => especialidad.id !== selectedEspecialidadId);
        setEspecialidades(nuevasEspecialidades);
      } else {
        throw new Error('Error al eliminar la especialidad');
      }
    } catch (error) {
      console.error('Error al eliminar la especialidad:', error);
      setError('Error al eliminar la especialidad');
    } finally {
      setModalOpen(false); // Cerramos el modal después de la acción
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerramos el modal
  };

  const handleCreate = () => {
    navigate('/especialidades/crear');
  };

  const handleEdit = (id: number) => {
    navigate(`/especialidades/editar/${id}`);
  };

  if (loading) return <p>Cargando especialidades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Especialidades</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar esta especialidad?"
      />

      {/* Botón para agregar una nueva especialidad */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Nueva Especialidad
        </button>
      </div>

      {/* Tabla de especialidades */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="py-2 px-4 text-left hidden">ID</th> {/* Ocultar la columna ID */}
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr key={especialidad.id} className="border-t">
              <td className="py-2 px-4 hidden">{especialidad.id}</td> {/* Ocultar la celda de ID */}
              <td className="py-2 px-4">{especialidad.nombre}</td>
              <td className="py-2 px-4">{especialidad.descripcion || 'Sin descripción'}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(especialidad.id)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(especialidad.id)}
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

export default EspecialidadesList;
