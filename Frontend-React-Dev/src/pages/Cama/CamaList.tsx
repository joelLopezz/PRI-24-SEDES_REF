import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cama/style/camaList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../Context/AuthContext';

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<EspecialidadData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(''); 
  const navigate = useNavigate(); 
   const { role } = useAuth();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cama/especialidades`);
        setEspecialidades(response.data || []);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };
    fetchEspecialidades();
  }, []);
  
  const handleNavigation = () => {
    navigate('/reporte-especialidades'); 
  };

  const handleEdit = (especialidad: EspecialidadData) => {
    setSelectedEspecialidad(especialidad);
    setConfirmationMessage(''); 
    setIsModalOpen(true); 
  };

  const handleEditCama = (especialidad: EspecialidadData) => {
    setSelectedEspecialidad(especialidad);
    setConfirmationMessage('');
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
    setSelectedEspecialidad(null); 
    setConfirmationMessage(''); 
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? '' : Number(value);
    setSelectedEspecialidad((prev) => prev ? { ...prev, [name]: parsedValue } : null);
  };
  
  const handleSaveChanges = async () => {
    if (selectedEspecialidad) {
      const totalSum = selectedEspecialidad.ocupadas + selectedEspecialidad.disponibles + selectedEspecialidad.alta;
  
      if (totalSum !== selectedEspecialidad.ofertadas) {
        setConfirmationMessage('La suma de los campos: Ocupadas, Disponibles y Altas no coincide con las ofertadas. Verifique el conteo de cama.');
        return; 
      }
  
      try {
        const dataToSend = {
          disponible: selectedEspecialidad.disponibles,
          alta: selectedEspecialidad.alta,
        };
  
        console.log("Datos que se enviarán al backend:", {
          historia_ID: selectedEspecialidad.historia_ID,
          ...dataToSend
        });
  
        await axios.post(`${API_BASE_URL}/historia-cama/reinsertar/${selectedEspecialidad.historia_ID}`, dataToSend);
        setConfirmationMessage('Datos actualizados con éxito.');
  
        setTimeout(() => {
          handleModalClose();
        }, 1400);
  
        setEspecialidades((prevEspecialidades) =>
          prevEspecialidades.map((especialidad) =>
            especialidad.historia_ID === selectedEspecialidad.historia_ID
              ? { ...especialidad, disponibles: dataToSend.disponible, ocupadas: dataToSend.alta }
              : especialidad
          )
        );
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        setConfirmationMessage('ERROR AL ACTUALIZAR LOS DATOS');
      }
    }
  };
  
  
  return (
    <div className="container_cama_list">
      <h2 className="title">Especialidades por Hospital</h2>

      {(role == 'Admin Hospital') &&(
        <div>
        <button onClick={() => navigate('/crearCama')}  className="btn btn-success">Crear Nueva Cama</button>
        </div>
      )}
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
              {(role == 'Enfermera' || role == 'Doctor') && (
              <th>Accion</th>
              )}
              {/* {(role == 'Admin Hospital') && (
              <th>Accion</th>
              )} */}
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
                {(role == 'Enfermera' || role == 'Doctor') && (
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(especialidad)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                </td>
                )}
                {/* {(role == 'Admin Hospital') && (
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditCama(especialidad)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                </td>
                )} */}
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
                        readOnly = {role != 'Admin Hospital'}
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
                        readOnly= {role != 'Admin Hospital'}
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
                        readOnly = {role === 'Admin Hospital'}
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
                        readOnly = {role == 'Admin Hospital'}
                      />
                    </div>
                  </div>

                  {confirmationMessage && (
                    <p className="text-success text-center fw-bold">{confirmationMessage}</p>
                  )}
                  
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
    </div>
  );
};

export default EspecialidadesList;
