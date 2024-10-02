import React, { useState } from 'react';

interface EspecialidadesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (especialidades: string[]) => void;
}

const EspecialidadesModal: React.FC<EspecialidadesModalProps> = ({ isOpen, onClose, onSelect }) => {
  const especialidadesEjemplo = [
    'Psiquiatría',
    'Oncología',
    'Pediatría',
    'Endocrinología',
    'Geriatría',
    'Cardiología',
    'Dermatología',
  ];

  // Estado para almacenar las especialidades seleccionadas
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  const handleCheckboxChange = (especialidad: string) => {
    if (seleccionadas.includes(especialidad)) {
      // Si ya está seleccionada, quitarla
      setSeleccionadas(seleccionadas.filter((item) => item !== especialidad));
    } else {
      // Si no está seleccionada, agregarla
      setSeleccionadas([...seleccionadas, especialidad]);
    }
  };

  const handleGuardar = () => {
    // Enviar las especialidades seleccionadas al componente padre
    onSelect(seleccionadas);
    onClose(); // Cerrar el modal
  };

  if (!isOpen) return null; // Si no está abierto, no mostrar nada

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" style={{ zIndex: 50 }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Seleccionar Especialidades</h2>

        <div className="space-y-2">
          {especialidadesEjemplo.map((especialidad) => (
            <label key={especialidad} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={seleccionadas.includes(especialidad)}
                onChange={() => handleCheckboxChange(especialidad)}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-3 mr-3 text-gray-700">{especialidad}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar Selección
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EspecialidadesModal;
