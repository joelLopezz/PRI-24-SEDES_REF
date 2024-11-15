import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; // Iconos de redes sociales
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación
import logo from '../../assets/Images/logotipo UMA/PNG/logo  UMA 2023 (BN negativo).png'; // Asegúrate de ajustar la ruta de la imagen correctamente

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo en el lado izquierdo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo SEDES" className="h-10 w-auto" />
        </div>

        {/* Sección de íconos sociales en el centro */}
        <div>
          <ul className="flex justify-center space-x-6">
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

        {/* Texto de copyright y enlace a créditos en el lado derecho */}
        <div className="text-center">
          <p className="text-gray-400 text-sm tracking-wider hover:text-gray-200 transition-colors duration-300">
            &copy; {new Date().getFullYear()} SEDES. Todos los derechos reservados.
          </p>
          <Link to="/credits" className="text-blue-500 hover:text-blue-400 transition-colors duration-300 text-sm">
            Créditos
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
