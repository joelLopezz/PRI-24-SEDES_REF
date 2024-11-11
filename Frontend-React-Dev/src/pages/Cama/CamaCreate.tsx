// src/pages/cama/CamaCreate.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const CamaCreate = () => {
  const [formData, setFormData] = useState({
    numero: '',
    establecimientoSalud: '',
    especialidad: '',
    servicio: '',
  });

  const [especialidades, setEspecialidades] = useState<{ especialidad_nombre: string; especialidad_especialidad_ID: number }[]>([]);
  const [servicios, setServicios] = useState<{ servicio_nombre: string; servicio_servicio_ID: number }[]>([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/specialties/combo');
        console.log('Especialidades recibidas:', response.data);
        setEspecialidades(response.data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/servicio/combo');
        console.log('Servicios recibidos:', response.data);
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
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
      const response = await axios.post('http://localhost:3000/cama', formData);
      console.log('Cama creada:', response.data);
      alert('Cama creada exitosamente');
      //navigate('/cama');
    } catch (error) {
      console.error('Error al crear la cama:', error);
      alert('Error al crear la cama');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h2 className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>Registrar Cama</h2>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="numero" style={{ fontWeight: 'bold', color: '#555' }}>Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Número de cama"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="establecimientoSalud" style={{ fontWeight: 'bold', color: '#555' }}>Establecimiento Salud:</label>
          <input
            type="text"
            id="establecimientoSalud"
            name="establecimientoSalud"
            value={formData.establecimientoSalud}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Establecimiento de salud"
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
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.especialidad_especialidad_ID} value={especialidad.especialidad_especialidad_ID}>
                {especialidad.especialidad_nombre}
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
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.servicio_servicio_ID} value={servicio.servicio_servicio_ID}>
                {servicio.servicio_nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button type="submit" style={{ padding: '12px 25px', border: 'none', borderRadius: '4px', backgroundColor: '#228B22', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#008000')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#008000')}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CamaCreate;
