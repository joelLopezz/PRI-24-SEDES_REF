import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que Login.css está en la misma carpeta que login.tsx
 
const Login: React.FC = () => {
  const [focusInput, setFocusInput] = useState({ username: false, password: false });
 
  const handleFocus = (input: 'username' | 'password') => {
    setFocusInput({ ...focusInput, [input]: true });
  };
 
  const handleBlur = (input: 'username' | 'password') => {
    setFocusInput({ ...focusInput, [input]: false });
  };
 
  return (
<div className="App">
<div className="container">
<div className="img">
<img src="img/Medico.svg" alt="background illustration" />
</div>
<div className="login-content">
<form action="index.html">
<img src="img/logo-sedes.svg" alt="avatar" />
<h2 className="title">Inicio de sesión</h2>
<div className={`input-div one ${focusInput.username ? 'focus' : ''}`}>
<div className="i">
<i className="fas fa-user"></i>
</div>
<div className="div">
<h5>Usuario</h5>
<input
                  type="text"
                  className="input"
                  onFocus={() => handleFocus('username')}
                  onBlur={() => handleBlur('username')}
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
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
</div>
</div>
<input type="submit" className="btn" value="Ingresar" />
</form>
</div>
</div>
<script src="https://kit.fontawesome.com/a81368914c.js" />
</div>
  );
};
 
export default Login;