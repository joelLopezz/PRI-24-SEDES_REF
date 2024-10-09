import React from 'react';
import { FaHospital, FaListAlt } from 'react-icons/fa'; // Agregamos el icono para especialidades
import { Link } from 'react-router-dom'; // Importar Link para navegación

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
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
          {/* Opción para Hospitales */}
          <li>
            <Link to="/establecimientos" className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white">
              <div className="flex items-center space-x-2">
                <FaHospital className="text-white" />
                <span>Hospitales</span>
              </div>
            </Link>
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
