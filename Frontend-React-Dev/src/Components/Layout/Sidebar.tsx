import React, { useState } from 'react';
import { FaHospital, FaChevronDown, FaChevronUp, FaListAlt } from 'react-icons/fa'; // Agregamos el icono para especialidades
import { Link } from 'react-router-dom'; // Importar Link para navegación

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isHospitalOptionsOpen, setHospitalOptionsOpen] = useState(false); // Estado para manejar las subopciones de Hospital

  const toggleHospitalOptions = () => {
    setHospitalOptionsOpen(!isHospitalOptionsOpen);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out bg-blue-800 w-64`}
    >
      <div className="flex items-center justify-center h-16 bg-blue-900 text-white">
        <h1 className="text-lg font-bold">SEDES Referencias</h1>
      </div>
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <div className="flex items-center justify-between px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white cursor-pointer" onClick={toggleHospitalOptions}>
              <div className="flex items-center space-x-2">
                <FaHospital className="text-white" />
                <span>Hospitales</span>
              </div>
              <div>
                {isHospitalOptionsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* Subopciones de Hospitales */}
            {isHospitalOptionsOpen && (
              <ul className="ml-8 space-y-1">
                <li>
                  <Link to="/hospitales" className="block px-4 py-1 text-gray-200 hover:bg-blue-600 hover:text-white">
                    Lista de Hospitales
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Opción para Especialidades */}
          <li>
            <Link to="/especialidades" className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white">
              <div className="flex items-center space-x-2">
                <FaListAlt className="text-white" />
                <span>Especialidades</span>
              </div>
            </Link>
          </li>

          {/* Opción para Servicios */}
          <li>
            <Link to="/servicios" className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white">
              <div className="flex items-center space-x-2">
                <FaListAlt className="text-white" />
                <span>Servicios</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
