/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { useAuth } from '../../Context/AuthContext'; // Importa useAuth


interface Especialidad {
  id: number;
  nombre: string;
}

const AgregarEspecialidades: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { establecimientoID } = useAuth(); // Obtén establecimientoID del contexto
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState<Especialidad[]>([]);
  const [selectedEspecialidades, setSelectedEspecialidades] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      if (!establecimientoID) return; // Asegúrate de que establecimientoID esté disponible

      try {
        // Obtener todas las especialidades
        const todasEspecialidadesResponse = await axios.get<Especialidad[]>(
          `${API_BASE_URL}/specialties`
        );

        // Obtener las especialidades ya asociadas al hospital
        const especialidadesAsociadasResponse = await axios.get<Especialidad[]>(
          `${API_BASE_URL}/estab-especialidad/especialidades/${establecimientoID}`
        );

        // Obtener los IDs de las especialidades asociadas
        const especialidadesAsociadasIds = especialidadesAsociadasResponse.data.map(
          (especialidad) => especialidad.id
        );

        // Filtrar las especialidades disponibles excluyendo las ya asociadas
        const especialidadesNoAsociadas = todasEspecialidadesResponse.data.filter(
          (especialidad) => !especialidadesAsociadasIds.includes(especialidad.id)
        );

        setEspecialidadesDisponibles(especialidadesNoAsociadas);
      } catch (err) {
        setError('Error al cargar las especialidades.');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [establecimientoID]);

  const handleCheckboxChange = (id: number) => {
    setSelectedEspecialidades((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((especialidadId) => especialidadId !== id)
        : [...prevSelected, id]
    );
  };

  const handleGuardar = async () => {
    try {
      await axios.post(`${API_BASE_URL}/estab-especialidad`, {
        establecimientoId: establecimientoID, // Utiliza establecimientoID del contexto
        especialidades: selectedEspecialidades,
      });
      setModalOpen(true);
    } catch (error) {
      setError('Error al guardar las especialidades.');
    }
  };

  const handleCancelar = () => {
    setSelectedEspecialidades([]);
    navigate('/miHospital');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/miHospital');
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando especialidades...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seleccionar Especialidades</h1>

      {error && <div className="text-red-500">{error}</div>}

      {especialidadesDisponibles.length > 0 ? (
        <ul className="space-y-4">
          {especialidadesDisponibles.map((especialidad) => (
            <li key={especialidad.id} className="p-4 bg-white shadow-md rounded-md">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedEspecialidades.includes(especialidad.id)}
                  onChange={() => handleCheckboxChange(especialidad.id)}
                />
                <span>{especialidad.nombre}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay especialidades disponibles para agregar.</p>
      )}

      <div className="mt-8 justify-end space-x-4">
        <button
          onClick={handleCancelar}
          className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleGuardar}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Guardar Especialidades Seleccionadas
        </button>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Las especialidades han sido guardadas exitosamente."
      />
    </div>
  );
};

export default AgregarEspecialidades;

