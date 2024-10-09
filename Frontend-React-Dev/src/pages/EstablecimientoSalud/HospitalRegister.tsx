import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';// Importa el modal para servicios


const HospitalRegister: React.FC = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    provincia: '',
    telefono: '',
    rues: '',
    tipo: '',
    coordinadorRed: '', // Coordinador de red
    latitud: -17.3935, // Coordenada inicial (ejemplo)
    longitud: -66.1570, // Coordenada inicial (ejemplo)
  });

  const municipiosEjemplo = ['Cercado', 'Quillacollo', 'Sacaba', 'Tiquipaya', 'Vinto']; // Ejemplos de provincias
  const coordinadoresRed = ['Primero', 'Segundo', 'Tercero']; // Opciones para el Coordinador de red

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    navigate('/hospitales'); // Navegar de regreso a la lista de hospitales
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

  return (
    <div className="p-6">
      {/* Título de la página */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Registro de Hospital</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre de Hospital</label>
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
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Municipalidad</label>
          <select
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione el municipio</option>
            {municipiosEjemplo.map((municipio) => (
              <option key={municipio} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>
        </div>

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
        <div>
          <label className="block text-gray-700">RUES</label>
          <input
            type="text"
            name="rues"
            value={formData.rues}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        
        {/* Select para Coordinador de Red */}
        <div>
          <label className="block text-gray-700">Coordinador de Red</label>
          <select
            name="coordinadorRed"
            value={formData.coordinadorRed}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione el Coordinador de Red</option>
            {coordinadoresRed.map((coordinador) => (
              <option key={coordinador} value={coordinador}>
                {coordinador}
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
              <Marker
                position={[formData.latitud, formData.longitud]}
                icon={customMarker}
              />
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
    </div>
  );
};

export default HospitalRegister;
