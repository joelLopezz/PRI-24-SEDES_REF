import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from '../../Context/AuthContext';

import { validateNombre, validateTelefono, validateNoStartingSpace } from '../../Components/validations/Validations';
interface RedCordinacion {
  red_ID: number;
  nombre: string;
  numeracion: string;
}
interface Municipio {
  municipio_ID: number;
  nombre: string;
}
const EstablecimientoRegister: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const { usuarioID } = useAuth(); // Obtén el usuarioID del contexto
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    nivel: '',
    telefono: '',
    latitud: -17.3935,
    longitud: -66.1570,
    red_cordinacion_red_ID: '',
    rues: '',
    municipio: '', // Almacena el nombre del municipio
    municipio_ID: '', // Aquí se guarda el ID del municipio
  });
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [redCordinaciones, setRedCordinaciones] = useState<RedCordinacion[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [error, setError] = useState<string | null>(null);

  const niveles = ['Primer Nivel', 'Segundo Nivel', 'Tercer Nivel'];

  useEffect(() => {
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

    fetchRedesCordinacion();
    fetchMunicipios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nombre':
        if (validateNombre(value) || value === '') {
          setFormData({ ...formData, nombre: value });
          setError(null);
        } else {
          setError('El nombre del establecimiento no es válido.');
        }
        break;
      
      case 'telefono':
          if (validateTelefono(value) || value === '') {
            setFormData({ ...formData, telefono: value });
            setError(null);
          } else {
            setError('El teléfono solo debe contener números y no puede comenzar con un espacio.');
          }
        break;
      
      case 'rues':
        if (validateNoStartingSpace(value) || value === '') {
          setFormData({ ...formData, rues: value });
          setError(null);
        } else {
          setError('El campo RUES no debe comenzar con un espacio.');
        }
        break;

      case 'municipio':
        if (validateNoStartingSpace(value) || value === '') {
          setFormData({ ...formData, municipio: value });
          setError(null);
        } else {
          setError('El campo Municipio no debe comenzar con un espacio.');
        }
        break;

      default:
        setFormData({ ...formData, [name]: value });
        setError(null);
        break;
    }
  };

  const handleMunicipioBlur = () => {
    const selectedMunicipio = municipios.find(
      (municipio) => municipio.nombre.toLowerCase() === formData.municipio.toLowerCase()
    );

    if (selectedMunicipio) {
      setFormData({
        ...formData,
        municipio: selectedMunicipio.nombre,
        municipio_ID: selectedMunicipio.municipio_ID.toString(),
      });
      setError(null);
    } else {
      setFormData({ ...formData, municipio_ID: '' });
      setError('Por favor selecciona un municipio válido de la lista.');
    }
  };

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

  const customMarker = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.municipio_ID) {
      setError('Por favor selecciona un municipio válido de la lista.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/establecimiento`, {
        ...formData,
        estado: 1,
        usuario_creacion: usuarioID,
      });
      setModalOpen(true);
    } catch (error) {
      console.error('Error al registrar el establecimiento:', error);
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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Registro de Establecimiento</h1>

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

        {/* Municipio con autocompletar */}
        <div>
          <label className="block text-gray-700">Municipio</label>
          <input
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            onBlur={handleMunicipioBlur}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            list="municipios"
            required
          />
          <datalist id="municipios">
            {municipios
              .filter((value, index, self) =>
                index === self.findIndex((t) => t.nombre === value.nombre)
              )
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((mun) => (
                <option key={mun.municipio_ID} value={mun.nombre} />
              ))}
          </datalist>
          {error && <div className="text-red-500">{error}</div>}
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

        {/* Botones para registrar o cancelar */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Registrar
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="El establecimiento ha sido registrado exitosamente."
      />
    </div>
  );
};

export default EstablecimientoRegister;
