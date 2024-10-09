import React from 'react';
import logo from '../../assets/Images/logoSedes-removebg-preview.png';

interface NavbarProps {
  onToggleSidebar: () => void; // Recibe la función desde el Layout
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-400 shadow-md p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Botón para abrir/cerrar el sidebar */}
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

          {/* Logo a la derecha del botón de las tres líneas */}
          <img
            src={logo}
            alt="App Logo"
            className="h-12 ml-4 hover:scale-110 transition-transform duration-300 ease-in-out transform shadow-lg"
          />
        </div>

        {/* Título o navegación extra en la parte derecha */}
        <div className="ml-auto text-2xl font-extrabold text-white tracking-wide hover:text-blue-200 transition-colors duration-300">
          User Space
        </div>
      </div>
    </header>
  );
};

export default Navbar;
