import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PersonalSaludCreate {
  isEditing: boolean;
}

const PersonalSaludCreate: React.FC<PersonalSaludCreate> = ({ isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_nombre: '',
    nacionalidad: '',
    ci: '',
    telefono: '',
    matricula_profesional: '',
    correo_electronico: '',
    especialidad: '',
    genero: '',
    establecimiento_salud_idestablecimiento_ID: '',
    rol:'',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEditing && id) {
      fetch(`http://localhost:3000/personal-salud/${id}`)
        .then(response => response.json())
        .then(data => setFormData(data))
        .catch(() => setErrorMessage('No se pudo cargar los datos del personal de salud'));
    }
  }, [isEditing, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setFormData({
      nombres: '',
      primer_apellido: '',
      segundo_nombre: '',
      nacionalidad: '',
      ci: '',
      telefono: '',
      matricula_profesional: '',
      correo_electronico: '',
      especialidad: '',
      genero: '',
      establecimiento_salud_idestablecimiento_ID: '',
      rol:'',

    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancel = () => {
    navigate('/personal-salud');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('FormData antes del envío:', formData); // Verifica que el género esté presente
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
        setTimeout(() => navigate('/personal-salud'), 1500);
      })
      .catch(() => setErrorMessage('Error al guardar los datos'));
  };

  return (
    <div className="container_personal_create" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '20px' }}>
  <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
    <h2 className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333', fontSize: '1.75rem' }}>{isEditing ? 'Editar Personal de Salud' : 'Registrar Personal de Salud'}</h2>
    {errorMessage && <div className="alert alert-danger" style={{ marginBottom: '15px', color: '#721c24', backgroundColor: '#f8d7da', padding: '15px', borderRadius: '8px', border: '1px solid #f5c6cb', fontWeight: 'bold', textAlign: 'center' }}>{errorMessage}</div>}
    {successMessage && <div className="alert alert-success" style={{ marginBottom: '15px', color: '#155724', backgroundColor: '#d4edda', padding: '15px', borderRadius: '8px', border: '1px solid #c3e6cb', fontWeight: 'bold', textAlign: 'center' }}>{successMessage}</div>}
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label htmlFor="nombres" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Nombres:</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ci" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>C.I.:</label>
          <input
            type="text"
            id="ci"
            name="ci"
            value={formData.ci}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="primer_apellido" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Primer Apellido:</label>
          <input
            type="text"
            id="primer_apellido"
            name="primer_apellido"
            value={formData.primer_apellido}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="segundo_apellido" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Segundo Apellido:</label>
          <input
            type="text"
            id="segundo_nombre"
            name="segundo_nombre"
            value={formData.segundo_nombre}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo_electronico" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Correo Electrónico:</label>
          <input
            type="email"
            id="correo_electronico"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matricula_profesional" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Matrícula Profesional:</label>
          <input
            type="text"
            id="matricula_profesional"
            name="matricula_profesional"
            value={formData.matricula_profesional}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidad" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Especialidad:</label>
          <select
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="">Seleccione una opción</option>
            <option value="oftalmologia">Oftalmología</option>
            <option value="cardiologia">Cardiología</option>
            <option value="pediatria">Pediatría</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Género:</label>
          <div className="gender-options" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                id="generoM"
                name="genero"
                value="M"
                checked={formData.genero === 'M'}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
                required
              />
              <label htmlFor="generoM" style={{ color: '#555' }}>Masculino</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                id="generoF"
                name="genero"
                value="F"
                checked={formData.genero === 'F'}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
                required
              />
              <label htmlFor="generoF" style={{ color: '#555' }}>Femenino</label>
            </div>
          </div><div className="gender-options" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="radio"
                id="generoM"
                name="genero"
                value="M"
                checked={formData.genero === 'M'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="generoM" style={{ color: '#555', fontWeight: 'bold' }}>Masculino</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="radio"
                id="generoF"
                name="genero"
                value="F"
                checked={formData.genero === 'F'}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="generoF" style={{ color: '#555', fontWeight: 'bold' }}>Femenino</label>
            </div>

            <div className="form-group">
              <label htmlFor="rol" style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Rol:</label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                className="form-control"
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="">Seleccione una rol</option>
                <option value="oftalmologia">Admin Sedes</option>
                <option value="cardiologia">Doctor</option>
                <option value="pediatria">Admin Hospital</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button type="submit" className="btn-primary" style={{ padding: '12px 30px', border: 'none', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
          {isEditing ? 'Actualizar' : 'Registrar'}
        </button>
        <button type="reset" className="btn-secondary" style={{ padding: '12px 30px', border: 'none', borderRadius: '8px', backgroundColor: '#6c757d', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a6268')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}>
          Limpiar
        </button>
        <button type="button" className="btn-danger" style={{ padding: '12px 30px', border: 'none', borderRadius: '8px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
          onClick={() => navigate('/personal-salud')}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}>
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default PersonalSaludCreate;
