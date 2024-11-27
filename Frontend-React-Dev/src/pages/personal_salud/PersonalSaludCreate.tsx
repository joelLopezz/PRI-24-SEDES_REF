/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


interface Specialty {
  id: number;
  nombre: string;
}

interface Establecimiento{
  id: number;
  nombre: string;
}

const PersonalSaludCreate: React.FC = () => {
  // Definir el estado inicial del formulario
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    ci: '',
    matricula_profesional: '',
    sexo: '',
    cargo: '',
    correo_electronico: '',
    rol: '',
    telefono: '',
    especialidad: '',
    establecimiento:'',
  });

  const [specialties, setSpecialties] = useState<Specialty[]>([]); 
  const [establecimeinto, setEstablecimiento] = useState<Establecimiento[]>([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:3000/specialties/list');
        if (!response.ok) {
          throw new Error('Error al obtener las especialidades');
        }
        const data = await response.json();
        setSpecialties(data); 
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        setErrorMessage('Error al cargar las especialidades');
      }
    };

    // Función para obtener los establecimientos desde el backend
    const fetchEstablecimientos = async () => {
      try {
        const response = await fetch('http://localhost:3000/establecimiento/nombres');
        if (!response.ok) {
          throw new Error('Error al obtener los establecimientos');
        }
        const data = await response.json();
        setEstablecimiento(data); 
      } catch (error) {
        console.error('Error al obtener los establecimientos:', error);
        setErrorMessage('Error al cargar los establecimientos');
      }
    };

    fetchEstablecimientos();
    fetchSpecialties();
  }, []); 

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearForm = () => {
    setFormData({
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      ci: '',
      matricula_profesional: '',
      sexo: '',
      cargo: '',
      correo_electronico: '',
      rol: '',
      telefono: '',
      especialidad: '',
      establecimiento:'',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancel = () => {
    navigate('/personal-salud');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.nombres ||
      !formData.primer_apellido ||
      !formData.ci ||
      !formData.telefono ||
      !formData.correo_electronico ||
      !formData.rol
    ) {
      setErrorMessage('Todos los campos obligatorios deben ser completados.');
      return;
    }

    //console.log('Datos enviados al servidor:', formData);

    const url = 'http://localhost:3000/personal-salud/create-new-personal-salud';
    setLoading(true);

    const payload = {
      nombres: formData.nombres,
      primer_apellido: formData.primer_apellido,
      segundo_apellido: formData.segundo_apellido,
      ci: formData.ci,
      matricula_profesional: formData.matricula_profesional,
      sexo: formData.sexo,
      cargo: formData.cargo,
      correo_electronico: formData.correo_electronico,
      rol: formData.rol,
      telefono: Number(formData.telefono),
      especialidad: Number(formData.especialidad),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                  },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        setErrorMessage(errorData.message || 'Error al guardar los datos');
        return;
      }

      setSuccessMessage('Personal de salud creado correctamente');
      setTimeout(() => navigate('/personal-salud'), 1000);
      
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Ocurrió un error inesperado al enviar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Registrar Personal de Salud</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}

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
                type="number"
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
                <option value="Admin Sedes">Admin Sedes</option>
                <option value="Admin Hospital">Admin Hospital</option>
                <option value="Doctor">Doctor</option>
                <option value="Enfermera">Enfermero</option>
              </select>
            </div>

            {/* Especialidad */}
            <div className="col-md-6 mb-3">
              <label htmlFor="especialidad" className="form-label">
                Especialidad:
              </label>
              <select
                id="especialidad"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccione una especialidad</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.nombre}
                  </option>
                ))}
              </select>
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
          </div>

          {/* Establecimiento */}
          {role == 'Admin Sedes' &&(
            <div className="col-md-6 mb-3">
            <label htmlFor="establecimiento" className="form-label">
              Establecimiento:
            </label>
            <select
              id="establecimiento"
              name="establecimiento"
              value={formData.establecimiento}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Seleccione un estalecimiento</option>
              {establecimeinto.map((Establecimiento) => (
                <option key={Establecimiento.id} value={Establecimiento.id}>
                  {Establecimiento.nombre}
                </option>
              ))}
            </select>
          </div>
          )}

          {/* Botones */}
          <div className="d-flex justify-content-between mt-4">
            <button
              type="reset" className="btn btn-secondary col-2" onClick={handleClearForm}>
              Limpiar 
            </button>
            <button
              type="button" className="btn btn-danger col-2" onClick={handleCancel}>
              Cancelar
            </button>
            <button 
            type="submit" className="btn btn-success col-2">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalSaludCreate;
