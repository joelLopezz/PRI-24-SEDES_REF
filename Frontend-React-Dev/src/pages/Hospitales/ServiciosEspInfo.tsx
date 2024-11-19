import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Servicio {
  id: number;
  servicio: {
    codigo: string;
    nombre: string;
  };
}

const ServiciosEspInfo: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const { especialidadNombre, establecimientoId } = state as { especialidadNombre: string; establecimientoId: string };
  const navigate = useNavigate();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get<Servicio[]>(
          `${API_BASE_URL}/estab-servicio/establecimiento/${establecimientoId}/especialidad/${especialidadId}/servicios`
        );
        setServicios(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar los servicios de la especialidad');
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, [especialidadId, establecimientoId]);

  if (loading) {
    return <div className="text-center mt-8">Cargando servicios...</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)} // Regresa a la página anterior
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
      >
        Volver a Atras
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Servicios de la Especialidad {especialidadNombre}</h1>
      {error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : servicios.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Código</th>
              <th className="py-2 px-4 border-b">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td className="py-2 px-4 border-b">{servicio.servicio.codigo}</td>
                <td className="py-2 px-4 border-b">{servicio.servicio.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Aún no hay servicios seleccionados para esta especialidad.</p>
      )}
    </div>
  );
};

export default ServiciosEspInfo;
