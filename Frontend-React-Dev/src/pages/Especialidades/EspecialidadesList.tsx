import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos para editar y eliminar

interface Especialidad {
  id: number;
  name: string;
  description: string;
}

const EspecialidadesList: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Efecto para obtener las especialidades al montar el componente
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await fetch('http://localhost:3000/specialties');
        if (!response.ok) {
          throw new Error('Error al obtener las especialidades');
        }
        const data: Especialidad[] = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error(error); // Usar la variable 'error' para depuración
        setError('Error al cargar las especialidades');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEspecialidades();
  }, []);
  
  const handleCreate = () => {
    navigate('/especialidades/crear');
  };

  const handleDelete = (id: number) => {
    const nuevasEspecialidades = especialidades.filter((especialidad) => especialidad.id !== id);
    setEspecialidades(nuevasEspecialidades);
    // Aquí puedes añadir la lógica para hacer un DELETE al backend
  };

  const handleEdit = (id: number) => {
    // Aquí agregarías la lógica para editar una especialidad
    alert(`Editar especialidad con ID: ${id}`);
  };

  if (loading) return <p>Cargando especialidades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Especialidades</h1>

       {/* Botón para agregar una nueva especialidad */}
       <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Nueva Especialidad
        </button>
      </div>

      {/* Tabla de especialidades */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-blue-800 text-white">
            {/* Ocultar la columna ID */}
            {/* <th className="py-2 px-4 text-left">ID</th> */}
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad) => (
            <tr key={especialidad.id} className="border-t">
              {/* Ocultar la celda de ID */}
              {/* <td className="py-2 px-4">{especialidad.id}</td> */}
              <td className="py-2 px-4">{especialidad.name}</td>
              <td className="py-2 px-4">{especialidad.description || 'Sin descripción'}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(especialidad.id)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(especialidad.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EspecialidadesList;
