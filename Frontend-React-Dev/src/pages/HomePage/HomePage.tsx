import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Hospital {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
}

// Personalizar el icono del marcador
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HomePage: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>(`${API_BASE_URL}/establecimiento`);
        setHospitals(response.data);
      } catch (error) {
        console.error('Error al cargar los hospitales:', error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Mapa de Hospitales</h1>
      
      <MapContainer center={[-17.3935, -66.1570]} zoom={12} style={{ height: '600px', width: '100%' }} overflow-hidden className='mt-24'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitud, hospital.longitud]}
            icon={hospitalIcon}
          >
            <Popup>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{hospital.nombre}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HomePage;
