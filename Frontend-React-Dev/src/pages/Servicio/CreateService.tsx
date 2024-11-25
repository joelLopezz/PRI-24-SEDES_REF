import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito
import { validateCodigo, validateNombreServicio } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext';
import axios, { AxiosError } from 'axios';


// Definir la interfaz para las especialidades
interface Especialidad {
  id: number;
  nombre: string;
}

const CreateService: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const navigate = useNavigate();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    codigo: '', // Código del servicio
    nombre: '', // Nombre del servicio
    especialidad_ID: '', // Aquí almacenamos el ID de la especialidad seleccionada
  });

  // Estado para almacenar las especialidades
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito

  // Efecto para cargar las especialidades desde el backend
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get<Especialidad[]>(`${API_BASE_URL}/specialties`); // Endpoints de especialidades
        setEspecialidades(response.data); // Ahora TypeScript sabrá que response.data es de tipo Especialidad[]
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
      }
    };

    fetchEspecialidades();
  }, []);

  // Manejador para los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "codigo") {
      // Convertir a mayúsculas y aplicar la validación
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
      // Convertir a mayúsculas y aplicar la validación para el campo "nombre"
      const upperCaseValue = value.toUpperCase();
      if (validateNombreServicio(upperCaseValue) || upperCaseValue === '') {
        setFormData({
          ...formData,
          [name]: upperCaseValue,
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

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.especialidad_ID || formData.especialidad_ID === "") {
      alert("Por favor, selecciona una especialidad válida.");
      return;
    }

    try {
      const formDataUpperCase = {
        ...formData,
        codigo: formData.codigo.toUpperCase(), // Convertir a mayúsculas
        nombre: formData.nombre.toUpperCase(), // Convertir a mayúsculas
        estado: 1,
        usuario_ID: usuarioID,
      };

      await axios.post(`${API_BASE_URL}/servicio`, formDataUpperCase);
      setModalOpen(true);
    } catch (error: unknown) {
      console.error('Error al crear el servicio:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string | string[] }>;
        const errorMessage =
          axiosError.response?.data?.message ||
          'Ocurrió un error al crear el servicio. Por favor, inténtalo de nuevo.';

        alert(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      } else {
        alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      }
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/servicios'); // Redirigir después de cerrar el modal
  };

  // Cancelar la operación
  const handleCancel = () => {
    navigate('/servicios'); // Redirigir a la lista si se cancela
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Crear Nuevo Servicio</h1>

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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Crear Servicio
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
        message="El servicio ha sido creado exitosamente."
      />
    </div>
  );
};

export default CreateService;
