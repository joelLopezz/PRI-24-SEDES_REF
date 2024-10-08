import React, { useState } from 'react';
import { useNavigate, /*useParams */} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

const HospitalEdit: React.FC = () => {
  const navigate = useNavigate();
  //const { id } = useParams(); // Suponemos que pasaremos el ID del hospital a editar como parámetro

  // Este estado simula la carga de datos del hospital seleccionado.
  const [formData, setFormData] = useState({
    nombre: 'Hospital Central', // Pre-cargado para este ejemplo
    direccion: 'Av. Siempre Viva 123', // Pre-cargado para este ejemplo
    provincia: 'Cercado',
    telefono: '+591 12345678',
    rues: '123456789', // Nuevo campo que incluiste
    tipo: 'General',
    servicios: ['Cardiología', 'Pediatría'], // Selección inicial de servicios
    latitud: -17.3935,
    longitud: -66.1570,
  });

  const provinciasEjemplo = ['Cercado', 'Quillacollo', 'Sacaba', 'Tiquipaya', 'Vinto'];
  const serviciosEjemplo = [
    'Cardiología',
    'Pediatría',
    'Ginecología',
    'Traumatología',
    'Neurología',
    'Odontología',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const { checked } = e.target;
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          servicios: [...prev.servicios, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          servicios: prev.servicios.filter((servicio) => servicio !== value),
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos editados a la base de datos o backend
    console.log(formData);
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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Hospital</h1>

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
          <label className="block text-gray-700">Provincia</label>
          <select
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione una provincia</option>
            {provinciasEjemplo.map((provincia) => (
              <option key={provincia} value={provincia}>
                {provincia}
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

        <div>
          <label className="block text-gray-700">Tipo de Hospital</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Seleccione el tipo</option>
            <option value="Primer Nivel">Primer Nivel</option>
            <option value="Segundo Nivel">Segundo Nivel</option>
            <option value="Tercer Nivel">Tercer Nivel</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Cartera de Servicios</label>
          <div className="grid grid-cols-2 gap-2">
            {serviciosEjemplo.map((servicio) => (
              <div key={servicio}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="servicios"
                    value={servicio}
                    checked={formData.servicios.includes(servicio)}
                    onChange={handleChange}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{servicio}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa de Mapbox */}
        {/* Mapa de Leaflet */}
        <div>
          <label className="block text-gray-700 mb-2">Ubicación en el mapa</label>
          <div className="mb-4 h-64 w-full border rounded">
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

        {/* Inputs para la latitud y longitud */}
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

        {/* Botones */}
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar Cambios
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalEdit;
