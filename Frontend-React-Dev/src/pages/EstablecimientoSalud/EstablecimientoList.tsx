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

  if (loading) return <p>Cargando establecimientos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Establecimientos</h1>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este establecimiento?"
      />

      {/* Botón para agregar un nuevo establecimiento */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Nuevo Establecimiento
        </button>
      </div>

      {/* Tabla de establecimientos */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Nivel</th>
            <th className="py-2 px-4 text-left">Teléfono</th>
            <th className="py-2 px-4 text-left">Latitud</th> {/* Nueva columna para la latitud */}
            <th className="py-2 px-4 text-left">Longitud</th> {/* Nueva columna para la longitud */}
            <th className="py-2 px-4 text-left">Red de Coordinación</th> {/* Columna combinada */}
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {establecimientos.map((establecimiento) => (
            <tr key={establecimiento.id} className="border-t">
              <td className="py-2 px-4">{establecimiento.nombre}</td>
              <td className="py-2 px-4">{establecimiento.nivel}</td>
              <td className="py-2 px-4">{establecimiento.telefono}</td>
              <td className="py-2 px-4">{establecimiento.latitud}</td> {/* Mostrar la latitud */}
              <td className="py-2 px-4">{establecimiento.longitud}</td> {/* Mostrar la longitud */}
              <td className="py-2 px-4">
                {establecimiento.redCordinacion ? (
                  <>
                    {establecimiento.redCordinacion.nombre} -{' '}
                    <strong>{establecimiento.redCordinacion.numeracion}</strong> {/* Mostrar nombre y numeración */}
                  </>
                ) : (
                  'No asignada'
                )}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(establecimiento.id)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(establecimiento.id)}
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

export default EstablecimientoList;
