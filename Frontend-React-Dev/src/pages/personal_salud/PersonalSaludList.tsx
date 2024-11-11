import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../personal_salud/style/personal-saludlLit.css';

interface PersonalSalud {
  personal_ID: number;
  nombres: string;
  primer_apellido: string;
  segundo_nombre: string;
  ci: string;
  matricula_profesional: string;
  sexo: string;
  cargo: string;
  correo_electronico: string;
}

const PersonalSaludList: React.FC = () => {
  const [personalesSalud, setPersonalesSalud] = useState<PersonalSalud[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Obtener los registros de PersonalSalud del backend
  // const fetchPersonalesSalud = () => {
  //   fetch('http://localhost:3000/personal-salud')
  //     .then(response => response.json())
  //     .then(data => setPersonalesSalud(data))
  //     .catch(() => setErrorMessage('Error al obtener la lista de personal de salud'));
  // };


  const fetchPersonalesSalud = () => {
    fetch('http://localhost:3000/personal-salud')
      .then(response => {
        //console.log('Respuesta del servidor:', response); // Verifica la respuesta
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Datos obtenidos:', data); // Verifica los datos obtenidos
        setPersonalesSalud(data.data); // Accede a la propiedad 'data' que contiene el arreglo
      })
      .catch((error) => {
        //console.error('Error en fetchPersonalesSalud:', error);
        setErrorMessage('Error al obtener la lista de personal de salud');
      });
  };
  

  useEffect(() => {
    fetchPersonalesSalud();
  }, []);

  // Función para eliminar un personal de salud
  const handleDelete = (id: number) => {
    console.log('Intentando eliminar el ID:', id);
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      fetch(`http://localhost:3000/personal-salud/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el personal de salud');
          }
          // Filtra el registro eliminado directamente en el estado
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
  const handleEdit = (id: number) => {
    navigate(`/personal-salud/edit/${id}`);
  };

  return (
    <div className="container">
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
            <th>CI</th>
            <th>Matrícula Profesional</th>
            <th>Cargo</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {personalesSalud.map((personal) => (
            <tr key={personal.personal_ID}>
              <td>{personal.nombres}</td>
              <td>{personal.primer_apellido} {personal.segundo_nombre}</td>
              <td>{personal.ci}</td>
              <td>{personal.matricula_profesional}</td>
              <td>{personal.cargo}</td>
              <td className="botones">
                <button
                  className="button-editar"
                  onClick={() => handleEdit(personal.personal_ID)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
              </td>
              <td>
                <button
                  className="button-eliminar"
                  onClick={() => handleDelete(personal.personal_ID)}>
                  <i className="fas fa-trash"></i> Eliminar
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
