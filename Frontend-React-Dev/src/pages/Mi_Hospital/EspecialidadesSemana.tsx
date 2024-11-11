import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Especialidad {
  id: number;
  especialidad: {
    nombre: string;
  };
}

const EspecialidadesSemana: React.FC = () => {
  const location = useLocation();
  const { especialidades } = location.state as { especialidades: Especialidad[] };

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const mesActual = new Date().toLocaleString('es-ES', { month: 'long' }).toUpperCase();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Disponibilidad Semanal de Especialidades</h1>
      
      {/* Sección superior con datos del hospital */}
      <div className="mb-6 p-4 border border-gray-400 rounded-md bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>HOSPITAL:</strong> {/* Nombre estático por ahora */}
            <span className="ml-2">Nombre del Hospital</span>
          </div>
          <div>
            <strong>COORDINACIÓN DE RED:</strong>
            <span className="ml-2">[Pendiente]</span>
          </div>
          <div>
            <strong>MES:</strong>
            <span className="ml-2">{mesActual}</span>
          </div>
          <div>
            <strong>MUNICIPIO:</strong>
            <span className="ml-2">[Pendiente]</span>
          </div>
        </div>
      </div>

      {especialidades.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border bg-blue-900 text-white">Especialidades como Servicio</th>
              <th className="py-2 px-4 border bg-blue-900 text-white">Emergencia</th>
              <th className="py-2 px-4 border bg-blue-900 text-white">Interna</th>
              <th className="py-2 px-4 border bg-blue-900 text-white">Consulta Externa</th>
              {diasSemana.map((dia) => (
                <th key={dia} className="py-2 px-4 border bg-blue-900 text-white">{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad) => (
              <tr key={especialidad.id}>
                <td className="py-2 px-4 border text-gray-700">{especialidad.especialidad.nombre}</td>
                <td className="py-2 px-4 border text-center">{/* Marcador para Emergencia, según lógica futura */}</td>
                <td className="py-2 px-4 border text-center">{/* Marcador para Interna, según lógica futura */}</td>
                <td className="py-2 px-4 border text-center">{/* Marcador para Consulta Externa, según lógica futura */}</td>
                {diasSemana.map((dia) => (
                  <td key={dia} className="py-2 px-4 border text-center text-gray-600">De
                  <br></br>
                  A</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Aún no hay especialidades seleccionadas.</p>
      )}
    </div>
  );
};

export default EspecialidadesSemana;
