import React, { useState } from 'react';

interface Horario {
  startTime: string;
  endTime: string;
}

interface Servicio {
  unidad: string;
  responsable: string;
  codigo: string;
  servicio: string;
  horarios: Horario[];  // Array de horarios
  requerimientos: {
    equipamiento: boolean;
    medicamentos: boolean;
    insumos: boolean;
  };
}

interface ServiciosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (servicios: Servicio[]) => void;
}

const ServiciosModal: React.FC<ServiciosModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [servicios, setServicios] = useState<Servicio[]>([
    {
      unidad: '',
      responsable: '',
      codigo: '',
      servicio: '',
      horarios: [{ startTime: '', endTime: '' }],  // Al menos un horario
      requerimientos: { equipamiento: false, medicamentos: false, insumos: false },
    },
  ]);

  // Manejar el cambio de los campos del formulario
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newServicios = [...servicios];
    newServicios[index] = { ...newServicios[index], [name]: value };
    setServicios(newServicios);
  };

  // Manejar el cambio de los horarios
  const handleHorarioChange = (servicioIndex: number, horarioIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newServicios = [...servicios];
    newServicios[servicioIndex].horarios[horarioIndex] = {
      ...newServicios[servicioIndex].horarios[horarioIndex],
      [name]: value,
    };
    setServicios(newServicios);
  };

  // Manejar el cambio de los requerimientos
const handleRequerimientosChange = (index: number, name: string, value: boolean) => {
  const newServicios = [...servicios];
  newServicios[index].requerimientos = { ...newServicios[index].requerimientos, [name]: value };
  setServicios(newServicios);
};

  // Agregar un nuevo servicio
  const agregarServicio = () => {
    setServicios([
      ...servicios,
      {
        unidad: '',
        responsable: '',
        codigo: '',
        servicio: '',
        horarios: [{ startTime: '', endTime: '' }],  // Inicialmente con un solo horario
        requerimientos: { equipamiento: false, medicamentos: false, insumos: false },
      },
    ]);
  };

  // Agregar un nuevo horario a un servicio específico
  const agregarHorario = (index: number) => {
    const newServicios = [...servicios];
    newServicios[index].horarios.push({ startTime: '', endTime: '' });
    setServicios(newServicios);
  };

  // Remover un horario de un servicio específico
  const eliminarHorario = (servicioIndex: number, horarioIndex: number) => {
    const newServicios = [...servicios];
    newServicios[servicioIndex].horarios.splice(horarioIndex, 1);
    setServicios(newServicios);
  };

  // Guardar los servicios seleccionados
  const handleGuardar = () => {
    onSelect(servicios); // Enviar los servicios seleccionados al componente padre
    onClose(); // Cerrar el modal
  };

  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" style={{ zIndex: 50 }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cartera de Servicios</h2>

        <form>
          <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2">
            {servicios.map((servicio, servicioIndex) => (
              <div key={servicioIndex} className="mb-6 border-b pb-4">
                <label className="block text-gray-700 font-extrabold">NUEVO SERVICIO</label>

                {/* Campos generales de Servicio */}
                <div className="mb-4">
                  <label className="block text-gray-700">Unidad o Servicio</label>
                  <input
                    type="text"
                    name="unidad"
                    value={servicio.unidad}
                    onChange={(e) => handleChange(servicioIndex, e)}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Responsable del Servicio</label>
                  <input
                    type="text"
                    name="responsable"
                    value={servicio.responsable}
                    onChange={(e) => handleChange(servicioIndex, e)}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700">No. Código</label>
                    <input
                      type="text"
                      name="codigo"
                      value={servicio.codigo}
                      onChange={(e) => handleChange(servicioIndex, e)}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Servicio</label>
                    <input
                      type="text"
                      name="servicio"
                      value={servicio.servicio}
                      onChange={(e) => handleChange(servicioIndex, e)}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                {/* Horarios dinámicos */}
                <label className="block text-gray-700">Horarios</label>
                {servicio.horarios.map((horario, horarioIndex) => (
                  <div key={horarioIndex} className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-gray-700">Hora de Inicio</label>
                      <input
                        type="time"
                        name="startTime"
                        value={horario.startTime}
                        onChange={(e) => handleHorarioChange(servicioIndex, horarioIndex, e)}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Hora de Fin</label>
                      <input
                        type="time"
                        name="endTime"
                        value={horario.endTime}
                        onChange={(e) => handleHorarioChange(servicioIndex, horarioIndex, e)}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>

                    {/* Botón para eliminar horario */}
                    <button
                      type="button"
                      onClick={() => eliminarHorario(servicioIndex, horarioIndex)}
                      className="text-red-500 hover:underline"
                    >
                      Eliminar horario
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => agregarHorario(servicioIndex)}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Agregar Horario
                </button>

                {/* Requerimientos */}
                <div className="mb-4 mt-4">
                  <label className="block text-gray-700">Requerimientos</label>
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={servicio.requerimientos.equipamiento}
                        onChange={() => handleRequerimientosChange(servicioIndex, 'equipamiento', !servicio.requerimientos.equipamiento)}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="ml-3 mr-2">Equipamiento Instrumental</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={servicio.requerimientos.medicamentos}
                        onChange={() => handleRequerimientosChange(servicioIndex, 'medicamentos', !servicio.requerimientos.medicamentos)}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="ml-3 mr-2">Medicamentos Reactivos</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={servicio.requerimientos.insumos}
                        onChange={() => handleRequerimientosChange(servicioIndex, 'insumos', !servicio.requerimientos.insumos)}
                        className="form-checkbox text-blue-500"
                      />
                      <span className="ml-3 mr-2">Insumos</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={agregarServicio}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Servicio
          </button>
        </form>

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

export default ServiciosModal;
