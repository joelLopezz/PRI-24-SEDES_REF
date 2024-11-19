import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Municipio {
  municipio_ID: number;
  nombre: string;
}

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
  latitud: number;
  longitud: number;
  rues: string;
  municipio: Municipio;
  redCordinacion: RedCordinacion;
}

const HospitalesList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get<Establecimiento[]>(`${API_BASE_URL}/establecimiento`);
        setEstablecimientos(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Error al cargar los hospitales');
      } finally {
        setLoading(false);
      }
    };

    fetchEstablecimientos();
  }, []);

  const handleViewInfo = (id: number) => {
    navigate(`/hospitales-info/${id}`);
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Cargando hospitales...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Información Especialidades y Servicios de los Hospitales</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="py-4 px-6 text-left font-semibold">Nombre</th>
              <th className="py-4 px-6 text-left font-semibold">Nivel</th>
              <th className="py-4 px-6 text-left font-semibold">Teléfono</th>
              <th className="py-4 px-6 text-left font-semibold">Municipio</th>
              <th className="py-4 px-6 text-left font-semibold">Red de Coordinación</th>
              <th className="py-4 px-6 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {establecimientos.map((hospital) => (
              <tr key={hospital.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-4 px-6">{hospital.nombre}</td>
                <td className="py-4 px-6">{hospital.nivel}</td>
                <td className="py-4 px-6">{hospital.telefono}</td>
                <td className="py-4 px-6">{hospital.municipio.nombre}</td>
                <td className="py-4 px-6">
                  {hospital.redCordinacion ? (
                    `${hospital.redCordinacion.nombre} - ${hospital.redCordinacion.numeracion}`
                  ) : (
                    'No asignada'
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleViewInfo(hospital.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaInfoCircle className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalesList;
