import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Specialty {
  id: number;
  nombre: string;
}

interface Servicio {
  servicio_ID: number;
  nombre: string;
}

const CamaCreate = () => {
  const [formData, setFormData] = useState({
    establecimientoSalud: '',
    especialidad: '',
    servicio: '',
    instalada:'',
    ofertada:'',
    disponible: '',
    ocupada:'',
    alta:'',
  });

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        //const specialtiesResponse = await axios.get<Specialty[]>('http://localhost:3000/specialties/list');
        const specialtiesResponse = await axios.get<Specialty[]>('http://localhost:3000/estab-especialidad/especialidades');
        setSpecialties(specialtiesResponse.data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        setErrorMessage('Error al cargar las especialidades');
      }
    };

    const fetchServicios = async () => {
      try {
        const serviciosResponse = await axios.get<Servicio[]>('http://localhost:3000/servicio/list');
        setServicios(serviciosResponse.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
        setErrorMessage('Error al cargar los servicios');
      }
    };

    fetchEspecialidades();
    fetchServicios();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Preparar los datos a ser enviados
      const camaData = {
        especialidad: formData.especialidad,
        servicio: formData.servicio,
        estado: 1, // Estado por defecto
      };

      const historialData = {
        instalada: formData.instalada,
        ofertada: formData.ofertada,
        disponible: formData.disponible,
        ocupada: formData.ocupada,
        alta: formData.alta,
        es_actual: 1, 
        usuario_modificacion: 'user_id',
      };

      const response = await axios.post('http://localhost:3000/cama', { datosCama: camaData, datosHistorial: historialData });

      console.log('Cama creada:', response.data);
      setSuccessMessage('Personal de salud creado correctamente');
      setTimeout(() => navigate('/cama'), 1500);

    } catch (error) {
      console.error('Error al crear la cama:', error);
      setErrorMessage('Error desconocido al crear la cama');
    }
  };


  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h2 className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>Registrar Cama</h2>

        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="instalada" style={{ fontWeight: 'bold', color: '#555' }}>Instalada:</label>
          <input
            type="number"
            id="instalada"
            name="instalada"
            value={formData.instalada}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de camas Instaladas"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="ofertada" style={{ fontWeight: 'bold', color: '#555' }}>Ofertada:</label>
          <input
            type="number"
            id="ofertada"
            name="ofertada"
            value={formData.ofertada}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de camas ofertadas"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="disponible" style={{ fontWeight: 'bold', color: '#555' }}>Disponible:</label>
          <input
            type="number"
            id="disponible"
            name="disponible"
            value={formData.disponible}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de camas disponibles"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="ocupada" style={{ fontWeight: 'bold', color: '#555' }}>Ocupada:</label>
          <input
            type="number"
            id="ocupada"
            name="ocupada"
            value={formData.ocupada}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de camas ocupadas"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="alta" style={{ fontWeight: 'bold', color: '#555' }}>Alta:</label>
          <input
            type="number"
            id="alta"
            name="alta"
            value={formData.alta}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de cama"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="especialidad" style={{ fontWeight: 'bold', color: '#555' }}>Especialidad:</label>
          <select
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Seleccione una especialidad</option>
            {specialties.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="servicio" style={{ fontWeight: 'bold', color: '#555' }}>Servicio:</label>
          <select
            id="servicio"
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.servicio_ID} value={servicio.servicio_ID}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar mensaje de éxito si existe */}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        <div className="text-center" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {/* Botón Crear */}
          <button  type="submit" style={{ padding: '12px 25px', border: 'none', borderRadius: '4px', backgroundColor: '#228B22', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#006400')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#228B22')}>
            Crear
          </button>

          {/* Botón Cancelar */}
          <button  type="button" style={{ padding: '12px 25px', border: 'none', borderRadius: '4px', backgroundColor: '#B22222', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#8B0000')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#B22222')}>
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};

export default CamaCreate;
