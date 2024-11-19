import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito
import { validateCodigo, validateNombreServicio } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext';


// Definir la interfaz para las especialidades
interface Especialidad {
  id: number;
  nombre: string;
}

// Definir la interfaz para el servicio
interface Servicio {
  servicio_ID: number;
  codigo: string;
  nombre: string;
  especialidad_ID: number; // Relación con la especialidad
}

const EditService: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const { id } = useParams<{ id: string }>(); // Obtener el ID del servicio desde la URL
  const navigate = useNavigate();

  // Estados para el formulario y los datos relacionados
  const [formData, setFormData] = useState<Servicio>({
    servicio_ID: 0,
    codigo: '',
    nombre: '',
    especialidad_ID: 0, // ID de la especialidad seleccionada
  });

  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]); // Estado para almacenar las especialidades
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito
  const [loading, setLoading] = useState(true); // Estado para la carga de datos
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Efecto para cargar los datos del servicio y las especialidades
  useEffect(() => {
    const fetchServiceAndEspecialidades = async () => {
      try {
        const serviceResponse = await axios.get<Servicio>(`${API_BASE_URL}/servicio/${id}`);
        const especialidadesResponse = await axios.get<Especialidad[]>(`${API_BASE_URL}/specialties`);
        
        setFormData(serviceResponse.data); // Asignar los datos del servicio al estado
        setEspecialidades(especialidadesResponse.data); // Asignar las especialidades
      } catch (error) {
        console.error('Error al cargar los datos del servicio:', error);
        setError('Error al cargar los datos del servicio');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAndEspecialidades();
  }, [id]);

  // Manejador de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "codigo") {
      // Convertir a mayúsculas y aplicar la validación para el campo "codigo"
      const upperCaseValue = value.toUpperCase();
      if (validateCodigo(upperCaseValue) || upperCaseValue === '') {
        setFormData({
          ...formData,
          [name]: upperCaseValue,
        });
      } else {
        alert('El código solo debe contener letras y números, sin espacios al inicio o final.');
      }
    } else if (name === "nombre") {
      // Aplicar la validación para el campo "nombre" sin conversión a mayúsculas
      if (validateNombreServicio(value) || value === '') {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        alert('El nombre solo debe contener letras (con acentos), signos de puntuación y paréntesis, sin espacios al inicio y un solo espacio entre palabras.');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Enviar el formulario para actualizar el servicio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.especialidad_ID) {
      alert("Por favor, selecciona una especialidad válida.");
      return;
    }
  
    try {
      const formDataWithUpperCaseCode = {
        ...formData,
        codigo: formData.codigo.toUpperCase(), // Asegurarse de enviar "codigo" en mayúsculas
        usuario_ID: usuarioID,
      };
  
      await axios.patch(`${API_BASE_URL}/servicio/${id}`, formDataWithUpperCaseCode);
      setModalOpen(true); // Mostrar el modal de éxito
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
    }
  };
  


  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/servicios'); // Redirigir a la lista de servicios después de cerrar el modal
  };

  const handleCancel = () => {
    navigate('/servicios'); // Redirigir a la lista de servicios si se cancela
  };

  if (loading) return <p>Cargando datos del servicio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Servicio</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Código del Servicio</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Nombre del Servicio</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Select para la Especialidad */}
        <div>
          <label className="block text-gray-700">Especialidad</label>
          <select
            name="especialidad_ID"
            value={formData.especialidad_ID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.nombre}
              </option>
            ))}
          </select>
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
        message="El servicio ha sido actualizado exitosamente."
      />
    </div>
  );
};

export default EditService;



