import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Importamos el modal
import { useAuth } from '../../Context/AuthContext'; // Importa el contexto


interface Especialidad {
  id: number;
  nombre: string;

}

const EspecialidadesList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
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
        const response = await fetch(`${API_BASE_URL}/specialties`);
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
    if (!selectedEspecialidadId || !usuarioID) return;

    try {
      const response = await fetch(`${API_BASE_URL}/specialties/${selectedEspecialidadId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_modificacion: usuarioID, // Pasar el ID del usuario como dato adicional
        }),
      });

      if (response.ok) {
        setEspecialidades(especialidades.filter((especialidad) => especialidad.id !== selectedEspecialidadId));
      } else {
        throw new Error('Error al eliminar la especialidad');
      }
    } catch (error) {
      console.error('Error al eliminar la especialidad:', error);
      setError('Error al eliminar la especialidad');
    } finally {
      setModalOpen(false);
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

  if (loading) return <p className="text-center text-lg text-gray-600">Cargando especialidades...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Especialidades</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar esta especialidad?"
      />

      {/* Botón para agregar una nueva especialidad */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Agregar Nueva Especialidad
        </button>
      </div>

      {/* Tabla de especialidades */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="py-4 px-6 text-left font-semibold hidden">ID</th> {/* Ocultar la columna ID */}
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad, index) => (
              <tr
                key={especialidad.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-white'
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <td className="py-4 px-6 hidden">{especialidad.id}</td> {/* Ocultar la celda de ID */}
                <td className="py-4 px-6">{especialidad.nombre}</td>
                <td className="py-4 px-6 flex space-x-4">
                  <button
                    onClick={() => handleEdit(especialidad.id)}
                    className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(especialidad.id)}
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

export default EspecialidadesList;
