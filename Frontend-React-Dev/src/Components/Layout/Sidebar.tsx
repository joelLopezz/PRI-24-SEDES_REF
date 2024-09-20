import React from 'react';

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
          <li>
            <a href="/dashboard" className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white">
              Hospitales
            </a>
          </li>
          <li>
            <a href="/profile" className="block px-4 py-2 text-gray-200 hover:bg-blue-700 hover:text-white">
              Perfiles
            </a>
          </li>
          {/* Más enlaces */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
