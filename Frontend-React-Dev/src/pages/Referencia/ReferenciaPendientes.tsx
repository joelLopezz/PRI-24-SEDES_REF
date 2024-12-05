import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Referencia/Styles/List.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Referencia {
  referencia_ID: number;
  fecha_ingreso: string;
  motivo_referencia: string;
  nombre_contacto_receptor: string;
  medio_comunicacion: string;
  estado: number;
}

const PendientesList: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchPendientes = () => {
    fetch(`${API_BASE_URL}/referencias/estado/1`) // Solo cargar referencias con estado 1
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las referencias pendientes');
        }
        return response.json();
      })
      .then((data) => {
        setReferencias(data);
      })
      .catch((error) => {
        console.error('Error en fetchPendientes:', error);
        setErrorMessage('Error al obtener la lista de referencias pendientes');
      });
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  const handleEdit = (referenciaId: number) => {
    navigate(`/referencia/edit/${referenciaId}`);
  };
  const handleDelete = (referenciaId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta referencia?')) {
      fetch(`${API_BASE_URL}/referencias/${referenciaId}/remove`, {
        method: 'PATCH', // Usamos PATCH para el soft remove
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al eliminar la referencia');
          }
          setReferencias((prevReferencias) =>
            prevReferencias.filter((ref) => ref.referencia_ID !== referenciaId)
          );
          alert('Referencia eliminada correctamente');
        })
        .catch((error) => {
          console.error('Error al eliminar la referencia:', error);
          setErrorMessage('No se pudo eliminar la referencia');
        });
    }
  };

  return (
    <div className="container_referencias_list">
      <h2 className="titulo-listado">
        Listado de Referencias
        <small className="subtitulo"> (Pendientes)</small>
      </h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Fecha Envio</th>
            <th>Motivo</th>
            <th>Referente</th>
            <th>Receptor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {referencias.map((ref) => (
            <tr key={ref.referencia_ID}>
              <td>{ref.fecha_ingreso}</td>
              <td>{ref.motivo_referencia}</td>
              <td>{ref.nombre_contacto_receptor}</td>
              <td>{ref.medio_comunicacion}</td>
              <td className="botones">
                <button
                  className="button-editar"
                  onClick={() => handleEdit(ref.referencia_ID)}
                >
                  <i className="fas fa-edit"></i>
                  Editar
                </button>
                <button
                  className="button-eliminar"
                  onClick={() => handleDelete(ref.referencia_ID)}>
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

export default PendientesList;
