// src/pages/CambiarContrasenia.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const CambiarContrasenia: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { usuarioID } = useAuth();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseniaActual, setContraseniaActual] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showContraseniaActual, setShowContraseniaActual] = useState(false);
  const [showNuevaContrasenia, setShowNuevaContrasenia] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${API_BASE_URL}/usuario/recuperar-contrasenia`, {
        correoElectronico,
        contraseniaActual,
        nuevaContrasenia,
      });

      if (response.status === 200) {
        setSuccess('Contraseña actualizada exitosamente');
        setError('');
        setTimeout(() => navigate('/inicio'), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Hubo un error al actualizar la contraseña');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cambiar Contraseña</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          
          <div className="mb-4 relative">
            <label className="block text-sm font-bold mb-2">Contraseña Actual</label>
            <input
              //type="password"
              type={showContraseniaActual ? 'text' : 'password'}
              value={contraseniaActual}
              onChange={(e) => setContraseniaActual(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md pr-12"
              required
            />
             <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowContraseniaActual(!showContraseniaActual)}
            >
              {showContraseniaActual ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-bold mb-2">Nueva Contraseña</label>
            <input
              //type="password"
              type={showNuevaContrasenia ? 'text' : 'password'}
              value={nuevaContrasenia}
              onChange={(e) => setNuevaContrasenia(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md pr-12"
              required
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNuevaContrasenia(!showNuevaContrasenia)}
            >
              {showNuevaContrasenia ? <FaEyeSlash /> : <FaEye />}
            </span>
            
          </div> 


          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-gren-600 transition duration-300"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarContrasenia;
