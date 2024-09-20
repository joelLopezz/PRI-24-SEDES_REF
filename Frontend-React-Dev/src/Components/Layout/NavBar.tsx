import React from 'react';
import logo from '../../assets/Images/logoSedes-removebg-preview.png';

interface NavbarProps {
  onToggleSidebar: () => void; // Recibe la función desde el Layout
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        {/* Botón para abrir/cerrar el sidebar */}
        <div className="flex items-center">
          <button onClick={onToggleSidebar} className="text-gray-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          {/* Logo a la derecha del botón de las tres líneas */}
          <img src={logo} alt="App Logo" className="h-8 ml-4" />
        </div>

        {/* Título o navegación extra en la parte derecha */}
        <div className="ml-auto text-xl font-bold">User Space</div>
      </div>
    </header>
  );
};


export default Navbar;
