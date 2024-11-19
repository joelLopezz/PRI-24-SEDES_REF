import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import ConfirmationModal from '../../Components/ConfirmationModal';
import { useAuth } from '../../Context/AuthContext';

interface RedCordinacion {
  red_ID: number;
  nombre: string;
  numeracion: string;
}

const RedesList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const [redes, setRedes] = useState<RedCordinacion[]>([]);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchRedes();
  }, []);

  const fetchRedes = async () => {
    try {
      const response = await axios.get<RedCordinacion[]>(`${API_BASE_URL}/red-cordinacion`);
      setRedes(response.data);
    } catch (error) {
      console.error('Error al cargar las redes de coordinación:', error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) {
      try {
        await axios.request({
          url: `${API_BASE_URL}/red-cordinacion/${selectedId}`,
          method: 'DELETE',
          data: {
            usuario_ID: usuarioID, // Aquí envías el usuario_ID desde el contexto
          },
        });
        setRedes(redes.filter((red) => red.red_ID !== selectedId));
        setConfirmOpen(false); // Cerrar el modal de confirmación después de eliminar
      } catch (error) {
        console.error('Error al eliminar la red de coordinación:', error);
      }
    }
  };
  

  const handleCloseConfirmModal = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Redes de Coordinación</h1>
        <Link
          to="/red-cordinacion/crear"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Agregar Nueva Red
        </Link>
      </div>
      
      <table className="min-w-full bg-white shadow-md rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-blue-600 text-white">Nombre</th>
            <th className="py-2 px-4 border-b bg-blue-600 text-white">Numeración</th>
            <th className="py-2 px-4 border-b bg-blue-600 text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {redes.map((red) => (
            <tr key={red.red_ID} className="hover:bg-gray-100 transition duration-200">
              <td className="py-2 px-4 border-b text-center">{red.nombre}</td>
              <td className="py-2 px-4 border-b text-center">{red.numeracion}</td>
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/red-cordinacion/editar/${red.red_ID}`} className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaEdit className="inline w-5 h-5" />
                </Link>
                <button onClick={() => handleDeleteClick(red.red_ID)} className="text-red-500 hover:text-red-700">
                  <FaTrash className="inline w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que deseas eliminar esta red de coordinación?"
      />
    </div>
  );
};

export default RedesList;
