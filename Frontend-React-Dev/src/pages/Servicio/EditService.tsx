import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito

// Definir la interfaz para el tipo
interface Tipo {
  tipo_ID: number;
  nombre: string;
}

// Definir la interfaz para el servicio
interface Servicio {
  servicio_ID: number;
  nombre: string;
  descripcion: string;
  costo: number | null;
  tipo_tipo_ID: number; // Relación con el tipo
}

const EditService: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del servicio desde la URL
  const navigate = useNavigate();

  // Estados para el formulario y los datos relacionados
  const [formData, setFormData] = useState<Servicio>({
    servicio_ID: 0,
    nombre: '',
    descripcion: '',
    costo: null,
    tipo_tipo_ID: 0, // ID del tipo seleccionado
  });

  const [tipos, setTipos] = useState<Tipo[]>([]); // Estado para almacenar los tipos
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito
  const [loading, setLoading] = useState(true); // Estado para la carga de datos
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Efecto para cargar los datos del servicio y los tipos
  useEffect(() => {
    const fetchService = async () => {
      try {
        // Tipamos las respuestas de Axios explícitamente
        const serviceResponse = await axios.get<Servicio>(`http://localhost:3000/servicio/${id}`); // Tipamos la respuesta como Servicio
        const tiposResponse = await axios.get<Tipo[]>('http://localhost:3000/tipo/activos'); // Tipamos la respuesta como un array de Tipo
  
        setFormData(serviceResponse.data); // Asignar los datos del servicio al estado
        setTipos(tiposResponse.data); // Asignar los tipos
      } catch (error) {
        console.error('Error al cargar los datos del servicio:', error);
        setError('Error al cargar los datos del servicio');
      } finally {
        setLoading(false);
      }
    };
  
    fetchService();
  }, [id]);
  

  // Manejador de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario para actualizar el servicio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/servicio/${id}`, formData);
      setModalOpen(true); // Mostrar el modal de éxito después de actualizar
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

        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Costo</label>
          <input
            type="number"
            name="costo"
            value={formData.costo ?? ''} // Mostrar el costo o una cadena vacía
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            step="0.01" // Permitir decimales
            min="0"
          />
        </div>

        {/* Select para el Tipo */}
        <div>
          <label className="block text-gray-700">Tipo</label>
          <select
            name="tipo_tipo_ID"
            value={formData.tipo_tipo_ID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecciona un tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo.tipo_ID} value={tipo.tipo_ID}>
                {tipo.nombre}
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
