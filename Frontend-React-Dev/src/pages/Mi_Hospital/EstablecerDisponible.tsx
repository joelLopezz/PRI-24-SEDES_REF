/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { useAuth } from '../../Context/AuthContext'; // Importa useAuth para obtener el establecimiento ID


interface Servicio {
  id: number;
  servicio: {
    codigo: string;
    nombre: string;
  };
  equipo_instrumental: number;
  medicamentos_reactivos: number;
  insumos: number;
}

const EstablecerDisponible: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { especialidadNombre } = state as { especialidadNombre: string };
  const { establecimientoID } = useAuth(); // Obtén el establecimiento ID del contexto

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      if (establecimientoID === null) {
        setError('Establecimiento no encontrado.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get<Servicio[]>(
          `${API_BASE_URL}/estab-servicio/establecimiento/${establecimientoID}/especialidad/${especialidadId}/servicios`
        );
        setServicios(response.data);
      } catch (err) {
        setError('Error al cargar los servicios');
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, [especialidadId, establecimientoID]);

  const handleCheckboxChange = (id: number, field: keyof Servicio) => {
    setServicios((prevServicios) =>
      prevServicios.map((servicio) =>
        servicio.id === id
          ? { ...servicio, [field]: servicio[field] === 1 ? 0 : 1 }
          : servicio
      )
    );
  };

  const handleSaveChanges = async () => {
    const updates = servicios.map((servicio) => ({
      id: servicio.id,
      equipo_instrumental: servicio.equipo_instrumental,
      medicamentos_reactivos: servicio.medicamentos_reactivos,
      insumos: servicio.insumos,
    }));
  
    try {
      await Promise.all(
        updates.map((update) =>
          axios.patch(
            `${API_BASE_URL}/estab-servicio/${update.id}`,
            update
          )
        )
      );
      setIsSuccessModalOpen(true); // Abre el modal de éxito
    } catch (err) {
      alert('Error al actualizar la disponibilidad');
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, { state: { especialidadNombre } });
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando servicios...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Establecer Disponibilidad para la Especialidad {especialidadNombre}
      </h1>

      {error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : servicios.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Código</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Equipamiento Instrumental</th>
              <th className="py-2 px-4 border-b">Medicamentos Reactivos</th>
              <th className="py-2 px-4 border-b">Insumos</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td className="py-2 px-4 border-b">{servicio.servicio.codigo}</td>
                <td className="py-2 px-4 border-b">{servicio.servicio.nombre}</td>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={servicio.equipo_instrumental === 1}
                    onChange={() => handleCheckboxChange(servicio.id, 'equipo_instrumental')}
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={servicio.medicamentos_reactivos === 1}
                    onChange={() => handleCheckboxChange(servicio.id, 'medicamentos_reactivos')}
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={servicio.insumos === 1}
                    onChange={() => handleCheckboxChange(servicio.id, 'insumos')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No hay servicios para esta especialidad.</p>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSaveChanges}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleModalClose}
        message="Disponibilidad actualizada correctamente"
      />
    </div>
  );
};

export default EstablecerDisponible;
