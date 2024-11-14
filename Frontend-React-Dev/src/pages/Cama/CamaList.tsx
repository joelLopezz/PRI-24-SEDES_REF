// src/pages/cama/EspecialidadesList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios';
import '../Cama/style/camaList.css';
import 'bootstrap/dist/css/bootstrap.min.css';


interface EspecialidadData {
  historia_ID: number;
  nombre: string;
  instaladas: number;
  ofertadas: number;
  disponibles: number;
  ocupadas: number;
  alta: number;
}

const EspecialidadesList = () => {
  const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<EspecialidadData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Estado para el mensaje de confirmación

  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cama/especialidades');
        setEspecialidades(response.data || []);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleNavigation = () => {
    navigate('/reporte-especialidades'); // Cambia '/otra-pagina' por la ruta de destino deseada
  };

  const handleEdit = (especialidad: EspecialidadData) => {
    setSelectedEspecialidad(especialidad);
    setConfirmationMessage(''); // Resetea el mensaje de confirmación al abrir el modal
    setIsModalOpen(true); // Abre el modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedEspecialidad(null); // Limpia la selección al cerrar el modal
    setConfirmationMessage(''); // Resetea el mensaje de confirmación al cerrar el modal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? '' : Number(value);
    setSelectedEspecialidad((prev) => prev ? { ...prev, [name]: parsedValue } : null);
  };

  const handleSaveChanges = async () => {
    if (selectedEspecialidad) {
      try {
        // Asegurarse de que los valores son numéricos y válidos antes de enviar
        const dataToSend = {
          // disponible: isNaN(Number(selectedEspecialidad.disponibles)) ? 0 : Number(selectedEspecialidad.disponibles),
          // alta: isNaN(Number(selectedEspecialidad.alta)) ? 0 : Number(selectedEspecialidad.ocupadas),
          disponible: selectedEspecialidad.disponibles,
          alta:  selectedEspecialidad.alta,

        };
  
        // Log para verificar los datos antes de enviarlos al backend
        console.log("Datos que se enviarán al backend:", {
          historia_ID: selectedEspecialidad.historia_ID,
          ...dataToSend
        });
  
        // Hacer la solicitud POST solo con los datos requeridos
        await axios.post(`http://localhost:3000/historia-cama/reinsertar/${selectedEspecialidad.historia_ID}`, dataToSend);
  
        setConfirmationMessage('DATOS ACTUALIZADOS CORRECTAMENTE'); // Muestra el mensaje de confirmación

        // Cerrar el modal automáticamente después de 1 segundo
        setTimeout(() => {
          handleModalClose();
        }, 1400);
  
        // Actualizar la lista local después de la edición
        setEspecialidades((prevEspecialidades) =>
          prevEspecialidades.map((especialidad) =>
            especialidad.historia_ID === selectedEspecialidad.historia_ID
              ? { ...especialidad, disponibles: dataToSend.disponible, ocupadas: dataToSend.alta }
              : especialidad
          )
        );
      } catch (error: any) {
        console.error('Error al actualizar los datos:', error);
        setConfirmationMessage('ERROR AL ACTUALIZAR LOS DATOS'); // Muestra un mensaje de error si falla
      }
    }
  };
  

  return (
    <div className="container_cama_list">
      <h2 className="title">Especialidades por Hospital</h2>
      {especialidades.length === 0 ? (
        <p>Cargando datos de especialidades o no hay especialidades disponibles.</p>
      ) : (
        <table className="cama-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Especialidad</th>
              <th>Instaladas</th>
              <th>Ofertadas</th>
              <th>Ocupadas</th>
              <th>Disponibles</th>
              <th>Alta</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad, index) => (
              <tr key={index}>
                {/* <td>{especialidad.historia_ID}</td> */}
                <td>{especialidad.nombre || 'No Disponible'}</td>
                <td>{especialidad.instaladas}</td>
                <td>{especialidad.ofertadas}</td>
                <td>{especialidad.ocupadas}</td>
                <td>{especialidad.disponibles}</td>
                <td>{especialidad.alta}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(especialidad)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para editar especialidad */}
      {isModalOpen && selectedEspecialidad && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header d-flex justify-content-center w-100">
              <span className="especialidad-nombre fw-bold text-center">{selectedEspecialidad.nombre}</span>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
            </div>

              <div className="modal-body">
                <form>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Instaladas:</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="instaladas"
                        value={selectedEspecialidad.instaladas}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Ofertadas:</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="ofertadas"
                        value={selectedEspecialidad.ofertadas}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Ocupadas:</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="ocupadas"
                        value={selectedEspecialidad.ocupadas}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Disponibles:</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="disponibles"
                        value={selectedEspecialidad.disponibles}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="form-label mb-0">Alta:</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="alta"
                        value={selectedEspecialidad.alta}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Mensaje de confirmación */}
                  {confirmationMessage && (
                    <p className="text-success text-center fw-bold">{confirmationMessage}</p>
                  )}
                  {/* Botones alineados con los campos */}
                  <div className="row mt-4 align-items-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 d-flex justify-content-between">
                      <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                        Cancelar
                      </button>
                      <button type="button" className="btn btn-success" onClick={handleSaveChanges}>
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Botón para navegar a otra página */}
      {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleNavigation} className="btn btn-primary">
          Ir a Otra Página
        </button>
      </div> */}
    </div>
  );
};

export default EspecialidadesList;
