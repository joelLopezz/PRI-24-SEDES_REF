import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessModal from '../../Components/SuccessModal';
import validations from '../../utils/validation'; // Importamos las validaciones

const RedCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    numeracion: '',
  });

  const [errors, setErrors] = useState<{ nombre?: string; numeracion?: string }>({});
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar el modal de éxito

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = validations.removeLeadingSpaces(value); // Elimina espacios al inicio

    if (name === 'nombre') {
      if (validations.isAlphabetic(updatedValue)) {
        setFormData({ ...formData, nombre: updatedValue });
        setErrors({ ...errors, nombre: '' }); // Sin errores
      } else {
        setErrors({ ...errors, nombre: 'El nombre solo debe contener letras.' });
      }
    } else if (name === 'numeracion') {
      if (validations.isRomanNumeral(updatedValue)) {
        setFormData({ ...formData, numeracion: updatedValue });
        setErrors({ ...errors, numeracion: '' }); // Sin errores
      } else {
        setErrors({ ...errors, numeracion: 'La numeración debe estar en números romanos.' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar antes de enviar el formulario
    const nombreValid = validations.isAlphabetic(formData.nombre) && !validations.hasLeadingSpaces(formData.nombre);
    const numeracionValid = validations.isRomanNumeral(formData.numeracion) && !validations.hasLeadingSpaces(formData.numeracion);

    if (!nombreValid || !numeracionValid) {
      setErrors({
        nombre: !nombreValid ? 'El nombre solo debe contener letras y no puede comenzar con espacios.' : '',
        numeracion: !numeracionValid ? 'La numeración debe estar en números romanos y no puede comenzar con espacios.' : '',
      });
      return;
    }

    try {
      await axios.post('http://localhost:3000/red-cordinacion', {
        ...formData,
        estado: 1,
        usuario_creacion: 1, // Cambiar según el usuario actual
      });
      setModalOpen(true); // Abrir el modal de éxito
    } catch (error) {
      console.error('Error al crear la red de coordinación:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
    navigate('/red-coordinacion'); // Redirigir a la lista de redes de coordinación
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nueva Red de Coordinación</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Numeración</label>
          <input
            type="text"
            name="numeracion"
            value={formData.numeracion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.numeracion && <p className="text-red-500">{errors.numeracion}</p>}
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar
          </button>
          <button type="button" onClick={() => navigate('/red-coordinacion')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message="La red de coordinación ha sido creada exitosamente."
      />
    </div>
  );
};

export default RedCreate;
