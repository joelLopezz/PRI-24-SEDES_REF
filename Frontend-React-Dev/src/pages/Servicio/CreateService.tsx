import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importamos el modal de éxito

// Definir la interfaz para el tipo
interface Tipo {
  tipo_ID: number;
  nombre: string;
}

const CreateService: React.FC = () => {
  const navigate = useNavigate();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    costo: '',
    tipo_tipo_ID: '', // Aquí almacenamos el ID del tipo seleccionado
  });

  // Estado para almacenar los tipos
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito

  // Efecto para cargar los tipos desde el backend
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.get<Tipo[]>('http://localhost:3000/tipo/activos'); // Tipamos la respuesta de Axios como Tipo[]
        setTipos(response.data); // Ahora TypeScript sabrá que response.data es de tipo Tipo[]
      } catch (error) {
        console.error('Error al obtener los tipos:', error);
      }
    };
  
    fetchTipos();
  }, []);
  

  // Manejador para los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificar que se haya seleccionado un tipo válido
    if (!formData.tipo_tipo_ID || formData.tipo_tipo_ID === "") {
      alert("Por favor, selecciona un tipo válido.");
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
            value={formData.costo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            step="0.01" // Permite decimales
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
