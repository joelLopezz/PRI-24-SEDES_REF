/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login: React.FC = () => {
  const { setRole, setUsuarioID, setEstablecimientoID, setIsAuthenticated } = useAuth();
  const [focusInput, setFocusInput] = useState({ username: false, password: false });
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFocus = (input: 'username' | 'password') => {
    setFocusInput({ ...focusInput, [input]: true });
  };

  const handleBlur = (input: 'username' | 'password') => {
    setFocusInput({ ...focusInput, [input]: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const loginData = {
      nombre_usuario: formData.username,
      contrasenia: formData.password,
    };

    fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en las credenciales');
        }
        return response.json();
      })
      .then(data => {
        // Guarda los datos en localStorage
        const userData = {
          usuario_ID: data.data.usuario_ID,
          nombre_usuario: data.data.nombre_usuario,
          rol: data.data.rol,
          establecimiento_id: data.data.establecimiento_id,
          nombres: data.data.nombres,
          primer_apellido: data.data.primer_apellido,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Actualiza el contexto para reflejar los cambios inmediatamente
        setRole(data.data.rol);
        setUsuarioID(data.data.usuario_ID);
        setEstablecimientoID(data.data.establecimiento_id);
        setIsAuthenticated(true); // <--- Añade esta línea

        setSuccessMessage('Inicio de sesión exitoso');
        setTimeout(() => {
          navigate('/inicio');
        }, 1500);
      })
      .catch(error => {
        setErrorMessage('Usuario o contraseña incorrectos');
      });
  };

  return (
    <div className="login-page">
      <div className="container_login">
        <div className="img">
          <img src="src/assets/Images/Medico.svg" alt="background illustration" />
        </div>
        <div className="login_content">
          <form onSubmit={handleSubmit}>
            <img src="src/assets/Images/logo-sedes.svg" alt="avatar" />
            <h2 className="title">Inicio de sesión</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar mensaje de error */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Mostrar mensaje de éxito */}
            <div className={`input-div one ${focusInput.username ? 'focus' : ''}`}>
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Usuario</h5>
                <input
                  type="text"
                  className="input"
                  name="username"
                  value={formData.username}
                  onFocus={() => handleFocus('username')}
                  onBlur={() => handleBlur('username')}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={`input-div pass ${focusInput.password ? 'focus' : ''}`}>
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Contraseña</h5>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={formData.password}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <input type="submit" className="btn" value="Ingresar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
