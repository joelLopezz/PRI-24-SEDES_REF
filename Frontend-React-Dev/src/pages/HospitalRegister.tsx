import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9lbGxvcGV6eiIsImEiOiJjbTFpM2VmZjMwa21uMnFwcWJ4a3RmZDd2In0.lXyWl4TbArzXg31Qf1q6oA'; // Reemplaza con tu token de Mapbox

const HospitalRegister: React.FC = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    provincia: '',
    telefono: '',
    rues: '',
    tipo: '',
    servicios: [] as string[],
    latitud: -17.3935, // Coordenada inicial (ejemplo)
    longitud: -66.1570, // Coordenada inicial (ejemplo)
  });

  const provinciasEjemplo = ['Cercado', 'Quillacollo', 'Sacaba', 'Tiquipaya', 'Vinto']; // Ejemplos de provincias
  const serviciosEjemplo = [
    'Cardiología',
    'Pediatría',
    'Ginecología',
    'Traumatología',
    'Neurología',
    'Odontología',
  ]; // Ejemplos de servicios

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
    // Aquí agregarías la lógica para enviar los datos a la base de datos o backend
    console.log(formData);
  };

  const handleCancel = () => {
    navigate('/hospitales'); // Navegar de regreso a la lista de hospitales
  };

  // Maneja la actualización de latitud y longitud al mover el cursor en el mapa
  const handleMapClick = (event: mapboxgl.MapLayerMouseEvent) => {
    setFormData({
      ...formData,
      latitud: event.lngLat.lat,
      longitud: event.lngLat.lng,
    });
  };
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
                    onChange={handleChange}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{servicio}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
         {/* Sección para el mapa */}
         <div>
          <label className="block text-gray-700 mb-2">Ubicación en el mapa</label>
          <div className="mb-4 h-64 w-full border rounded">
            <Map
              initialViewState={{
                longitude: formData.longitud,
                latitude: formData.latitud,
                zoom: 12,
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleMapClick}
            >
              {/* Añadir marcador en la ubicación seleccionada */}
              <Marker longitude={formData.longitud} latitude={formData.latitud} color="red" />
              {/* Controles de navegación */}
              <NavigationControl position="top-left" />
            </Map>
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
    

        {/* Botones */}
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
