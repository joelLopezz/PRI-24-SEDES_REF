// src/pages/CambiarContrasenia.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar los íconos para mostrar/ocultar contraseña

const CambiarContrasenia: React.FC = () => {
  const { usuarioID } = useAuth(); // Obtener la información del usuario desde el contexto de autenticación
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseniaActual, setContraseniaActual] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/usuario/recuperar-contrasenia', {
        correoElectronico,
        contraseniaActual,
        nuevaContrasenia,
      });

      if (response.status === 200) {
        setSuccess('Contraseña actualizada exitosamente');
        setError('');
        // Redirigir al usuario a otra página, por ejemplo, al perfil
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

          
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Contraseña Actual</label>
            <input
              type="password"
              value={contraseniaActual}
              onChange={(e) => setContraseniaActual(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nueva Contraseña</label>
            <input
              type="password"
              value={nuevaContrasenia}
              onChange={(e) => setNuevaContrasenia(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div> 


          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarContrasenia;
