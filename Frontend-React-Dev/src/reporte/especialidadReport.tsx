// src/pages/EspecialidadesReport.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stilo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface EspecialidadData {
  especialidad: string;
  inscritas: number;
  ofertadas: number;
  disponibles: number;
  ocupadas: number;
  altas: number;
  ultima_modificacion: string;
}

interface EstablecimientoData {
  idestablecimiento_ID: number;
  nombre: string;
}

const EspecialidadesReport = () => {
  const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
  const [establecimientos, setEstablecimientos] = useState<EstablecimientoData[]>([]);
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState<number | null>(null);

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/establecimiento/nombres');
        setEstablecimientos(response.data || []);
      } catch (error) {
        console.error('Error al obtener los establecimientos:', error);
      }
    };

    fetchEstablecimientos();
  }, []);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      if (selectedEstablecimiento) {
        try {
          const response = await axios.get(`http://localhost:3000/reporte/hospital/${selectedEstablecimiento}`);
          setEspecialidades(response.data || []);
        } catch (error) {
          console.error('Error al obtener las especialidades:', error);
        }
      }
    };

    fetchEspecialidades();
  }, [selectedEstablecimiento]);

  const handleEstablecimientoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const establecimientoId = event.target.value ? parseInt(event.target.value) : null;
    setSelectedEstablecimiento(establecimientoId);
  };

  return (
    <div className="container">
      <h2 className="title">Reporte Hospitales</h2>

      {/* Combo Box para seleccionar establecimiento de forma dinámica */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-select" value={selectedEstablecimiento || ''} onChange={handleEstablecimientoChange} aria-label="Seleccionar establecimiento">
            <option value="">Selecciona un establecimiento</option>
            {establecimientos.map((establecimiento) => (
              <option key={establecimiento.idestablecimiento_ID} value={establecimiento.idestablecimiento_ID}>
                {establecimiento.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {especialidades.map((especialidad, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <div className="card-body">
                <center><h5 className="card-title">{especialidad.especialidad}</h5></center>
                <p className="card-text">
                  <i className="fas fa-bed icon-green"></i> <strong>Instalada:</strong> {especialidad.inscritas}
                </p>
                <p className="card-text">
                  <i className="fas fa-box-open icon-blue"></i> <strong>Ofertada:</strong> {especialidad.ofertadas}
                </p>
                <p className="card-text">
                  <i className="fas fa-procedures icon-red"></i> <strong>Ocupada:</strong> {especialidad.ocupadas}
                </p>
                <p className="card-text">
                  <i className="fas fa-check-circle icon-yellow"></i> <strong>Disponible:</strong> {especialidad.disponibles}
                </p>
                <p className="card-text">
                  <i className="fas fa-user-check icon-gray"></i> <strong>Alta:</strong> {especialidad.altas}
                </p>
                <p className="card-text">
                  <i className="fas fa-clock icon-gray"></i> <strong>Actualizado:</strong> {new Date(especialidad.ultima_modificacion).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EspecialidadesReport;
