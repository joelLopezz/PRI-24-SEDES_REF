/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Especialidad {
  id: number;
  especialidad: {
    nombre: string;
  };
}

const HospitalInfo: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id: establecimientoId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get<Especialidad[]>(`${API_BASE_URL}/estab-especialidad/especialidades/${establecimientoId}`);
        setEspecialidades(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar las especialidades del hospital');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [establecimientoId]);

  if (loading) return <p className="text-center text-lg text-gray-600">Cargando especialidades...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/hospitales-info')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
      >
        Volver a la Lista de Hospitales
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Especialidades de Hospital</h1>
      {especialidades.length > 0 ? (
        <ul className="space-y-4">
          {especialidades.map((especialidad) => (
            <li key={especialidad.id} className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
              <span>{especialidad.especialidad.nombre}</span>
              <button
                onClick={() => navigate(`/hospitales-info/servicios-especialidad/${especialidad.id}`, {
                  state: { especialidadNombre: especialidad.especialidad.nombre, establecimientoId }
                })}
                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-300"
              >
                Ver Servicios
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tiene especialidades.</p>
      )}
    </div>
  );
};

export default HospitalInfo;
