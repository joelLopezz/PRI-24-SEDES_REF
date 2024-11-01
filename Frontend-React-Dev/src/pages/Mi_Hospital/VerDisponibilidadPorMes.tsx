import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

interface Servicio {
  id: number;
  servicio: {
    codigo: string;
    nombre: string;
  };
  equipo_instrumental: number;
  medicamentos_reactivos: number;
  insumos: number;
  fecha_actualizacion: string;
}

const VerDisponibilidadPorMes: React.FC = () => {
  const { especialidadId } = useParams<{ especialidadId: string }>();
  const { state } = useLocation();
  const { especialidadNombre } = state as { especialidadNombre: string };
  const establecimientoId = 1;
  
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get<Servicio[]>(
          `http://localhost:3000/estab-servicio/establecimiento/${establecimientoId}/especialidad/${especialidadId}/servicios`
        );
        setServicios(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error al cargar los servicios de disponibilidad');
      }
    };
    fetchServicios();
  }, [especialidadId, establecimientoId]);

  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  //const mesActual = new Date().getMonth(); // Índice del mes actual (0 = enero, 11 = diciembre)

  const renderDisponibilidadMes = (servicio: Servicio, mesIndex: number) => {
    const fechaActualizacion = new Date(servicio.fecha_actualizacion);
    const mesServicio = fechaActualizacion.getMonth();
    const añoServicio = fechaActualizacion.getFullYear();
    const añoActual = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    const esDisponible = servicio.equipo_instrumental === 1;
  
    // Si el año de la última actualización es menor que el año actual, no se pinta ningún mes
    if (añoServicio < añoActual) {
      return <td className="py-2 px-4 border border-gray-400"></td>;
    }
  
    // Si estamos en el mismo año, pintamos los meses desde la última actualización hasta el mes actual
    if (añoServicio === añoActual) {
      if (mesServicio <= mesIndex && mesIndex <= mesActual) {
        // Pinta los meses desde el mes de la última actualización hasta el actual
        return (
          <td className={`py-2 px-4 border border-gray-400 ${esDisponible ? 'bg-green-400' : 'bg-red-400'}`}></td>
        );
      }
    }
    
    // Si estamos en meses futuros del año actual o en otro año, no pintamos
    return <td className="py-2 px-4 border border-gray-400"></td>;
  };
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Disponibilidad Mensual de Servicios para {especialidadNombre}</h1>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">Código</th>
              <th className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">Nombre</th>
              <th className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">Equipamiento Instrumental</th>
              <th className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">Medicamentos Reactivos</th>
              <th className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">Insumos</th>
              {meses.map((mes) => (
                <th key={mes} className="py-2 px-4 border border-gray-400 bg-blue-900 text-white">{mes}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td className="py-2 px-4 border border-gray-400">{servicio.servicio.codigo}</td>
                <td className="py-2 px-4 border border-gray-400">{servicio.servicio.nombre}</td>
                <td className="py-2 px-4 border border-gray-400 text-center">{servicio.equipo_instrumental ? 'Sí' : ''}</td>
                <td className="py-2 px-4 border border-gray-400 text-center">{servicio.medicamentos_reactivos ? 'Sí' : ''}</td>
                <td className="py-2 px-4 border border-gray-400 text-center">{servicio.insumos ? 'Sí' : ''}</td>
                {meses.map((_, mesIndex) => renderDisponibilidadMes(servicio, mesIndex))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerDisponibilidadPorMes;
