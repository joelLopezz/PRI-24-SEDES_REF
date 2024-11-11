import React, { useEffect, useState } from 'react';
import './style_consulta_externa.css';

interface Turno {
  Nombre: string;
  'Horario de atencion': string;
}

interface Especialidad {
  ID: number;
  Especialidad: string;
  Emergencia: string;
  'Consulta Externa': string;
  Internado: string;
  turnos: Turno[];
}

const ScheduleTable: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTurnos, setSelectedTurnos] = useState<Turno[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    // Obtener los datos del backend
    fetch('http://localhost:3000/consulta-externa/reporte-completo')
      .then((response) => response.json())
      .then((data) => setEspecialidades(data));
  }, []);

  const openModal = (turnos: Turno[], day: string) => {
    setSelectedTurnos(turnos);
    setSelectedDay(day);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDay('');
  };

  // Función para parsear el horario de atención
  const parseHorario = (horario: string) => {
    const diasHorario = horario.split(',');
    const horarioPorDia: Record<string, string> = {};

    diasHorario.forEach((diaHorario) => {
      const [dia, horario] = diaHorario.split('-');
      horarioPorDia[dia] = horario;
    });

    return horarioPorDia;
  };

  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div id="modal_container" className="modal_container show">
          <div className="modal_own">
            <table>
              <thead>
                <tr className="header-control tabla_popup">
                  <th>Nombre</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                {selectedTurnos.length === 1 && selectedTurnos[0].Nombre === 'S/D' && selectedTurnos[0]['Horario de atencion'] === 'S/D' ? (
                  <tr>
                  </tr>
                ) : (
                  selectedTurnos.map((turno, index) => {
                    const horarioPorDia = parseHorario(turno['Horario de atencion']);
                    const horario = horarioPorDia[selectedDay];

                    if (horario === 'S/H') {
                      return (
                        <tr key={index}>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td className="selecciobale">{turno.Nombre}</td>
                          <td className="selecciobale">{horario || 'S/D'}</td>
                        </tr>
                      );
                    }
                  })
                )}
              </tbody>
            </table>
            <button className="button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={12} className="schedule-header">
                HORARIOS DE ATENCIÓN CONSULTA EXTERNA
              </th>
            </tr>
            <tr>
              <th className="service-column">SERVICIO</th>
              <th className="check-column" style={{ backgroundColor: '#0066cc' }}>EMG.</th>
              <th className="check-column" style={{ backgroundColor: '#0066cc' }}>INT.</th>
              <th className="check-column" style={{ backgroundColor: '#0066cc' }}>CON. EXT.</th>
              <th style={{ backgroundColor: '#0066cc' }}>LUNES</th>
              <th style={{ backgroundColor: '#0066cc' }}>MARTES</th>
              <th style={{ backgroundColor: '#0066cc' }}>MIÉRCOLES</th>
              <th style={{ backgroundColor: '#0066cc' }}>JUEVES</th>
              <th style={{ backgroundColor: '#0066cc' }}>VIERNES</th>
              <th style={{ backgroundColor: '#0066cc' }}>SÁBADO</th>
              <th style={{ backgroundColor: '#0066cc' }}>DOMINGO</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad) => (
              <tr key={especialidad.ID}>
                <td>{especialidad.Especialidad}</td>
                <td style={{ backgroundColor: '#abcebe' }}>
                  {especialidad.Emergencia === '0' ? 'X' : '✔'}
                </td>
                <td style={{ backgroundColor: '#abcebe' }}>
                  {especialidad.Internado === '0' ? 'X' : '✔'}
                </td>
                <td style={{ backgroundColor: '#abcebe' }}>
                  {especialidad['Consulta Externa'] === '0' ? 'X' : '✔'}
                </td>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const doctorsAvailable = especialidad.turnos.filter((turno) => {
                    const horarioPorDia = parseHorario(turno['Horario de atencion']);
                    return horarioPorDia[day] && horarioPorDia[day] !== 'S/H';
                  });

                  return (
                    <td
                      key={day}
                      className="open"
                      onClick={() => openModal(especialidad.turnos, day)}
                    >
                      {'♦'.repeat(doctorsAvailable.length)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
