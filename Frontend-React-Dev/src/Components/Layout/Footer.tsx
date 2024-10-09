import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; // Iconos de redes sociales

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3">
      <div className="container mx-auto text-center">
        {/* Sección de íconos sociales */}
        <div className="mb-4">
          <ul className="flex justify-center space-x-6">
            {/* Iconos de redes sociales con efectos hover */}
            <li>
              <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                <FaFacebookF className="w-6 h-6 hover:scale-125 transition-transform duration-300" />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                <FaTwitter className="w-6 h-6 hover:scale-125 transition-transform duration-300" />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                <FaLinkedinIn className="w-6 h-6 hover:scale-125 transition-transform duration-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* Texto del copyright */}
        <p className="text-gray-400 text-sm tracking-wider hover:text-gray-200 transition-colors duration-300">
          &copy; {new Date().getFullYear()} SEDES. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
