// src/pages/cama/CamaList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cama/style/camaList.css'

const CamaList = () => {
  const [camas, setCamas] = useState<any[]>([]); // Utilizamos any[] para ser flexibles en el manejo de datos
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cama');
        if (response.data) {
          setCamas(response.data);
        } else {
          console.error('La respuesta no contiene datos de camas.');
        }
      } catch (error) {
        console.error('Error al obtener las camas:', error);
      }
    };

    fetchCamas();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/cama/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta cama?')) {
      try {
        await axios.delete(`http://localhost:3000/cama/${id}`);
        alert('Cama eliminada exitosamente');
        setCamas((prevCamas) => prevCamas.filter((cama) => cama.cama_ID !== id));
      } catch (error) {
        console.error('Error al eliminar la cama:', error);
        alert('Error al eliminar la cama');
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">Lista de Camas</h2>
      <div className="button-container">
        <button className="add-button" onClick={() => navigate('/cama/create')}>
          Insertar nueva cama
        </button>
      </div>
      {camas.length === 0 ? (
        <p>Cargando datos de las camas o no hay camas disponibles.</p>
      ) : (
        <table className="cama-table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Establecimiento de Salud</th>
              <th>Especialidad</th>
              <th>Servicio</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {camas.map((cama) => (
              <tr key={cama.cama_ID}>
                <td>{cama.numero || 'No Disponible'}</td>
                <td>{cama.establecimientoSalud?.nombre || 'No Disponible'}</td>
                <td>{cama.especialidad?.nombre || 'No Disponible'}</td>
                <td>{cama.servicio?.nombre || 'No Disponible'}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(cama.cama_ID)}>
                      <i className="fas fa-edit"></i> Editar
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(cama.cama_ID)}>
                    <i className="fas fa-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CamaList;
