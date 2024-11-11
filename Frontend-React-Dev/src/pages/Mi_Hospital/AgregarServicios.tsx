/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importar el modal de éxito
import 'bootstrap/dist/css/bootstrap.min.css';

interface Servicio {
  servicio_ID: number;
  codigo: string;
  nombre: string;
}

const AgregarServicios: React.FC = () => {
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const { especialidadNombre } = state as { especialidadNombre: string }; // Capturar el nombre dinámicamente
  const navigate = useNavigate();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedServicios, setSelectedServicios] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de éxito

  // ID del establecimiento manual (para pruebas)
  const establecimientoId = 1;

  useEffect(() => {
    const fetchServicios = async () => {
    try {
        const response = await axios.get<Servicio[]>(
            `http://localhost:3000/estab-servicio/establecimiento/${establecimientoId}/especialidad/${especialidadId}/disponibles`
        );
        setServicios(response.data);
    } catch (err) {
        setError('Error al cargar los servicios de la especialidad');
    } finally {
        setLoading(false);
    }
    };

    fetchServicios();
  }, [especialidadId]);

  const handleCheckboxChange = (id: number) => {
    setSelectedServicios((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((servicioId) => servicioId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Redirigir a la página `ServiciosEspecialidad` después de cerrar el modal con el nombre dinámico
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, {
      state: { especialidadNombre }, // Usar el nombre dinámico pasado desde `ServiciosEspecialidad`
    });
  };

  const handleCancelar = () => {
    setSelectedServicios([]); // Limpiar las selecciones de checkboxes
    navigate(`/miHospital/especialidad/${especialidadId}/servicios`, {
      state: { especialidadNombre }, // Usar el nombre dinámico en caso de cancelar
    });
  };

  const handleGuardar = async () => {
    try {
      const serviciosData = selectedServicios.map((servicioId) => ({
        establecimiento_salud_id: establecimientoId,
        servicio_id: servicioId,
      }));

      await axios.post('http://localhost:3000/estab-servicio/multiple', serviciosData);

      // Mostrar el modal de éxito
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

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="Los servicios se han agregado correctamente."
      />
    </div>
  );
};

export default AgregarServicios;
