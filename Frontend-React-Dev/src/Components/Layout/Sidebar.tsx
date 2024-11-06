import React from 'react';
import { Link } from 'react-router-dom';

// Importamos los iconos personalizados
import hospitalIcon from '../../assets/Images/hospital.png';
import especialidadesIcon from '../../assets/Images/especialista.png';
import serviciosIcon from '../../assets/Images/servicio.png';
import miHospitalIcon from '../../assets/Images/MyHospital.png';
import redIcon from '../../assets/Images/red.png'; // Importa el nuevo icono para Red Coordinación
import hospitalInfoIcon from '../../assets/Images/hospitalinfo.png'; 

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out bg-gradient-to-b from-blue-900 to-blue-800 shadow-lg w-64`}
    >
      <div className="flex items-center justify-center h-16 bg-blue-900 text-white shadow-md">
        <Link to="/" className="text-lg font-extrabold tracking-wider hover:text-blue-300 transition-colors duration-300">
          SEDES Referencias
        </Link>
      </div>
      <nav className="mt-5">
        <ul className="space-y-4">
          {/* Opción para Hospitales */}
          <li className="group">
            <Link
              to="/establecimientos"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={hospitalIcon} alt="Hospitales" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Hospitales</span>
              </div>
            </Link>
          </li>

          {/* Opción para Especialidades */}
          <li className="group">
            <Link
              to="/especialidades"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={especialidadesIcon} alt="Especialidades" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Especialidades</span>
              </div>
            </Link>
          </li>

          {/* Opción para Servicios */}
          <li className="group">
            <Link
              to="/servicios"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={serviciosIcon} alt="Servicios" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Servicios</span>
              </div>
            </Link>
          </li>
          {/* Nueva opción para Red Coordinación */}
          <li className="group">
            <Link
              to="/red-coordinacion"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={redIcon} alt="Red Coordinación" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Red Coordinación</span>
              </div>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/hospitales-info"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={hospitalInfoIcon} alt="Hospitales Info" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Hospitales Info</span>
              </div>
            </Link>
          </li>
          {/* Opción para Mi Hospital */}
          <li className="group">
            <Link
              to="/miHospital"
              className="block px-4 py-2 text-gray-200 group-hover:bg-blue-700 group-hover:text-white rounded-md transform transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            >
              <div className="flex items-center space-x-2">
                <img src={miHospitalIcon} alt="Mi Hospital" className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="group-hover:font-bold">Mi Hospital</span>
              </div>
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
