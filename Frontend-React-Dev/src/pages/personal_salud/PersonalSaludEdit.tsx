import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonalSaludEdit: React.FC = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    ci: '',
    matricula_profesional: '',
    sexo: '',
    cargo: '',
    telefono: '',
    correo_electronico: '',
    rol: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Cargar datos del personal de salud cuando se monta el componente
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/personal-salud/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del personal de salud');
        }
        const personalData = await response.json();
       const data = personalData.data;

        setFormData({
          nombres: data.nombres,
          primer_apellido: data.primer_apellido,
          segundo_apellido: data.segundo_apellido,
          ci: data.ci,
          matricula_profesional: data.matricula_profesional,
          sexo: data.sexo,
          cargo: data.cargo,
          telefono: data.telefono,
          correo_electronico: data.correo_electronico,
          rol: data.rol,
        });
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setErrorMessage('No se pudo cargar los datos del personal de salud');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchPersonalData();
    }
  }, [id]);
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancel = () => {
    navigate('/personal-salud');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombres || !formData.primer_apellido || !formData.ci || !formData.telefono || !formData.correo_electronico || !formData.rol) {
      setErrorMessage('Todos los campos obligatorios deben ser completados.');
      return;
    }

    const url = `${API_BASE_URL}/personal-salud/${id}`;
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        setErrorMessage(errorData.message || 'Error al actualizar los datos');
        return;
      }

      setSuccessMessage('Personal de salud actualizado correctamente');
      setTimeout(() => navigate('/personal-salud'), 1500);
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Ocurrió un error inesperado al actualizar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Editar Personal de Salud</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}

        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Nombres */}
              <div className="col-md-6 mb-3">
                <label htmlFor="nombres" className="form-label">
                  Nombres:
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Primer Apellido */}
              <div className="col-md-6 mb-3">
                <label htmlFor="primer_apellido" className="form-label">
                  Primer Apellido:
                </label>
                <input
                  type="text"
                  id="primer_apellido"
                  name="primer_apellido"
                  value={formData.primer_apellido}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Segundo Apellido */}
              <div className="col-md-6 mb-3">
                <label htmlFor="segundo_apellido" className="form-label">
                  Segundo Apellido:
                </label>
                <input
                  type="text"
                  id="segundo_apellido"
                  name="segundo_apellido"
                  value={formData.segundo_apellido}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {/* Telefono */}
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono:
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* C.I. */}
              <div className="col-md-6 mb-3">
                <label htmlFor="ci" className="form-label">
                  C.I.:
                </label>
                <input
                  type="text"
                  id="ci"
                  name="ci"
                  value={formData.ci}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Matrícula Profesional */}
              <div className="col-md-6 mb-3">
                <label htmlFor="matricula_profesional" className="form-label">
                  Matrícula Profesional:
                </label>
                <input
                  type="text"
                  id="matricula_profesional"
                  name="matricula_profesional"
                  value={formData.matricula_profesional}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              {/* Sexo */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Sexo:</label>
                <div className="form-check">
                  <input
                    type="radio"
                    id="sexoM"
                    name="sexo"
                    value="M"
                    checked={formData.sexo === 'M'}
                    onChange={handleInputChange}
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="sexoM" className="form-check-label">
                    Masculino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="sexoF"
                    name="sexo"
                    value="F"
                    checked={formData.sexo === 'F'}
                    onChange={handleInputChange}
                    className="form-check-input"
                    required
                  />
                  <label htmlFor="sexoF" className="form-check-label">
                    Femenino
                  </label>
                </div>
              </div>

              {/* Cargo */}
              <div className="col-md-6 mb-3">
                <label htmlFor="cargo" className="form-label">
                  Cargo:
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Correo Electrónico */}
              <div className="col-md-6 mb-3">
                <label htmlFor="correo_electronico" className="form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="correo_electronico"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Rol */}
              <div className="col-md-6 mb-3">
                <label htmlFor="rol" className="form-label">
                  Rol:
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="Admin Hospital">Admin Hospital</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Admin Sedes">Admin Sedes</option>
                </select>
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="reset" className="btn btn-secondary col-2" onClick={clearMessages}
              >
                Limpiar
              </button>
              <button
                type="button" className="btn btn-danger col-2" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success col-2">
                Actualizar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonalSaludEdit;
