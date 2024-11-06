import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import { validateNombre } from '../../Components/validations/Validations';

interface Especialidad {
  id: number;
  nombre: string;
  estado: number;
}

const EspecialidadEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Especialidad>({
    id: 0,
    nombre: '',
    estado: 1, // Manteniendo estado en 1 (activo)
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEspecialidad = async () => {
      try {
        const response = await axios.get<Especialidad>(`http://localhost:3000/specialties/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la especialidad:', error);
        setLoading(false);
      }
    };

    fetchEspecialidad();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validar el valor antes de actualizar el estado
    if (validateNombre(value) || value === '') {
      setFormData({ ...formData, [name]: value });
      setError(''); // Limpiar el error si la validación es exitosa
    } else {
      setError('El nombre de la especialidad no es válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Eliminar espacios al final antes de validar
    // const nombreTrimmed = formData.nombre.trimEnd();
    const nombreTrimmed = formData.nombre.trimEnd().toUpperCase(); 

    if (!validateNombre(nombreTrimmed)) {
      setError('El nombre de la especialidad no es válido.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/specialties/${id}`, { ...formData, nombre: nombreTrimmed });
      setModalOpen(true);
    } catch (error) {
      console.error('Error al actualizar la especialidad:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/especialidades');
  };

  const handleCancel = () => {
    navigate('/especialidades');
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Cargando datos...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Especialidad</h1>

      {/* {error && <div className="text-red-500 mb-4">{error}</div>} Mostrar error si existe */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre de la Especialidad</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Botones */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La especialidad ha sido editada exitosamente."
      />
    </div>
  );
};

export default EspecialidadEdit;
