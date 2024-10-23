import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

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
  const fetchPersonalesSalud = () => {
    fetch('http://localhost:3000/personal-salud')
      .then(response => response.json())
      .then(data => setPersonalesSalud(data))
      .catch(() => setErrorMessage('Error al obtener la lista de personal de salud'));
  };

  useEffect(() => {
    fetchPersonalesSalud();
  }, []);

  // Función para eliminar un personal de salud
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/personal-salud/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el personal de salud');
        }
        fetchPersonalesSalud(); // Refrescar la lista
      })
      .catch(() => setErrorMessage('No se pudo eliminar el personal de salud'));
  };

  // Redirigir a la página de creación
  const handleCreate = () => {
    navigate('/personal-salud/create');
  };

  // Redirigir a la página de edición
  const handleEdit = (id: number) => {
    navigate(`/personal-salud/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      {/* Botón para registrar nuevo personal */}
      <div className="mb-4">
        <Button variant="success" onClick={handleCreate}>
          Insertar nuevo personal
        </Button>
      </div>

      {/* Tabla de personal de salud */}
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Nombre</th>
            <th>CI</th>
            <th>Matrícula Profesional</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personalesSalud.map((personal) => (
            <tr key={personal.personal_ID}>
              <td>{personal.personal_ID}</td>
              <td>{personal.nombres}</td>
              <td>{personal.primer_apellido}</td>
              <td>{personal.segundo_nombre}</td>
              <td>{personal.ci}</td>
              <td>{personal.matricula_profesional}</td>
              <td>{personal.cargo}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(personal.personal_ID)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(personal.personal_ID)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default PersonalSaludList;
