import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal'; // Importar el modal

const HospitalList: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null); // Guardar el registro seleccionado
  
    const handleDeleteClick = (hospitalName: string) => {
      setSelectedHospital(hospitalName);
      setModalOpen(true); // Abrir el modal
    };
  
    const handleConfirmDelete = () => {
      console.log(`Eliminando hospital: ${selectedHospital}`);
      // Aquí puedes agregar la lógica para eliminar el registro del hospital
      setModalOpen(false);
    };
  


  return (
    <div className="p-6">
      {/* Título de la página */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Lista de Hospitales</h1>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => navigate('/hospitales/registrar')}>
          Crear Nuevo
        </button>
      </div>

      {/* Tabla de ejemplo */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Dirección</th>
              <th className="py-2 px-4 border-b">Provincia</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Latitud</th>
              <th className="py-2 px-4 border-b">Longitud</th>
              <th className="py-2 px-4 border-b">Servicios</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila de ejemplo */}
            <tr className="text-gray-700">
              <td className="py-2 px-4 border-b">Hospital Central</td>
              <td className="py-2 px-4 border-b">Av. Siempre Viva 123</td>
              <td className="py-2 px-4 border-b">Cercado</td>
              <td className="py-2 px-4 border-b">+591 12345678</td>
              <td className="py-2 px-4 border-b">General</td>
              <td className="py-2 px-4 border-b">-17.3935</td>
              <td className="py-2 px-4 border-b">-66.1570</td>
              <td className="py-2 px-4 border-b">Cardiología, Pediatría</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-600 mb-2 mr-2"
                onClick={() => navigate(`/hospitales/editar/${1}`)}> {/*ejemplo de ID que debe pasarse*/}
                  Editar
                </button>
                <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteClick('Hospital Central')}>
                  Eliminar
                </button>
              </td>
            </tr>
            {/* Más filas de ejemplo pueden añadirse aquí */}
          </tbody>
        </table>
      </div>
         {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`¿Está seguro de eliminar el registro "${selectedHospital}"?`}
      />



    </div>
  );
};

export default HospitalList;
