import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito
import { validateNombre } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext'; // Importar useAuth




interface Especialidad {
  id: number;
  nombre: string;
  estado: number;

}

const EspecialidadEdit: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { usuarioID } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Especialidad>({
    id: 0,
    nombre: '',
    estado: 1, // Manteniendo estado en 1 (activo)

  });

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false); // Controlamos la apertura del modal de éxito

  useEffect(() => {
    const fetchEspecialidad = async () => {
      try {
        const response = await axios.get<Especialidad>(`${API_BASE_URL}/specialties/${id}`);
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
  
    if (name === "nombre") {
      const upperCaseValue = value.toUpperCase();
  
      if (validateNombre(upperCaseValue) || upperCaseValue === '') {
        setFormData({
          ...formData,
          [name]: upperCaseValue,
        });
      } else {
        alert('El nombre no debe comenzar con un espacio ni contener múltiples espacios consecutivos.');
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const upperCaseData = {
        ...formData,
        nombre: formData.nombre.toUpperCase(), // Asegurarse de enviar en mayúsculas
        usuario_modificacion: usuarioID,
      };
  
      await axios.put(`${API_BASE_URL}/specialties/${id}`, upperCaseData);
      setModalOpen(true); // Abrimos el modal de éxito
    } catch (error) {
      console.error('Error al actualizar la especialidad:', error);
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/especialidades'); // Redirigimos después de cerrar el modal
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
