import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito
import { validateNombreServicio, validateCodigoServicio } from '../../Components/validations/Validations'; // Importar la validación


// Definir la interfaz para las especialidades
interface Especialidad {
  id: number;
  nombre: string;
}

const CreateService: React.FC = () => {
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
  const [error, setError] = useState('');
  // Efecto para cargar las especialidades desde el backend
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get<Especialidad[]>('http://localhost:3000/specialties'); // Endpoints de especialidades
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
  
    // Permitir que la validación pase si el valor es una cadena vacía
    if (name === "codigo") {
      // Permitir la entrada de cadenas vacías para poder borrar el texto
      if (validateCodigoServicio(value) || value === '') {
        setFormData({ ...formData, [name]: value });
        setError('');
      } else {
        setError('El código del Servicio no puede contener espacios.');
      }
    } else if (name === "nombre") {
      if (validateNombreServicio(value) || value === '') {
        setFormData({ ...formData, [name]: value });
        setError('');
      } else {
        setError('El nombre del Servicio no es válido.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
      setError('');
    }
  };
  

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que se haya seleccionado una especialidad válida
    if (!formData.especialidad_ID || formData.especialidad_ID === "") {
      alert("Por favor, selecciona una especialidad válida.");
      return;
    }

    try {
      // Enviar la solicitud POST
      await axios.post('http://localhost:3000/servicio', { ...formData, estado: 1 });
      setModalOpen(true); // Abrimos el modal de éxito al completar la creación
    } catch (error) {
      console.error('Error al crear el servicio:', error);
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
