import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar
import ConfirmationModal from '../../Components/ConfirmationModal'; // Modal para confirmación

// Definir las interfaces para los datos
interface RedCordinacion {
  red_ID: number;
  nombre: string;
  numeracion: string;
}

interface Establecimiento {
  id: number;
  nombre: string;
  nivel: string;
  telefono: string;
  latitud: number; // Añadir latitud
  longitud: number; // Añadir longitud
  redCordinacion: RedCordinacion; // Relación con Red de Coordinación
}

const EstablecimientoList: React.FC = () => {
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEstablecimientoId, setSelectedEstablecimientoId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Efecto para obtener los establecimientos
  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await fetch('http://localhost:3000/establecimiento');
        if (!response.ok) {
          throw new Error('Error al obtener los establecimientos');
        }
        const data: Establecimiento[] = await response.json();
        setEstablecimientos(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar los establecimientos');
      } finally {
        setLoading(false);
      }
    };

    fetchEstablecimientos();
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedEstablecimientoId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEstablecimientoId) return;

    try {
      const response = await fetch(`http://localhost:3000/establecimiento/${selectedEstablecimientoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const nuevosEstablecimientos = establecimientos.filter(
          (establecimiento) => establecimiento.id !== selectedEstablecimientoId
        );
        setEstablecimientos(nuevosEstablecimientos);
      } else {
        throw new Error('Error al eliminar el establecimiento');
      }
    } catch (error) {
      console.error('Error al eliminar el establecimiento:', error);
      setError('Error al eliminar el establecimiento');
    } finally {
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreate = () => {
    navigate('/establecimientos/crear');
  };

  const handleEdit = (id: number) => {
    navigate(`/establecimientos/editar/${id}`);
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Cargando establecimientos...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Establecimientos</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este establecimiento?"
      />

      {/* Botón para agregar un nuevo establecimiento */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Agregar Nuevo Establecimiento
        </button>
      </div>

      {/* Tabla de establecimientos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Nivel</th>
              <th className="py-4 px-6 text-left font-semibold">Teléfono</th>
              <th className="py-4 px-6 text-left font-semibold">Latitud</th>
              <th className="py-4 px-6 text-left font-semibold">Longitud</th>
              <th className="py-4 px-6 text-left font-semibold">Red de Coordinación</th>
              <th className="py-4 px-6 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {establecimientos.map((establecimiento, index) => (
              <tr
                key={establecimiento.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-white'
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <td className="py-4 px-6">{establecimiento.nombre}</td>
                <td className="py-4 px-6">{establecimiento.nivel}</td>
                <td className="py-4 px-6">{establecimiento.telefono}</td>
                <td className="py-4 px-6">{establecimiento.latitud}</td>
                <td className="py-4 px-6">{establecimiento.longitud}</td>
                <td className="py-4 px-6">
                  {establecimiento.redCordinacion ? (
                    <>
                      {establecimiento.redCordinacion.nombre} -{' '}
                      <strong>{establecimiento.redCordinacion.numeracion}</strong>
                    </>
                  ) : (
                    'No asignada'
                  )}
                </td>
                <td className="py-4 px-6 flex space-x-4">
                  <button
                    onClick={() => handleEdit(establecimiento.id)}
                    className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(establecimiento.id)}
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

export default EstablecimientoList;
