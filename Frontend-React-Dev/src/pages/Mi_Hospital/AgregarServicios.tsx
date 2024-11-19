/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { useAuth } from '../../Context/AuthContext'; // Importa el contexto


interface Servicio {
  servicio_ID: number;
  codigo: string;
  nombre: string;
}

const AgregarServicios: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const { especialidadNombre } = state as { especialidadNombre: string };
  const navigate = useNavigate();
  const { establecimientoID } = useAuth(); // Accede al establecimientoID desde el contexto
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedServicios, setSelectedServicios] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get<Servicio[]>(
          `${API_BASE_URL}/estab-servicio/establecimiento/${establecimientoID}/especialidad/${especialidadId}/disponibles`
        );
        setServicios(response.data);
      } catch (err) {
        setError('Error al cargar los servicios de la especialidad');
      } finally {
        setLoading(false);
      }
    };

    if (establecimientoID) {
      fetchServicios();
    } else {
      setError('ID del establecimiento no disponible');
      setLoading(false);
    }
  }, [especialidadId, establecimientoID]);

  const handleCheckboxChange = (id: number) => {
    setSelectedServicios((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((servicioId) => servicioId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, {
      state: { especialidadNombre },
    });
  };

  const handleCancelar = () => {
    setSelectedServicios([]);
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, {
      state: { especialidadNombre },
    });
  };

  const handleGuardar = async () => {
    try {
      const serviciosData = selectedServicios.map((servicioId) => ({
        establecimiento_salud_id: establecimientoID, // Usa el establecimientoID del contexto
        servicio_id: servicioId,
      }));

      await axios.post(`${API_BASE_URL}/estab-servicio/multiple`, serviciosData);
      setIsModalOpen(true);
    } catch (err) {
      setError('Error al guardar los servicios.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando servicios...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agregar Servicios para la Especialidad</h1>

      {error && <div className="text-red-500">{error}</div>}

      <ul className="space-y-4">
        {servicios.map((servicio) => (
          <li key={servicio.servicio_ID} className="p-4 bg-white shadow-md rounded-md">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedServicios.includes(servicio.servicio_ID)}
                onChange={() => handleCheckboxChange(servicio.servicio_ID)}
              />
              <span>{servicio.codigo} - {servicio.nombre}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleCancelar}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleGuardar}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Guardar Servicios Seleccionados
        </button>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Los servicios se han agregado correctamente."
      />
    </div>
  );
};

export default AgregarServicios;
