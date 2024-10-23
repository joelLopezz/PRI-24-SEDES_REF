import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PersonalSaludFormProps {
  isEditing: boolean;
}

const PersonalSaludEdit: React.FC<PersonalSaludFormProps> = ({ isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_nombre: '',
    ci: '',
    matricula_profesional: '',
    sexo: '',
    cargo: '',
    correo_electronico: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Para obtener el ID del personal a editar

  useEffect(() => {
    if (isEditing && id) {
      // Cargar los datos existentes para editar
      fetch(`http://localhost:3000/personal-salud/${id}`)
        .then(response => response.json())
        .then(data => setFormData(data))
        .catch(() => setErrorMessage('No se pudo cargar los datos del personal de salud'));
    }
  }, [isEditing, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isEditing ? `http://localhost:3000/personal-salud/${id}` : 'http://localhost:3000/personal-salud';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar los datos');
        }
        setSuccessMessage(isEditing ? 'Personal de salud actualizado correctamente' : 'Personal de salud creado correctamente');
        setTimeout(() => navigate('/personal-salud'), 1500); // Redirigir después de 1.5 segundos
      })
      .catch(() => setErrorMessage('Error al guardar los datos'));
  };

  return (
    <div className="container">
      <h2>{isEditing ? 'Editar Personal de Salud' : 'Registrar Personal de Salud'}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombres:
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Primer Apellido:
          <input
            type="text"
            name="primer_apellido"
            value={formData.primer_apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Segundo Nombre:
          <input
            type="text"
            name="segundo_nombre"
            value={formData.segundo_nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          CI:
          <input
            type="text"
            name="ci"
            value={formData.ci}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Matrícula Profesional:
          <input
            type="text"
            name="matricula_profesional"
            value={formData.matricula_profesional}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cargo:
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn">
          {isEditing ? 'Actualizar' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default PersonalSaludEdit;
