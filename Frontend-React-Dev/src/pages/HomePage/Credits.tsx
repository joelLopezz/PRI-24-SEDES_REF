import React from 'react';
import universityLogo from '../../assets/Images/logos univalle/LOGO UNIVALLE-03.png';
import backgroundLogo from '../../assets/Images/logotipo UMA/JPG/Mesa de trabajo 1-100.jpg'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

const Credits: React.FC = () => {
    return (
      <div className="relative flex flex-col items-center justify-start min-h-screen pt-12 bg-gray-100 overflow-hidden">
        {/* Logo de fondo */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          style={{
            backgroundImage: `url(${backgroundLogo})`,
            backgroundSize: '70%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
          }}
        ></div>
  
        {/* Contenido principal */}
        <div className="relative z-10 text-center mt-16 space-y-6">
          {/* Logo y Título alineados horizontalmente */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img src={universityLogo} alt="Logo de la Universidad" className="h-32 w-auto opacity-90" />
            <h1 className="text-4xl font-bold text-gray-800">Créditos</h1>
          </div>
  
          {/* Equipo de Desarrollo */}
          <h2 className="text-2xl font-semibold text-gray-700">Equipo de Desarrollo</h2>
          <ul className="space-y-2 text-lg text-gray-600 font-medium">
            <li>Joel Lopez Ticlla</li>
            <li>Elsa Trigo Maldonado</li>
            <li>Angela Sanchez Leaño</li>
            <li>Rover Serrano Quiroz</li>
            <li>Jorge Varela Quiroz</li>
            <li>Laura Paz Navia</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Credits;
