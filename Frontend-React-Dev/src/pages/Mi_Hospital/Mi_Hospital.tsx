import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Especialidad {
  id: number;
  especialidad: {
    nombre: string;
  };
}

const MiHospital: React.FC = () => {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener el ID del establecimiento manualmente (en este caso id 1 para pruebas)
  const establecimientoId = 1;

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get<Especialidad[]>(`http://localhost:3000/estab-especialidad/especialidades/${establecimientoId}`);
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

  const handleAgregarEspecialidades = () => {
    navigate('/miHospital/agregar-especialidades');
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando especialidades...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Especialidades de Mi Hospital</h1>

      {/* Manejo de errores de API */}
      {error ? (
        <div className="text-center text-red-500 mt-4">{error}</div>
      ) : especialidades.length > 0 ? (
        <ul className="space-y-4">
          {especialidades.map((especialidad) => (
            <li key={especialidad.id} className="p-4 bg-white shadow-md rounded-md">
              {especialidad.especialidad.nombre}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Aún no hay especialidades seleccionadas.</p>
      )}

      {/* Botón para agregar especialidades siempre visible */}
      <div className="mt-8">
        <button
          onClick={handleAgregarEspecialidades}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Agregar Especialidades y Servicios
        </button>
      </div>
    </div>
  );
};

export default MiHospital;
