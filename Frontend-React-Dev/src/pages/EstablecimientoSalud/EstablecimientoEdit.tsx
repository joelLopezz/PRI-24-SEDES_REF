import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importar estilos de Leaflet
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal'; // Importar el modal de éxito
import { validateNombre, validateTelefono, validateNoStartingSpace } from '../../Components/validations/Validations';
import { useAuth } from '../../Context/AuthContext';



// Definir la interfaz para RedCordinacion y Municipio
interface RedCordinacion {
  red_ID: number;
  nombre: string;
  numeracion: string;
}
interface Municipio {
  municipio_ID: number;
  nombre: string;
}

interface Establecimiento {
  nombre: string;
  nivel: string;
  telefono: string;
  latitud: number;
  longitud: number;
  red_cordinacion_red_ID: number;
  municipio_ID: number;
  rues: string;
}

const EstablecimientoEdit: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { usuarioID } = useAuth(); // Obtén el usuarioID del contexto
  const { id } = useParams<{ id: string }>(); // Obtener el ID desde los parámetros de la URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Establecimiento>({
    nombre: '',
    nivel: '',
    telefono: '',
    latitud: -17.3935,
    longitud: -66.1570,
    red_cordinacion_red_ID: 0,
    municipio_ID: 0,
    rues: '',
  });

  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal de éxito
  const [redCordinaciones, setRedCordinaciones] = useState<RedCordinacion[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const niveles = ['Primer Nivel', 'Segundo Nivel', 'Tercer Nivel'];
  useEffect(() => {
    const fetchEstablecimiento = async () => {
      try {
        const response = await axios.get<Establecimiento>(`${API_BASE_URL}/establecimiento/${id}`);
        setFormData({
          ...response.data,
          red_cordinacion_red_ID: response.data.red_cordinacion_red_ID,
          municipio_ID: response.data.municipio_ID,
        });

      } catch (error) {
        console.error('Error al cargar el establecimiento:', error);
      }
    };

    const fetchRedesCordinacion = async () => {
      try {
        const response = await axios.get<RedCordinacion[]>(`${API_BASE_URL}/red-cordinacion`);
        setRedCordinaciones(response.data);
      } catch (error) {
        console.error('Error al cargar las redes de coordinación:', error);
      }
    };
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get<Municipio[]>(`${API_BASE_URL}/municipio`);
        setMunicipios(response.data);
      } catch (error) {
        console.error('Error al cargar los municipios:', error);
      }
    };

    fetchEstablecimiento();
    fetchRedesCordinacion();
    fetchMunicipios();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    switch (name) {
      case 'nombre':
        if (validateNombre(value) || value === '') {
          setFormData({ ...formData, nombre: value });
        } else {
          alert('El nombre no debe comenzar con un espacio ni contener múltiples espacios consecutivos.');
        }
        break;
  
      case 'telefono':
        if (validateTelefono(value) || value === '') {
          setFormData({ ...formData, telefono: value });
        } else {
          alert('El teléfono solo debe contener números y no debe comenzar con un espacio.');
        }
        break;
  
      case 'rues':
        if (validateNoStartingSpace(value) || value === '') {
          setFormData({ ...formData, rues: value });
        } else {
          alert('El campo RUES no debe comenzar con un espacio.');
        }
        break;
  
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  };
  

  const handleMunicipioSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const municipioID = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      municipio_ID: municipioID,
    }));
  };

  const handleRedCordinacionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const redID = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      red_cordinacion_red_ID: redID,
    }));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(event: LeafletMouseEvent) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          latitud: event.latlng.lat,
          longitud: event.latlng.lng,
        }));
      },
    });
    return null;
  };

  const customMarker = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Verificar que estamos enviando solo los IDs necesarios y los campos actualizados
      const updatedData = {
        nombre: formData.nombre,
        nivel: formData.nivel,
        telefono: formData.telefono,
        latitud: formData.latitud,
        longitud: formData.longitud,
        red_cordinacion_red_ID: formData.red_cordinacion_red_ID,
        municipio_ID: formData.municipio_ID,
        rues: formData.rues,
        usuario_modificacion: usuarioID, // Temporalmente asignamos el ID del usuario 1
      };

      console.log("Datos enviados para la actualización:", updatedData);

      await axios.patch(`${API_BASE_URL}/establecimiento/${id}`, updatedData);
      setModalOpen(true);
    } catch (error) {
      console.error('Error al actualizar el establecimiento:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/establecimientos');
  };

  const handleCancel = () => {
    navigate('/establecimientos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Establecimiento</h1>

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
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* RUES */}
        <div>
          <label className="block text-gray-700">RUES</label>
          <input
            type="text"
            name="rues"
            value={formData.rues}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Municipio */}
        <div>
          <label className="block text-gray-700">Municipio</label>
          <select
            name="municipio_ID"
            value={formData.municipio_ID}
            onChange={handleMunicipioSelect}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione el municipio</option>
            {municipios
              // Eliminar duplicados basados en el nombre
              .filter((value, index, self) =>
                index === self.findIndex((t) => t.nombre === value.nombre)
              )
              // Ordenar alfabéticamente por nombre
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((mun) => (
                <option key={mun.municipio_ID} value={mun.municipio_ID}>
                  {mun.nombre}
                </option>
              ))}
          </select>
        </div>



        {/* Red de Coordinación */}
        <div>
          <label className="block text-gray-700">Red de Coordinación</label>
          <select
            name="red_cordinacion_red_ID"
            value={formData.red_cordinacion_red_ID}
            onChange={handleRedCordinacionSelect}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione la Red de Coordinación</option>
            {redCordinaciones.map((red) => (
              <option key={red.red_ID} value={red.red_ID}>
                {red.nombre} - {red.numeracion}

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
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="El establecimiento ha sido actualizado exitosamente."
      />
    </div>
  );
};

export default EstablecimientoEdit;
