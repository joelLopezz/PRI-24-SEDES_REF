import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir al usuario después del login

const Login: React.FC = () => {
  const [focusInput, setFocusInput] = useState({ username: false, password: false });
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensajes de error
  const [successMessage, setSuccessMessage] = useState(''); // Para mostrar mensajes de éxito
  const navigate = useNavigate(); // Hook para redirigir al usuario después del inicio de sesión exitoso

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
    e.preventDefault(); // Evitar recarga de la página
    setErrorMessage(''); // Resetear mensaje de error
    setSuccessMessage(''); // Resetear mensaje de éxito

    const loginData = {
      nombre_usuario: formData.username,
      contrasenia: formData.password,
    };

    console.log('Datos enviados al backend:', loginData);

    // Enviar los datos al backend
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
        // Si la autenticación es exitosa 
        setSuccessMessage('Inicio de sesión exitoso'); // Mostrar mensaje de éxito

        // Redirigir al usuario a la página protegida (EstablecimientoList)
        setTimeout(() => {
          //navigate('/cama'); // Cambia esto según la página a la que quieras redirigir
          navigate('/especialidad'); // Cambia esto según la página a la que quieras
        }, 1500); // Espera 1.5 segundos antes de redirigir
      })
      .catch(error => {
        // Si ocurre algún error, mostrar mensaje de error
        setErrorMessage('Usuario o contraseña incorrectos');
      });
  };

  return (
    <div className="App">
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
