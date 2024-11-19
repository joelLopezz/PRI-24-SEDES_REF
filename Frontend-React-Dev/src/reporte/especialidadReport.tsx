// src/pages/EspecialidadesReport.tsx
import React, { useState, useEffect } from 'react';
import './stilo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface EspecialidadData {
  especialidad: string;
  inscritas: number;
  ofertadas: number;
  disponibles: number;
  ocupadas: number;
  altas: number;
  ultima_modificacion: string | null;
}

interface EstablecimientoData {
  id: number; // Asegúrate de que este nombre coincide con el de tu API
  nombre: string;
}

const EspecialidadesReport = () => {
  const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
  const [establecimientos, setEstablecimientos] = useState<EstablecimientoData[]>([]);
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchEstablecimientos = () => {
    fetch('http://localhost:3000/establecimiento/nombres')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los establecimientos');
        }
        return response.json();
      })
      .then(data => {
        console.log('Establecimientos:', data);
        setEstablecimientos(data || []);
      })
      .catch((error) => {
        console.error('Error en fetchEstablecimientos:', error);
        setErrorMessage('Error al obtener la lista de establecimientos');
      });
  };

  useEffect(() => {
    fetchEstablecimientos();
  }, []);

  const fetchEspecialidades = () => {
    if (selectedEstablecimiento) {
      fetch(`http://localhost:3000/reporte/hospital/${selectedEstablecimiento}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las especialidades');
          }
          return response.json();
        })
        .then(data => {
          console.log('Especialidades:', data);
          setEspecialidades(data || []);
        })
        .catch((error) => {
          console.error('Error en fetchEspecialidades:', error);
          setErrorMessage('Error al obtener la lista de especialidades');
        });
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, [selectedEstablecimiento]);

  const handleEstablecimientoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEstablecimiento(event.target.value);
  };

  return (
    <div className="container_reporte">
      <h2 className="title">Reporte Hospitales</h2>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {/* Combo Box para seleccionar establecimiento de forma dinámica */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedEstablecimiento}
            onChange={handleEstablecimientoChange}
            aria-label="Seleccionar establecimiento"
          >
            <option value="">Selecciona un establecimiento</option>
            {Array.isArray(establecimientos) && establecimientos.length > 0 ? (
              establecimientos.map((establecimiento, index) => {
                const id = establecimiento.id;
                const nombre = establecimiento.nombre;

                if (id === undefined || nombre === undefined) {
                  console.warn(`El establecimiento en el índice ${index} no tiene las propiedades esperadas:`, establecimiento);
                  return null;
                }

                return (
                  <option key={id} value={id.toString()}>
                    {nombre}
                  </option>
                );
              })
            ) : (
              <option value="">No hay establecimientos disponibles</option>
            )}
          </select>
        </div>
      </div>

      <div className="row">
        {Array.isArray(especialidades) && especialidades.length > 0 ? (
          especialidades.map((especialidad, index) => (
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
                    <i className="fas fa-clock icon-gray"></i> <strong>Actualizado:</strong> {
                      especialidad.ultima_modificacion
                        ? new Date(especialidad.ultima_modificacion).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })
                        : 'No disponible'
                    }
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay especialidades disponibles para este establecimiento.</p>
        )}
      </div>
    </div>
  );
};

export default EspecialidadesReport;







// // src/pages/EspecialidadesReport.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './stilo.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface EspecialidadData {
//   especialidad: string;
//   inscritas: number;
//   ofertadas: number;
//   disponibles: number;
//   ocupadas: number;
//   altas: number;
//   ultima_modificacion: string;
// }

// interface EstablecimientoData {
//   idestablecimiento_ID: number;
//   nombre: string;
// }

// const EspecialidadesReport = () => {
//   const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
//   const [establecimientos, setEstablecimientos] = useState<EstablecimientoData[]>([]);
//   const [selectedEstablecimiento, setSelectedEstablecimiento] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchEstablecimientos = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/establecimiento/nombres');
//         setEstablecimientos(response.data || []);
//       } catch (error) {
//         console.error('Error al obtener los establecimientos:', error);
//       }
//     };

//     fetchEstablecimientos();
//   }, []);

//   useEffect(() => {
//     const fetchEspecialidades = async () => {
//       if (selectedEstablecimiento) {
//         try {
//           const response = await axios.get(`http://localhost:3000/reporte/hospital/${selectedEstablecimiento}`);
//           setEspecialidades(response.data || []);
//         } catch (error) {
//           console.error('Error al obtener las especialidades:', error);
//         }
//       }
//     };

//     fetchEspecialidades();
//   }, [selectedEstablecimiento]);

//   const handleEstablecimientoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const establecimientoId = event.target.value ? parseInt(event.target.value) : null;
//     setSelectedEstablecimiento(establecimientoId);
//   };

//   return (
//     <div className="container_resporte">
//       <h2 className="title">Reporte Hospitales</h2>

//       {/* Combo Box para seleccionar establecimiento de forma dinámica */}
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <select className="form-select" value={selectedEstablecimiento || ''} onChange={handleEstablecimientoChange} aria-label="Seleccionar establecimiento">
//             <option value="">Selecciona un establecimiento</option>
//             {establecimientos.map((establecimiento) => (
//               <option key={establecimiento.idestablecimiento_ID} value={establecimiento.idestablecimiento_ID}>
//                 {establecimiento.nombre}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="row">
//         {especialidades.map((especialidad, index) => (
//           <div className="col-md-4" key={index}>
//             <div className="card">
//               <div className="card-body">
//                 <center><h5 className="card-title">{especialidad.especialidad}</h5></center>
//                 <p className="card-text">
//                   <i className="fas fa-bed icon-green"></i> <strong>Instalada:</strong> {especialidad.inscritas}
//                 </p>
//                 <p className="card-text">
//                   <i className="fas fa-box-open icon-blue"></i> <strong>Ofertada:</strong> {especialidad.ofertadas}
//                 </p>
//                 <p className="card-text">
//                   <i className="fas fa-procedures icon-red"></i> <strong>Ocupada:</strong> {especialidad.ocupadas}
//                 </p>
//                 <p className="card-text">
//                   <i className="fas fa-check-circle icon-yellow"></i> <strong>Disponible:</strong> {especialidad.disponibles}
//                 </p>
//                 <p className="card-text">
//                   <i className="fas fa-user-check icon-gray"></i> <strong>Alta:</strong> {especialidad.altas}
//                 </p>
//                 <p className="card-text">
//                   <i className="fas fa-clock icon-gray"></i> <strong>Actualizado:</strong> {new Date(especialidad.ultima_modificacion).toLocaleString('es-ES', {
//                     year: 'numeric',
//                     month: 'short',
//                     day: '2-digit',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     second: '2-digit'
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EspecialidadesReport;
