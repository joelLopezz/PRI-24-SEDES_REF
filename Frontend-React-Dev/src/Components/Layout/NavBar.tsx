/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logoSedes-removebg-preview.png';
import userIcon from '../../assets/Images/userInfo.png'; // Asegúrate de importar el icono del usuario
import { useAuth } from '../../Context/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { usuarioID } = useAuth(); 
  const [userFullName, setUserFullName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controla el menú desplegable
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setUserFullName(`${user.nombres} ${user.primer_apellido}`);
      setUserRole(user.rol);
      setHospitalId(user.establecimiento_id);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-400 shadow-md p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="text-white focus:outline-none transform transition-transform hover:rotate-180 duration-500 ease-in-out"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <img
            src={logo}
            alt="App Logo"
            className="h-12 ml-4 hover:scale-110 transition-transform duration-300 ease-in-out transform shadow-lg"
          />
        </div>

        {/* Icono y menú desplegable de usuario */}
        <div className="relative ml-auto">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <img
              src={userIcon}
              alt="User Icon"
              className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <span className="ml-2 text-white font-bold">User Info</span>
          </button>

          {/* Menú desplegable */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-gray-700">
                <strong>Nombre:</strong> {userFullName}
              </div>
              <div className="px-4 py-2 text-gray-700">
                <strong>Rol:</strong> {userRole}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
