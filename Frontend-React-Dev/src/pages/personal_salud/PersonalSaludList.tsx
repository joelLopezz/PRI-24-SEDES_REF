import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../personal_salud/style/personal-saludlLit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PersonalSalud {
  personal_ID: number;
  nombres: string;
  primer_apellido: string;
  segundo_nombre: string;
  ci: string;
  telefono: number,
  matricula_profesional: string;
  sexo: string;
  cargo: string;
  correo_electronico: string;
}

const PersonalSaludList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [personalesSalud, setPersonalesSalud] = useState<PersonalSalud[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchPersonalesSalud = () => {
    fetch(`${API_BASE_URL}/personal-salud`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setPersonalesSalud(data.data); 
      })
      .catch((error) => {
        setErrorMessage('Error al obtener la lista de personal de salud');
      });
  };
  

  useEffect(() => {
    fetchPersonalesSalud();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      fetch(`${API_BASE_URL}/personal-salud/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el personal de salud');
          }
          
          setPersonalesSalud(prevPersonales => prevPersonales.filter(personal => personal.personal_ID !== id));
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('No se pudo eliminar el personal de salud');
        });
    }
  };
  
  
  


  // Redirigir a la página de creacion
  const handleCreate = () => {
    navigate('/personal-salud/create');
  };

  // Redirigir a la página de edición
  const handleEdit = (personal_ID:number) => {
    navigate(`/personal-salud/edit/${personal_ID}`);
  };

  return (
    <div className="container_personal_list">
      {/* Botón para registrar nuevo personal */}
      <div className="button-insertar">
        <button onClick={handleCreate}>
          Insertar nuevo personal
        </button>
      </div>

      {/* Tabla de personal de salud */}
      <table className="table-container">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>Matrícula Profesional</th>
            <th>CI</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personalesSalud.map((personal) => (
            <tr key={personal.personal_ID}>
              <td>{personal.nombres}</td>
              <td>{personal.primer_apellido} {personal.segundo_nombre}</td>
              <td>{personal.cargo}</td>
              <td>{personal.matricula_profesional}</td>
              <td>{personal.ci}</td>
              <td>
                <a href={`https://wa.me/${'+591' + personal.telefono}`} target="_blank" rel="noopener noreferrer">
                  {personal.telefono}
                </a>
              </td>
              <td>
                <a href={`mailto:${personal.correo_electronico}`}>{personal.correo_electronico}</a>
              </td>
              <td className="botones">
                <button
                  className="button-editar"
                  onClick={() => handleEdit(personal.personal_ID)}>
                  <i className="fas fa-edit"></i>
                  Editar
                </button>
                <button
                  className="button-eliminar"
                  onClick={() => handleDelete(personal.personal_ID)}>
                  <i className="fas fa-trash"></i>
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {errorMessage && <p className="text-error">{errorMessage}</p>}
    </div>
  );
};

export default PersonalSaludList;
