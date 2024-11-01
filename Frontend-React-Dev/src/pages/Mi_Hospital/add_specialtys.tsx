import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importa tu componente SuccessModal

interface Especialidad {
  id: number;
  nombre: string;
}

const AgregarEspecialidades: React.FC = () => {
  const navigate = useNavigate();
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState<Especialidad[]>([]);
  const [selectedEspecialidades, setSelectedEspecialidades] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito

  // Obtener el ID del establecimiento manualmente (en este caso id 1 para pruebas)
  const establecimientoId = 1;

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        // Obtener todas las especialidades
        const todasEspecialidadesResponse = await axios.get<Especialidad[]>(
          'http://localhost:3000/specialties'
        );

        // Obtener las especialidades ya asociadas al hospital
        const especialidadesAsociadasResponse = await axios.get<Especialidad[]>(
          `http://localhost:3000/estab-especialidad/especialidades/${establecimientoId}`
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar las especialidades.');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [establecimientoId]);

  const handleCheckboxChange = (id: number) => {
    setSelectedEspecialidades((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((especialidadId) => especialidadId !== id)
        : [...prevSelected, id]
    );
  };

  const handleGuardar = async () => {
    try {
      await axios.post('http://localhost:3000/estab-especialidad', {
        establecimientoId,
        especialidades: selectedEspecialidades, // Aquí enviamos los IDs de las especialidades seleccionadas
      });
      setModalOpen(true); // Mostrar el modal de éxito
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error al guardar las especialidades.');
    }
  };

  const handleCancelar = () => {
    setSelectedEspecialidades([]); // Limpiar los checkboxes seleccionados
    navigate('/miHospital'); // Regresar a la página principal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/miHospital'); // Redirigir a la página de "Mi Hospital" después de cerrar el modal
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando especialidades...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seleccionar Especialidades</h1>

      {/* Mostrar error si ocurre */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Lista de especialidades con checkboxes */}
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

      {/* Botón para guardar las especialidades seleccionadas */}
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

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Las especialidades han sido guardadas exitosamente."
      />
    </div>
  );
};

export default AgregarEspecialidades;
