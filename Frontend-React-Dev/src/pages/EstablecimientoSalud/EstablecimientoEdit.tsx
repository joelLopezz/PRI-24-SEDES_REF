import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importar estilos de Leaflet
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importar el modal de éxito
import { validateNombre } from '../../Components/validations/Validations'; // Importar la validación


// Definir la interfaz para RedCordinacion
interface RedCordinacion {
  red_ID: number;
  nombre: string;
  numeracion: string;
}

interface Establecimiento {
  nombre: string;
  nivel: string;
  telefono: string;
  latitud: number;
  longitud: number;
  red_cordinacion_red_ID: number;
}

const EstablecimientoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID desde los parámetros de la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Establecimiento>({
    nombre: '',
    nivel: '',
    telefono: '',
    latitud: -17.3935, // Coordenada inicial
    longitud: -66.1570, // Coordenada inicial
    red_cordinacion_red_ID: 0,
  });

  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito
  const [error, setError] = useState('');
  const [redCordinaciones, setRedCordinaciones] = useState<RedCordinacion[]>([]); // Estado para almacenar las redes de coordinación

  // Opciones para el select de niveles
  const niveles = ['Primer Nivel', 'Segundo Nivel', 'Tercer Nivel'];

  // Obtener los datos del establecimiento por su ID al cargar la página
  useEffect(() => {
    const fetchEstablecimiento = async () => {
      try {
        const response = await axios.get<Establecimiento>(`http://localhost:3000/establecimiento/${id}`);
        setFormData(response.data); // Asignar los datos del establecimiento al estado
      } catch (error) {
        console.error('Error al cargar el establecimiento:', error);
      }
    };

    const fetchRedesCordinacion = async () => {
      try {
        const response = await axios.get<RedCordinacion[]>('http://localhost:3000/red-cordinacion');
        setRedCordinaciones(response.data);
      } catch (error) {
        console.error('Error al cargar las redes de coordinación:', error);
      }
    };

    fetchEstablecimiento();
    fetchRedesCordinacion();
  }, [id]);

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      if (validateNombre(value) || value === '') {
        setFormData({ ...formData, [name]: value });
        setError(''); // Limpiar el error si la validación es exitosa
      } else {
        setError('El nombre del Establecimiento no es válido.');
      }
    } else {
     
      setFormData({ ...formData, [name]: value });
      setError('');
    }
  };

  // Función para manejar los eventos del mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(event: LeafletMouseEvent) {
        setFormData({
          ...formData,
          latitud: event.latlng.lat,
          longitud: event.latlng.lng,
        });
      },
    });
    return null;
  };

  // Personalizar el icono del marcador
  const customMarker = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Enviar los datos actualizados del establecimiento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/establecimiento/${id}`, {
        ...formData,
        usuario_modificacion: 1, // Temporalmente asignamos el ID del usuario 1
      });
      setModalOpen(true); // Abrir el modal de éxito
    } catch (error) {
      console.error('Error al actualizar el establecimiento:', error);
    }
  };

  // Cerrar el modal de éxito
  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/establecimientos'); // Redirigir a la lista de establecimientos
  };

  // Cancelar la operación
  const handleCancel = () => {
    navigate('/establecimientos'); // Redirigir a la lista si se cancela
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Establecimiento</h1>
      {/* {error && <div className="text-red-500 mb-4">{error}</div>} Mostrar error si existe */}


      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre de Establecimiento</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Nivel */}
        <div>
          <label className="block text-gray-700">Nivel</label>
          <select
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione el nivel</option>
            {niveles.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Select para Red de Coordinación */}
        <div>
          <label className="block text-gray-700">Red de Coordinación</label>
          <select
            name="red_cordinacion_red_ID"
            value={formData.red_cordinacion_red_ID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione la Red de Coordinación</option>
            {redCordinaciones.map((red) => (
              <option key={red.red_ID} value={red.red_ID}>
                {red.nombre} - <strong>{red.numeracion}</strong>
              </option>
            ))}
          </select>
        </div>

        {/* Mapa de Leaflet */}
        <div>
          <label className="block text-gray-700 mb-2">Ubicación en el mapa</label>
          <div className="mb-4 h-64 w-full border rounded relative" style={{ zIndex: 1 }}>
            <MapContainer
              center={[formData.latitud, formData.longitud]}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[formData.latitud, formData.longitud]} icon={customMarker} />
              <MapClickHandler />
            </MapContainer>
          </div>
        </div>

        {/* Inputs para mostrar la latitud y longitud */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Latitud</label>
            <input
              type="text"
              name="latitud"
              value={formData.latitud}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Longitud</label>
            <input
              type="text"
              name="longitud"
              value={formData.longitud}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Botones para actualizar o cancelar */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Actualizar
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="El establecimiento ha sido actualizado exitosamente."
      />
    </div>
  );
};

export default EstablecimientoEdit;
